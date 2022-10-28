import Loader from '../Loader'
import Session from '../Session'
import VideoWrapper from '../VideoWrapper';
import Logout from '../Logout'
import Control from '../Control'
import SpeakerSignIn from '../SpeakerSignIn';
import SpeakerChange from '../SpeakerChange'
import './VideoPlayer.scss';

const VideoPlayer = (props) => {
    const {
        scenes,
        subtitle,
        extraSubtitle,
        currentTake,
        previousTake,
        nextTake,
        loaderMessage,
        title,

        videoRef,
        voiceRef,
        onPlayerEnd,
        stopAllProcesses,
        playHandler,
        recordHandler,
        listenHandler,
        changeSubtitle,
        changeTakeHandler,
        getSubtitleActiveClass,

        isLoaderVisible,
        isDefaultVideoPlaying,
        isRecordingVoice,
        isRecordedVideoPlaying,
        isDefaultVideoDisabled,
        isRecordingVoiceDisabled,
        isRecordedVideoDisabled,
        isTakesControlsDisabled,
        isSpeakerInterfaceVisible,
        isSignInVisible,
        isSwitchDisabled
    } = props;

    return (
        <div className='video-player__container'>
            <div className='video-player__head'>
                <h1 className='video-player__project'>Dubtrain</h1>

                <div className='video-player__log-actions'>
                    { isSignInVisible && (
                        <SpeakerSignIn />
                    )}

                    <Logout />
                </div>
            </div>

            <div className='video-player__player'>
                <ul className='video-player__left-controls'>
                        <li className='video-player__left-controls-item'>
                            <SpeakerChange isSwitchDisabled={isSwitchDisabled} />
                        </li>
                </ul>

                <div className='video-player__wrapper'>
                    {
                        isLoaderVisible && (
                            <div className='video-player__loader'>
                                <Loader message={loaderMessage} />
                            </div>
                        )
                    }

                    <div className='video-player__subtitle-container'>
                        {
                            extraSubtitle && (
                                <div className='video-player__subtitle'>
                                    <h4 className='video-player__subtitle-title'>{extraSubtitle.title}</h4>

                                    <p className='video-player__subtitle-text'>{extraSubtitle.text}</p>
                                </div>
                            )
                        }
                        {
                            subtitle && (
                                <div className='video-player__subtitle video-player__subtitle--main'>
                                    <h4 className='video-player__subtitle-title'>{subtitle.title}</h4>

                                    <p className='video-player__subtitle-text'>{subtitle.text}</p>
                                </div>
                            )
                        }
                    </div>

                    <VideoWrapper
                        onPlayerEnd={onPlayerEnd}
                        ref={{ videoRef, voiceRef }}
                    />
                </div>

                <div className='video-player__session'>
                    {
                        isSpeakerInterfaceVisible && (
                            <Session 
                                stopAllProcesses={stopAllProcesses}
                                buttonVision={isSpeakerInterfaceVisible}
                            />
                        )
                    }
                    {
                        title && (
                            <h1 className='video-player__scene-title'>
                                { title }
                            </h1>
                        )
                    }
                </div>

                <ul className='video-player__controls'>
                    <Control
                        text={'Original'}
                        isDisabled={isDefaultVideoDisabled}
                        clickHandler={playHandler}
                        className={isDefaultVideoPlaying ? 'video-player__button--stop' : 'video-player__button--video'}
                    />

                    <Control
                        text={!isRecordingVoice ? 'Record' : 'Recording'}
                        isDisabled={isRecordingVoiceDisabled}
                        clickHandler={recordHandler}
                        className={isRecordingVoice ? 'video-player__button--stop' : 'video-player__button--record'}
                    />

                    <Control
                        text={'Recorded'}
                        isDisabled={isRecordedVideoDisabled}
                        clickHandler={listenHandler}
                        className={isRecordedVideoPlaying ? 'video-player__button--stop' : 'video-player__button--voice'}
                    />
                </ul>

                <ul className='video-player__scene-controls'>
                    <li className='video-player__scene-item'>
                        {
                            previousTake && (
                                <button
                                    onClick={() => changeTakeHandler(previousTake.id, scenes.activeScene.id)}
                                    disabled={isTakesControlsDisabled}
                                    className='video-player__previous-take'
                                >
                                    { previousTake.title }
                                </button>
                            )
                        }
                    </li>

                    {
                        currentTake && (
                            <li className='video-player__scene-item'>
                                <button
                                    className={
                                        `video-player__take-subtitle ${getSubtitleActiveClass(currentTake.pre_take_headline, currentTake.pre_take_text)}`
                                    }
                                    onClick={() =>
                                        changeSubtitle(
                                            currentTake.pre_take_headline,
                                            currentTake.pre_take_text,
                                            'sub'
                                        )
                                    }
                                >
                                    Pre-take text
                                </button>

                                <button
                                    className={
                                        `video-player__take-subtitle ${getSubtitleActiveClass(currentTake.take_headline, currentTake.take_text)}`
                                    }
                                    onClick={() =>
                                        changeSubtitle(
                                            currentTake.take_headline,
                                            currentTake.take_text,
                                            'main'
                                        )
                                    }
                                >
                                    Take text
                                </button>

                                <button
                                    className={
                                        `video-player__take-subtitle ${getSubtitleActiveClass(currentTake.post_take_headline, currentTake.post_take_text)}`
                                    }
                                    onClick={() =>
                                        changeSubtitle(
                                            currentTake.post_take_headline,
                                            currentTake.post_take_text,
                                            'sub')
                                    }
                                >
                                    Post take text
                                </button>
                            </li>
                        )
                    }

                    <li className='video-player__scene-item'>
                        {
                            nextTake && (
                                <button
                                    onClick={() => changeTakeHandler(nextTake.id, scenes.activeScene.id)}
                                    disabled={isTakesControlsDisabled}
                                    className='video-player__next-take'
                                >
                                    { nextTake.title }
                                </button>
                            )
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default VideoPlayer;
