import { useState, useEffect } from 'react'

import { useAuth } from '../../api/Auth'
import SpeakerSignIn from './SpeakerSignIn'

const SpeakerSignInContainer = () => {
    const [ modalVision, setModalVision ] = useState(false);
    const [ message, setMessage ] = useState(null);
    const [ component, setComponent ] = useState(null);
    const auth = useAuth();

    useEffect(() => {
        auth.checkToken();
        // eslint-disable-next-line
    }, [])

    const signinHandler = () => {
        setModalVision(true);
        setComponent('email');
    }

    const emailHandler = async (e) => {
        e.preventDefault();
        setComponent('loader');

        const email = e.target[0].value;
        const time = localStorage.getItem('pin-time');
        const minutes = time ? ((Date.now() - time) / 60000) : 10;
        const res = await auth.sendPin(email, minutes);

        if (res === 'exist') {
            setComponent('pass');
            localStorage.setItem('email', email);
        } else if (res === 'not exist') {
            setComponent('pin');
            localStorage.setItem('email', email);
            localStorage.setItem('pin-time', Date.now());
        } else if (res === 'pin not yet') {
            setComponent('pin');
            setMessage(`You already send pin, please try again after: ${3 - ~~minutes}min`);
            setTimeout(() => setMessage(null), 6000)
        } else {
            setComponent('email');
        }
    }

    const pinHandler = async (e) => {
        e.preventDefault();
        setComponent('loader');

        const email = localStorage.getItem('email');
        const password = e.target[0].value;
        await auth.signin(email, password,
            () => {
                localStorage.removeItem('email');
                setModalVision(false);
                auth.removePin(email);
            },
            () => {
                setMessage('Wrong pin!');
                setComponent('pin');
                setTimeout(() => setMessage(null), 2000)
            }
        )
    }

    const passwordHandler = async (e) => {
        e.preventDefault();
        setComponent('loader');

        const email = localStorage.getItem('email');
        const password = e.target[0].value;
        await auth.signin(email, password,
            () => {
                localStorage.removeItem('email');
                setModalVision(false);
            },
            () => {
                setComponent('pass');
                setMessage('Wrong password!');
                setTimeout(() => setMessage(null), 2000)
            }
        )
    }

    const resentHandler = (e) => {
        setComponent('email');
    }

    const cancelHandler = () => {
        setModalVision(false);
    }

    return <SpeakerSignIn
        message={message}
        modalVision={modalVision}
        component={component}
        signinHandler={signinHandler}
        emailHandler={emailHandler}
        pinHandler={pinHandler}
        passwordHandler={passwordHandler}
        resentHandler={resentHandler}
        cancelHandler={cancelHandler}
    />
}

export default SpeakerSignInContainer;