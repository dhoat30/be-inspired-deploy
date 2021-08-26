import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { signOut } from 'next-auth/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHistory, faUser, faSignOut, faPlus } from '@fortawesome/pro-light-svg-icons'

function ProfileNavbar(props) {

    const logoutHandler = () => {
        signOut()
    }

    return (
        <Container>
            <ListStyle>
                <Link href="/design-boards" passHref><LinkStyle><IconStyle icon={faHeart} />Design Boards</LinkStyle></Link>
            </ListStyle>
            <ListStyle>
                <Link href="/order-history" passHref><LinkStyle><IconStyle icon={faHistory} />Order History</LinkStyle></Link>
            </ListStyle>
            <ListStyle>
                <Link href="/projects/add-new-project" passHref><LinkStyle><IconStyle icon={faPlus} />Add Project</LinkStyle></Link>
            </ListStyle>
            <ListStyle>
                <Link href="/edit-profile" passHref><LinkStyle><IconStyle icon={faUser} />Edit Profile</LinkStyle></Link>
            </ListStyle>
            <ListStyle key="115462" onClick={logoutHandler}><IconStyle icon={faSignOut} />Log out</ListStyle>
        </Container>
    )
}

export default ProfileNavbar

const Container = styled.ul`
background: white;
display: flex;
flex-direction: column;
list-style: none;
box-shadow: var(--boxShadow);
max-width: 250px;
width: 100%;
position: absolute;
top: 35px;
right: 20px;
padding: 0;
`

const ListStyle = styled.li`
 cursor: pointer;
 color: var(--darkGrey);
 padding: 10px 10px;
 display: block;

`
const LinkStyle = styled.a`
cursor: pointer;
 color: var(--darkGrey);
 display: block;
&:hover{ 
    color: black;
}
`
const IconStyle = styled(FontAwesomeIcon)`
display: inline-block;
margin-right: 10px;
`