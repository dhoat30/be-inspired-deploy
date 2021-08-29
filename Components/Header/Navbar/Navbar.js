import React, { useState, useContext } from 'react'
import Menu from '../../UI/Menu/Menu'
import styled from 'styled-components'
import Button from '../../UI/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faChevronDown, faChevronUp } from '@fortawesome/pro-light-svg-icons'
import Login from '../Login/Login'
import LoginModalContext from '../../../store/login-modal-context'
import BackdropSection from '../../UI/Backdrop/BackdropSection'
import { useSession } from 'next-auth/client'
import ProfileNavbar from './ProfileNavbar/ProfileNavbar'

const menuItems = [
    {
        title: "Pins",
        url: "/pins",
        linkType: "local"
    },
    {
        title: "Shop",
        url: "https://inspiry.co.nz/products",
        linkType: "remote"
    },
    {
        title: "Trade",
        url: "/trade",
        linkType: "local"
    },
    {
        title: "Blog",
        url: "https://inspiry.co.nz/inspiry-blogs/",
        linkType: "remote"
    }
]

function Navbar() {

    const [session, loading] = useSession()

    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const [showProfileNavbar, setShowProfileNavbar] = useState(false)
    // login modal context 
    const loginModalCtx = useContext(LoginModalContext)
    const showLoginModal = loginModalCtx.modal

    // console.log(session.user.email)
    const showMenuHandler = () => {
        setShowMobileMenu(true)
    }

    const hideMenuHandler = () => {
        setShowMobileMenu(false)
    }

    // show login modal handler with login modal Context 
    const showLoginModalHandler = () => {
        loginModalCtx.showModal()
    }

    // show profile navbar
    const arrowDownClickHandler = () => {
        setShowProfileNavbar(showProfileNavbar ? false : true)
    }

    // hide profile navbar on link Click 
    const profileLinkClickHandler = () => {
        setShowProfileNavbar(false)
    }
    return (
        <React.Fragment>
            <Container showMobileMenu={showMobileMenu}>
                <Menu menuItems={menuItems} />

                {!session ?
                    <Buttons>
                        <ButtonStyle onClick={showLoginModalHandler}>Log in</ButtonStyle>
                        <ButtonStyle bkColor="var(--beige)">Register</ButtonStyle>
                    </Buttons>
                    :
                    <ProfileButtonContainer>
                        <ProfileButton>G</ProfileButton>
                        <ProfileButton onClick={arrowDownClickHandler}><FontAwesomeIcon icon={showProfileNavbar ? faChevronUp : faChevronDown} /></ProfileButton>
                    </ProfileButtonContainer>
                }



                {showProfileNavbar ?
                    <ProfileNavbar profileLinkClick={profileLinkClickHandler} /> :
                    null
                }

            </Container>

            {showMobileMenu ?
                <IconStyle icon={faTimes} onClick={hideMenuHandler} /> :
                <IconStyle icon={faBars} onClick={showMenuHandler} />
            }

            {showLoginModal && !session ? <>
                <Login />
                <BackdropSection show={showLoginModal} />
            </>
                : null}

        </React.Fragment>
    )
}

export default Navbar

const Container = styled.div`
width: 500px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
background: white;
height: 50px;

@media(max-width: 1000px){ 
    box-shadow: var(--boxShadow);
    width: 250px;
    flex-direction: column ;
    position: absolute;
    top: 50px;
    right: 0;
    display: ${(props) => !props.showMobileMenu ? "none" : "block"};
    z-index: 12;
}
`
const Buttons = styled.div`
display: flex;
flex-direction: row;
width: 200px;
justify-content: space-between;
padding-left: 20px;
@media(max-width: 1000px){ 
    margin: 0 auto 0  0;
    flex-direction: column ;
    padding: 0 5px 10px 5px;
}

`

const ButtonStyle = styled(Button)`
    margin: 5px 0;
    display: block;
`

// font awesome 
const IconStyle = styled(FontAwesomeIcon)`
@media (min-width: 1000px){
    display: none;
}
padding-left: 20px;

 font-size: 60px;
 &:hover{ 
     cursor: pointer;
 }
  @media (max-width: 450px){ 
    font-size: 50px;
} 
`
const ProfileButtonContainer = styled.div`
    width: 80px;
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
`
const ProfileButton = styled.button`
 background: var(--beige);
 border: none;
 border-radius: 50%;
cursor: pointer;
 font-size: 1.3rem;
 padding: 5px 10px;
`