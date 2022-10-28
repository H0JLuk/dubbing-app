import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';

import styles from './Session.module.scss'
import { setSessionData, setVoice } from '../../store/actions/socket'
import { setSpeaker } from '../../store/actions/profile'

const Session = (props) => {
    const dispatch = useDispatch();
    const timeout = useRef();
    const [ alertVision, setAlertVision ] = useState(false);
    const { session, data } = useSelector(state => state.socket);
    const { user } = useSelector(state => state.profile);

    const {
        stopAllProcesses,
        buttonVision
    } = props;

    const backHandler = () => {
        stopAllProcesses();
        dispatch(setVoice(''));
        dispatch(setSpeaker());
        dispatch(setSessionData({ ...data, take_id: null, scene_id: null, status: null, speaker_id: user.id }));
    }

    const copyHandler = () => {
        setAlertVision(true);

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

       timeout.current = setTimeout(() => setAlertVision(false), 2000);
    }

    return (
        <div className={styles.wrapper}>
            { buttonVision && (
                <button
                    className={styles.stop}
                    type='button'
                    onClick={backHandler}
                >
                    Switch scene
                </button>
            )}

            <CopyToClipboard text={`${window.location.href.split('/')[0]}//${window.location.href.split('/')[2]}/session/${session}`}>
                <div className={styles.clipboard} onClick={copyHandler}>
                    <span className={styles.hash}>{ alertVision ? 'Session link copied!' : 'Click here to copy training session link'}</span>
                </div>
            </CopyToClipboard>
        </div>
    )
}

export default Session;