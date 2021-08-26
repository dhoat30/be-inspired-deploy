import React, { useState, useContext, useEffect } from 'react'
import Input from '../../Input/Input';
import Errors from '../../Notifications/Errors/Errors';
import Button from '../../Button/Button'

import styled from 'styled-components';
import LoginModalContext from '../../../../store/login-modal-context';
import { signIn } from 'next-auth/client'


function RegisterForm(props) {

    const loginModalCtx = useContext(LoginModalContext)

    // submission error
    const [submissionError, setSubmissionError] = useState('')

    // register state
    const [isRegistered, setIsRegistered] = useState(false)

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
    async function formSubmissionHandler(event) {
        event.preventDefault()
        setEnteredEmailTouched(true)
        setEnteredPasswordTouched(true)
        if (!enteredEmailIsValid || !enteredPasswordIsValid) {
            return
        }
        // sign in request
        const result = await signIn('credentials', {
            redirect: false,
            email: email,
            password: enteredPassword
        })

        console.log(result)
        if (!result.error && result.status === 200) {
            console.log('add redirection here')
        }
        else {
            setSubmissionError(result.error)
        }
    }

    // hide modal 
    const cancelHandler = () => {
        loginModalCtx.hideModal()
    }
    return (
        <React.Fragment>
            <Container onSubmit={formSubmissionHandler}>
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
                {submissionError ? <Errors>{submissionError} </Errors> : null}
                <ButtonStyle>Submit</ButtonStyle>
                <Cancel onClick={cancelHandler}>Cancel</Cancel>
            </Container>

        </React.Fragment>
    )
}


export default RegisterForm

const Container = styled.form`
  width: 95%;
  max-width: 250px;
`

const ButtonStyle = styled(Button)`
width: 100%;
margin-top: 20px;
`

const Cancel = styled.div`
text-align: center;
margin-top: 10px;
cursor: pointer;
&:hover{
    text-decoration: underline; 
}
`