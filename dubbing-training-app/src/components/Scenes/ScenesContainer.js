import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Scenes from './Scenes'
import { getScenes } from '../../store/actions/scenes'

const ScenesContainer = () => {
    const dispatch = useDispatch();
    const scenes = useSelector(state => state.scenes);
    const { data } = useSelector(state => state.socket);

    useEffect(() => {
        if (data.host_id) {
            dispatch(getScenes(data.host_id));
        }
        // eslint-disable-next-line
    }, [data.host_id])

    return <Scenes
        scenes={scenes.allScenes}
    />
}

export default ScenesContainer;