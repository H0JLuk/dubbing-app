import { useEffect, forwardRef } from 'react';

import './VideoWrapper.scss'

const VideoWrapper = forwardRef(({ onPlayerEnd }, refs) => {
    const { videoRef, voiceRef } = refs;

    useEffect(() => {
        videoRef.current.addEventListener('ended', onPlayerEnd);
        return () => videoRef.current?.removeEventListener('ended', onPlayerEnd);
        // eslint-disable-next-line
    }, [])

    return (
        <div className="video-wrapper">
            <video id="myPlayer" ref={videoRef} className="video" />
            <audio id="myVoice" ref={voiceRef} />
        </div>
    )
});

export default VideoWrapper;