import styles from './SpeakerChange.module.scss'

const SpeakerChange = (props) => {
    const {
        isSpeaker,
        changeHandler,
        isDisabled,
        isModalVisible,
        changeUser,
        allowHandler,
        refuseHandler,
    } = props;

    return (
        <>
            { !isSpeaker && (
                <button
                    className={styles.button}
                    type="button"
                    onClick={changeHandler}
                    disabled={isDisabled}
                >
                    Change speaker
                </button>
            )}

            {
                isModalVisible && (
                    <div className={styles.modal}>
                        <div className={styles.wrapper}>
                            <p className={styles.text}>{changeUser.username} want to be a speaker</p>

                            <div className={styles.controls}>
                                <button
                                    className={styles.refuse}
                                    type='button'
                                    onClick={refuseHandler}
                                >
                                    Refuse
                                </button>

                                <button
                                    className={styles.allow}
                                    type='button'
                                    onClick={allowHandler}
                                >
                                    Allow
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default SpeakerChange;