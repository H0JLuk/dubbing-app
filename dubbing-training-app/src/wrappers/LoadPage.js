import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import Loader from '../components/Loader'

const LoadPage = ({ children, promise, location }) => {
    const [ loader, setLoader ] = useState(true);
    const history = useHistory();

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, [])

    const getData = async () => {
        const res = await promise();

        if (res) {
            setLoader(false);
        } else {
            history.push(location);
        }
    };

    return (
        <>
            { loader ?
                (
                    <div style={{
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Loader />
                    </div>
                )
                : children }
        </>
    )
}

export default LoadPage