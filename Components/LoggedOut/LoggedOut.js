// this component is showing content for logged out user- landing page

import React, { useState, useContext, useEffect } from 'react'
import LargeTitle from '../UI/Titles/Titles/LargeTitle'
import ReactTypingEffect from 'react-typing-effect'
import * as styles from './LoggedOut.module.css'
import HomeGallery from './HomeGallery/HomeGallery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown } from '@fortawesome/pro-light-svg-icons'
import RegisterModal from '../UI/RegisterModal/RegisterModal'
import Backdrop from '../UI/Backdrop/BackdropSection'
import MenuContext from '../../store/menu-context'


import LoginModal from '../UI/LoginModal/LoginModal'

function LoggedOut() {


  // use context for register form to show on register button click in the navbar
  const menuCtx = useContext(MenuContext)

  const [showRegisterForm, setRegisterForm] = useState(false)
  const [showGradient, setGradient] = useState(true)
  const [showBackdrop, setBackdrop] = useState(false)

  // onClick handler
  const onClickHandler = (props) => {
    setGradient(false)
    menuCtx.backdrop(true)
    setRegisterForm(true)
  }

  // close the modal 
  const closeHandler = props => {
    console.log("this is a console")
    setGradient(true)
    setBackdrop(false)
    setRegisterForm(false)
    menuCtx.visible(false)
    menuCtx.backdrop(false)
  }
  const backdropClickHandler = () => {
    menuCtx.showLoginModalFunction(false)
    setBackdrop(false)
  }
  const iconClasses = showGradient ? `${styles.iconContainer} ${styles.gradient}` : `${styles.iconContainer}`;
  const registerModalClasses = showRegisterForm || menuCtx.visibleRegisterForm ? true : false

  return (

    <div className={`${styles.typewriterContainer} row-container`}>


      {menuCtx.backdropVisibility || menuCtx.showLoginModal ? <Backdrop show={true} clicked={backdropClickHandler}></Backdrop> : null}
      {menuCtx.showLoginModal ? <LoginModal /> : null}
      <LargeTitle fontWeight="semi-bold" color="black" textAlign="center-align">Get your next</LargeTitle>

      <ReactTypingEffect className="margin-auto"
        text={"title"}
        speed={50}
        eraseDelay={2000}
        eraseSpeed={50}
        typingDelay={1000}
        cursorRenderer={cursor => <LargeTitle fontWeight="semi-bold" color="blue" textAlign="center-align">{cursor}</LargeTitle>}
        displayTextRenderer={(text, i) => {
          return (
            <LargeTitle fontWeight="semi-bold" color="blue" textAlign="center-align">
              {text.split('').map((char, i) => {
                const key = `${i}`;
                return (
                  <span className="center-align margin-auto"
                    key={key}

                  >{char}</span>
                );
              })}
            </LargeTitle>

          );
        }}
      />



      <HomeGallery />
      {showGradient ? <a href="#registeration-form" className={iconClasses} onClick={onClickHandler}>
        <FontAwesomeIcon icon={faChevronCircleDown} size="3x" color="white" style={{ background: "#303030", borderRadius: '50%' }} />
      </a> : null}

      <RegisterModal closeModal={closeHandler} visibleClasses={registerModalClasses} />
    </div>

  )
}

export default LoggedOut
