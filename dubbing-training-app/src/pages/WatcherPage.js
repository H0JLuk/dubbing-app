import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { setWaiter } from '../store/actions/profile'
import VideoPlayer from '../components/VideoPlayer'
import WatcherPromo from '../components/WatcherPromo'
import { useAuth } from '../api/Auth'
import Scenes from '../components/Scenes'

const WatcherPage = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const { data } = useSelector(state => state.socket);
    const location = useLocation();
    const auth = useAuth();

    useEffect(() => {
        dispatch(setWaiter());
        sessionConnection();
        // eslint-disable-next-line
    }, [])

    const sessionConnection = () => {
        const session = location.pathname.split('/')[2];
        localStorage.setItem('session', session);

        if (session) {
            auth.connectSession(session);
        }
    }

    const getCurrentWindow = () => {
        switch (profile.status) {
            case 'waiter':
                return <WatcherPromo />
            case 'watcher':
                return <VideoPlayer />
            case 'speaker':
                if (!data.take_id && !data.scene_id) {
                    return <Scenes />
                } else {
                    return <VideoPlayer />
                }
            default:
                return <WatcherPromo />
        }
    }

    return getCurrentWindow()
}

export default WatcherPage;