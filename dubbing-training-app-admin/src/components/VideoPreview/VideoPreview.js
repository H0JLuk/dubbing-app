import styles from './VideoPreview.module.scss'

const VideoPreview = (props) => {
    const {
        videoProperties,
        setVideoProperties
    } = props;

    const closeHandler = () => {
        setVideoProperties({ vision: false, src: '' })
    }

    return videoProperties.vision ? (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <button className={styles.close} onClick={closeHandler} />

                <div className={styles.video}>
                    <video className={styles.player} controls>
                        <source src={videoProperties.src} type="video/mp4" />
                    </video>
                </div>
            </div>

            <div className={styles.overlay} onClick={closeHandler} />
        </div>
    ): null
}

 export default VideoPreview;