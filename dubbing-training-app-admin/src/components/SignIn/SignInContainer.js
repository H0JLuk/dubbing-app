import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import SignIn from './SignIn'
import { useAuth } from '../../api/Auth'
import { error } from '../../variables/colors'

const SignInContainer = () => {
    const [ notification, setNotification ] = useState(null);
    const [ loader, setLoader ] = useState(false);
    const history = useHistory();
    const auth = useAuth();

    const formHandler = (e) => {
        e.preventDefault();
        let isFormValid = true;
        const username = e.target.elements[0].value;
        const password = e.target.elements[1].value;

        isFormValid = isLoginValid(username);
        isFormValid = isPasswordValid(password);

        if (isFormValid) {
            auth.signin(username.trim(), password, successRes, triggerError);
            setLoader(true);
            return
        }

        triggerError('Data invalid');
    }

    const isLoginValid = (username) => {
        if (username.trim() === '') return false

        return true;
    }

    const isPasswordValid = (password) => {
        if (password.trim() === '') return false

        return true;
    }

    const triggerError = (err) => {
        setLoader(false);

        if (err.message.includes('401')) {
            setNotification({ title: 'Error:', text: 'Incorrect login or password', color: error });
        } else {
            setNotification({ title: 'Error', text: err.message, color: error });
        }

        setTimeout(() => {
            setNotification(null);
        }, 4000)
    }

    const successRes = (res) => {
        setLoader(false);
        history.push('/');

        //console.log('suc: ', res);
    }


    return <SignIn
        formHandler={formHandler}
        notification={notification}
        loader={loader}
    />
}

export default SignInContainer;