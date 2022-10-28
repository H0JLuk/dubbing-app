import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useRollbar } from '@rollbar/react';

import VideoPlayer from './VideoPlayer'
import { checkVoicePermission } from '../../utils/helpers';
import { readScene } from '../../api/scenes'
import { setSessionData, setSceneAwaiting, setVoice } from '../../store/actions/socket'
import { loadAudio, uploadAudio } from '../../api/audio'
import { setActiveScene } from '../../store/actions/scenes'
import {
    setDefaultVideoStatus, setRecordingVoiceStatus, setRecordedVideoStatus,
    setDefaultVideoDisable, setRecordingVoiceDisable, setRecordedVideoDisable
} from '../../store/actions/controls'
import useRecorder from '../../hooks/useRecorder';

const VideoPlayerContainer = () => {
    const rollbar = useRollbar();
    const [ loader, setLoader ] = useState(true);
    const [ voiceLoader, setVoiceLoader ] = useState(false);
    const [ loaderMessage, setLoaderMessage ] = useState(null);
    const [ subtitle, setSubtitle ] = useState(null);
    const [ extraSubtitle, setExtraSubtitle ] = useState(null);

    const {
        isDefaultVideoPlaying, isRecordingVoice, isRecordedVideoPlaying,
        isDefaultVideoDisabled, isRecordingVoiceDisabled, isRecordedVideoDisabled
    } = useSelector(state => state.controls);
    const profile = useSelector(state => state.profile);
    const socket = useSelector(state => state.socket);
    const scenes = useSelector(state => state.scenes);

    const dispatch = useDispatch();
    const history = useHistory();
    const session = useRef();
    const sessionData = useRef();
    const profileStatus = useRef();
    const videoRef = useRef();
    const voiceRef = useRef();
    const recorder = useRecorder({ onError, onFinishRecord });

    session.current = socket.session;
    sessionData.current = socket.data;
    profileStatus.current = profile.status;

    useEffect(() => {
        if (profile.status === 'speaker') {
            dispatch(setDefaultVideoDisable(false));
            dispatch(setRecordingVoiceDisable(false));
            dispatch(setRecordedVideoDisable(true));
        }

        getRemoteVoice();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (socket.voice !== '') {
            if (profile.status === 'speaker') {
                dispatch(setDefaultVideoDisable(false));
                dispatch(setRecordingVoiceDisable(false));
                dispatch(setRecordedVideoDisable(false));
            }

            setVoiceLoader(false);
            setLoaderMessage(null);
            voiceRef.current.src = socket.voice;
        }

        // eslint-disable-next-line
    }, [socket.voice])

    useEffect(() => {
        if (!socket.status && profile.status === 'watcher') {
            localStorage.removeItem('session')
            history.push('/login');
        }
        // eslint-disable-next-line
    }, [socket.status])

    useEffect(() => {
        readDataStatus(socket.data.status);

        if (socket.data.session_hash) {
            const hasEmptySocketData = [
                socket.data.status,
                socket.data.host_id,
                socket.data.speaker_id,
                socket.data.take_id,
                socket.data.scene_id
            ].some(i => !i);
            hasEmptySocketData && rollbar.error('UNDEFINED DATA: ', socket.data);
        }
        // eslint-disable-next-line
    }, [socket.data])

    useEffect(() => {
        if (
            !socket.data.take_id ||
            !socket.data.scene_id
        ) {
            dispatch(setSceneAwaiting(true));
            setLoaderMessage('Waiting for scene');
        } else {
            dispatch(setSceneAwaiting(false));
            setLoaderMessage(null);
            getVideoBySceneData(socket.data.take_id, socket.data.scene_id);
        }

        setExtraSubtitle(null);
        dispatch(setVoice(''));
        // eslint-disable-next-line
    }, [socket.data.scene_id, socket.data.take_id])

    useEffect(() => {
        const currentTake = getCurrentTake();

        if (currentTake && Object.keys(currentTake).length > 0) {
            setSubtitle({ title: currentTake.take_headline, text: currentTake.take_text});
        }
        // eslint-disable-next-line
    }, [socket.data.scene_id, socket.data.take_id, scenes.activeScene])

    useEffect(() => {
        videoRef.current.currentTime = 0;
        if (isDefaultVideoPlaying) {
            videoRef.current.muted = false;
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [isDefaultVideoPlaying])

    useEffect(() => {
        videoRef.current.currentTime = 0;
        if (isRecordingVoice) {
            profile.status === 'speaker' && recorder.startRecording();
            videoRef.current.muted = true;
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
        // eslint-disable-next-line
    }, [isRecordingVoice])

    useEffect(() => {
        videoRef.current.currentTime = 0;
        voiceRef.current.currentTime = 0;
        if (isRecordedVideoPlaying) {
            voiceRef.current.volume = 0.5;
            videoRef.current.muted = true;

            videoRef.current.play();
            voiceRef.current.play();
        } else {
            videoRef.current.pause();
            voiceRef.current.pause();
        }
    }, [isRecordedVideoPlaying])

    useEffect(() => {
        getRemoteVoice();
        // eslint-disable-next-line
    }, [profile.status])

    const readDataStatus = (status) => {
        switch (status) {
            case 'play-def':
                if (!loader && !voiceLoader) {
                    dispatch(setDefaultVideoStatus(true));
                }
                break;
            case 'stop-def':
                dispatch(setDefaultVideoStatus(false));
                break;
            case 'start-rec':
                if (!loader && !voiceLoader) {
                    dispatch(setRecordingVoiceStatus(true));
                }
                break;
            case 'finish-rec':
                getRemoteVoice();
                dispatch(setRecordingVoiceStatus(false));
                break;
            case 'play-rec':
                if (!loader && !voiceLoader) {
                    dispatch(setRecordedVideoStatus(true));
                }
                break;
            case 'stop-rec':
                dispatch(setRecordedVideoStatus(false));
                break;
            case null:
                getRemoteVoice();
                dispatch(setDefaultVideoStatus(false));
                dispatch(setRecordedVideoStatus(false));
                dispatch(setRecordingVoiceStatus(false));
                break;
            default:
                dispatch(setDefaultVideoStatus(false));
                dispatch(setRecordedVideoStatus(false));
                dispatch(setRecordingVoiceStatus(false));
        }
    }

    const playHandler = () => {
        if (videoRef.current && videoRef.current.paused) {
            dispatch(setSessionData({ ...socket.data, status: 'play-def' }));
        } else {
            dispatch(setSessionData({ ...socket.data, status: 'stop-def' }));
        }
    }

    const recordHandler = async () => {
        try {
            await checkVoicePermission();

            dispatch(setSessionData({ ...sessionData.current, status: 'start-rec' }))
            dispatch(setDefaultVideoDisable(true));
            dispatch(setRecordedVideoDisable(true));
            dispatch(setRecordingVoiceDisable(true));
        } catch (e) {
            alert('Enable your micro please');
        }
    }

    const listenHandler = () => {
        const isPaused = videoRef.current?.paused;
        if (isPaused) {
            dispatch(setSessionData({ ...socket.data, status: 'play-rec' }));
        } else {
            dispatch(setSessionData({ ...socket.data, status: 'stop-rec' }));
        }
    }

    const getRemoteVoice = async () => {
        const {
            scene_id,
            take_id,
            session_hash,
            speaker_id
        } = socket.data;

        if (!speaker_id || !session_hash || !scene_id || !take_id) { return }
        const url = process.env.REACT_APP_AWS_LINK + `/voice/${speaker_id}/${session_hash}/${scene_id}/${take_id}/audio.mp4`;

        try {
            const res = await axios.get(url, { responseType: 'blob' });

            if (res.status === 200) {
                const objectUrl = URL.createObjectURL(res.data);
                dispatch(setVoice(objectUrl));
            }
        } catch (error) {
        }
    }

    const onPlayerEnd = () => {
        recorder.isRecording || recorder.stopRecording();
        if (sessionData.current.status === 'play-def') {
            dispatch(setSessionData({ ...sessionData.current, status: 'stop-def' }));
        }

        if (sessionData.current.status === 'play-rec') {
            dispatch(setSessionData({ ...sessionData.current, status: 'stop-rec' }));
        }
    }

    function onError(error) {
        rollbar.error('PLAYER ERROR: ', error);
    }

    async function onFinishRecord(audioData) {
        setVoiceLoader(true);
        setLoaderMessage('Sending your voice');

        try {
            await uploadAudio(audioData, session.current);
        } catch (error) {
            rollbar.error('UPLOAD AUDIO ERROR: ', error);
        }

        dispatch(setSessionData({ ...sessionData.current, status: 'finish-rec' }));
    }

    const stopAllProcesses = () => {
        const voice = voiceRef.current;
        const video = videoRef.current;
        const isVoiceReady = voiceRef.current.readyState;

        if (!video.paused) {
            video.pause();
            video.muted = false;
            video.currentTime = 0;
            URL.revokeObjectURL(video.src);
            video.removeAttribute('src');
            video.load();
        }

        recorder.isRecording && recorder.stopRecording();

        if (isVoiceReady !== 0) {
            URL.revokeObjectURL(voice.src)
            voice.removeAttribute('src');
            voice.load();
        }

        dispatch(setDefaultVideoStatus(false));
        dispatch(setRecordingVoiceStatus(false));
        dispatch(setRecordedVideoStatus(false));
        dispatch(setRecordedVideoDisable(true));
    }

    const getCurrentTake = () => {
        if (
            Object.keys(scenes.activeScene).length !== 0 &&
            scenes.activeScene.takes.length !== 0
        ) {
            const takeId = socket.data.take_id;
            return scenes.activeScene.takes.find(el => el.id === takeId);
        }

        return {}
    }

    const getLeftAndRightTake = () => {
        if (
            Object.keys(scenes.activeScene).length !== 0 &&
            scenes.activeScene.takes.length !== 0
        ) {
            const takeId = socket.data.take_id;
            const currentTakeIndex = scenes.activeScene.takes.findIndex(el => el.id === takeId);
            const leftTake = currentTakeIndex === 0 ? null : scenes.activeScene.takes[currentTakeIndex - 1];
            const rightTake = currentTakeIndex === scenes.activeScene.takes.length - 1 ? null : scenes.activeScene.takes[currentTakeIndex + 1];

            return { left: leftTake, right: rightTake }
        }
        return { left: null, right: null }
    }

    const changeTakeHandler = (takeId, sceneId) => {
        setLoader(true);
        setExtraSubtitle(null);
        stopAllProcesses();
        dispatch(setSessionData({ ...socket.data, scene_id: sceneId, take_id: takeId, status: null }));
    }

    const getVideoBySceneData = async (take_id, scene_id) => {
        if ((!take_id && !scene_id) || !socket.session) { return }

        const localSession = socket.session;
        const currentScene = await readScene({id: scene_id}, localSession);
        const take = currentScene.takes.find(el => el.id === take_id);

        setLoader(true);
        dispatch(setActiveScene(currentScene));

        if (take && videoRef.current) {
            const urlObject = await loadAudio(take.take_url);
            urlObject && (videoRef.current.src = urlObject);
        }
        setLoader(false);
    }

    const changeSubtitle = (subtitleDataTitle, subtitleDataText, type) => {
        const currentData = {
            title: subtitleDataTitle,
            text: subtitleDataText
        };

        const subtitleString = JSON.stringify(subtitle);
        const extraSubtitleString = JSON.stringify(extraSubtitle);
        const dataString = JSON.stringify(currentData);

        switch (type) {
            case 'sub':
                if (dataString !== extraSubtitleString) {
                    setExtraSubtitle(currentData);
                } else {
                    setExtraSubtitle(null);
                }
                break;
            case 'main':
                if (dataString !== subtitleString) {
                    setSubtitle(currentData);
                } else {
                    setSubtitle(null);
                }
                break;
            default:
                if (dataString !== subtitleString) {
                    setSubtitle(currentData);
                } else {
                    setSubtitle(null);
                }
        }
    }

    const getSubtitleActiveClass = (subtitleDataTitle, subtitleDataText) => {
        const subtitleString = JSON.stringify(subtitle);
        const extraSubtitleString = JSON.stringify(extraSubtitle);
        const dataString = JSON.stringify({
            title: subtitleDataTitle,
            text: subtitleDataText
        });

        if (subtitleDataTitle && (dataString === subtitleString || dataString === extraSubtitleString)) {
            return 'active'
        }
        return ''
    }

    return <VideoPlayer
        scenes={scenes}
        extraSubtitle={extraSubtitle}
        subtitle={subtitle}
        currentTake={getCurrentTake()}
        previousTake={getLeftAndRightTake().left}
        nextTake={getLeftAndRightTake().right}
        changeTakeHandler={changeTakeHandler}
        loaderMessage={loaderMessage}
        title={scenes.activeScene.title}
        
        videoRef={videoRef}
        voiceRef={voiceRef}
        onPlayerEnd={onPlayerEnd}
        stopAllProcesses={stopAllProcesses}
        playHandler={playHandler}
        recordHandler={recordHandler}
        listenHandler={listenHandler}
        changeSubtitle={changeSubtitle}
        getSubtitleActiveClass={getSubtitleActiveClass}

        isLoaderVisible={loader || voiceLoader || socket.sceneAwaiting || (profile.status === 'watcher')}
        isDefaultVideoPlaying={isDefaultVideoPlaying}
        isRecordingVoice={isRecordingVoice}
        isRecordedVideoPlaying={isRecordedVideoPlaying}
        isDefaultVideoDisabled={isDefaultVideoDisabled || isRecordedVideoPlaying || loader}
        isRecordingVoiceDisabled={isRecordingVoiceDisabled || isRecordedVideoPlaying || isDefaultVideoPlaying || loader}
        isRecordedVideoDisabled={isRecordedVideoDisabled || isDefaultVideoPlaying || loader}
        isSwitchDisabled={isRecordingVoice}
        isTakesControlsDisabled={profile.status === 'watcher' || loader || voiceLoader}
        isSpeakerInterfaceVisible={socket.data.speaker_id && socket.data.speaker_id === profile.user.id}
        isSignInVisible={Object.keys(profile.user).length === 0}
    />
}

export default VideoPlayerContainer;