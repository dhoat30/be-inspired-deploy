import React, { useState, useContext, useEffect } from 'react'
import Input from '../../Input/Input';
import Errors from '../../Notifications/Errors/Errors';
import * as styles from './RegisterForm.module.css'
import Button from '../../Button/Button'
import axios from 'axios'
import AuthContext from '../../../../store/auth-context';

function RegisterForm(props) {
    // auth context
    const authCtx = useContext(AuthContext)

    // register state

    const [isRegistered, setIsRegistered] = useState(false)
    // username states 
    // const [enteredUsername, setEnteredUsername] = useState('')
    // const [enteredUsernameTouched, setEnteredUsernameTouched] = useState(false)

    // email states
    const [email, setEmail] = useState('')
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)

    // password states 
    const [enteredPassword, setEnteredPassword] = useState('')
    const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false)

    // validate username
    // var usernamePattern = /^[a-zA-Z0-9]+$/;
    // let enteredUsernameIsValid = usernamePattern.test(enteredUsername)
    // const usernameInputIsInvalid = !enteredUsernameIsValid && enteredUsernameTouched

    // validate email
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    let enteredEmailIsValid = pattern.test(email)
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

    // validate password 
    let enteredPasswordIsValid = enteredPassword.length >= 8; //reg.test(enteredPasswordTouched)
    const passwordInputIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched



    // input change handlers 
    // const usernameChangeHandler = (event) => {
    //     setEnteredUsername(event.target.value)
    // }

    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
    }

    // input blur change handler
    // const usernameBlurHandler = (event) => {
    //     setEnteredUsernameTouched(true)
    // }
    const emailBlurHandler = (event) => {
        setEnteredEmailTouched(true)
    }
    const passwordBlurHandler = (event) => {
        setEnteredPasswordTouched(true)
    }

    // form submission
    const formSubmissionHandler = (event) => {
        event.preventDefault()
        setEnteredEmailTouched(true)
        setEnteredPasswordTouched(true)
        if (!enteredEmailIsValid || !enteredPasswordIsValid) {
            return
        }
        // register request
        axios.post('http://localhost/services/wp-json/wp/v2/users/register',
            {
                username: email,
                email: email,
                password: enteredPassword
            }).then(response => {
                return axios.post('http://localhost/services/wp-json/jwt-auth/v1/token',
                    {
                        username: email,
                        password: enteredPassword
                    })
            }).then(response => {
                authCtx.login(response.data.token)
            }).catch(err => {

            })
    }



    return (
        <React.Fragment>
            <form className={`${styles.loginForm}`} onSubmit={formSubmissionHandler}>
                {/* <Input
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    blurChange={usernameBlurHandler}
                    inputChange={usernameChangeHandler}
                    isInvalid={usernameInputIsInvalid}
                    value={enteredUsername} />
                {usernameInputIsInvalid ? <Errors>Please enter a valid username </Errors> : null} */}


                <Input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    blurChange={emailBlurHandler}
                    inputChange={emailChangeHandler}
                    isInvalid={emailInputIsInvalid}
                    value={email} />
                {emailInputIsInvalid ? <Errors>Entered email address is not valid</Errors> : null}

                <Input
                    type="password"
                    placeholder="Create a password"
                    id="password" name="password"
                    inputChange={passwordChangeHandler}
                    blurChange={passwordBlurHandler}
                    isInvalid={passwordInputIsInvalid}
                    value={enteredPassword}
                />
                {passwordInputIsInvalid ? <Errors>Your password must be at least 8 characters long. </Errors> : null}

                <Button backgroundColor='darkGrey' width="fullWidth">Submit</Button>

            </form>

            <Button backgroundColor='beige' buttonClick={props.closeModal}>Close</Button>

        </React.Fragment>
    )
}

export default RegisterForm
