import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { changeSpeaker, setChangeRequest, setSessionData } from '../../store/actions/socket'
import { setDefaultVideoDisable, setRecordedVideoDisable, setRecordingVoiceDisable } from '../../store/actions/controls'
import { setSpeaker, setWatcher } from '../../store/actions/profile'
import SpeakerChange from './SpeakerChange'

const SpeakerChangeContainer = ({ isSwitchDisabled }) => {
    const { user, status } = useSelector(state => state.profile);
    const { changeRequest, data, session } = useSelector(state => state.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data.speaker_id === user.id) {
            dispatch(setSpeaker());
        } else {
            dispatch(setWatcher());
        }

        // eslint-disable-next-line
    }, [data.speaker_id, user])

    useEffect(() => {
        if (status === 'speaker') {
            dispatch(setDefaultVideoDisable(false));
            dispatch(setRecordingVoiceDisable(false));
            dispatch(setRecordedVideoDisable(true));
        } else {
            dispatch(setDefaultVideoDisable(true));
            dispatch(setRecordingVoiceDisable(true));
            dispatch(setRecordedVideoDisable(true));
        }

        // eslint-disable-next-line
    }, [status])

    const changeHandler = () => {
        dispatch(changeSpeaker({ id: user.id, username: user.username || user.user }, session ));
    }

    const allowHandler = () => {
        dispatch(setSessionData({ ...data, speaker_id: changeRequest.user.id }));
        dispatch(setChangeRequest({}));
    }

    const refuseHandler = () => {
        dispatch(setChangeRequest({}));
    }

    return <SpeakerChange
        isSpeaker={status === 'speaker'}
        changeHandler={changeHandler}
        isDisabled={Object.keys(user).length === 0 || isSwitchDisabled}
        isModalVisible={Object.keys(changeRequest).length > 0 && user.id === changeRequest.speaker && !isSwitchDisabled}
        changeUser={changeRequest.user}
        allowHandler={allowHandler}
        refuseHandler={refuseHandler}
    />
}

export default SpeakerChangeContainer;