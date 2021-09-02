import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHistory, faUser } from '@fortawesome/pro-regular-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

function SideNavbar(props) {
    const [showDesignBoards, setShowDesignBoards] = useState(false)
    const [showViewOrders, setShowViewOrders] = useState(false)
    const [showEditProfile, setShowEditProfile] = useState(false)

    const router = useRouter()
    // if (router.asPath === "/members/design-boards") {
    //     setShowDesignBoards(true)
    // }
    // else if (router.asPath === "/members/order-history") {
    //     setShowViewOrders(true)
    // }
    // else if (router.asPath === "/members/edit-profile") {
    //     setShowEditProfile(true)
    // }

    // const designBoardsHandler = (e) => {
    //     props.designBoards()
    // }
    // const viewOrdersHandler = (e) => {
    //     props.viewOrders()
    // }
    // const editProfileHandler = (e) => {
    //     props.editProfile()
    // }

    return (
        <Container>
            <Link href="/members/design-boards" passHref>
                <List showBackground={showDesignBoards}>
                    <IconStyle icon={faHeart} />
                    Design Boards
                </List>
            </Link>
            <Link href="/members/order-history" passHref>
                <List showBackground={showViewOrders}>
                    <IconStyle icon={faHistory} />
                    View Orders
                </List>
            </Link>
            <Link href="/members/edit-profile" passHref>
                <List showBackground={showEditProfile}>
                    <IconStyle icon={faUser} />
                    Edit Profile
                </List>
            </Link>
        </Container>
    )
}

export default SideNavbar
const Container = styled.ul`
 list-style: none; 
 padding: 0;
 margin-top: 50px;
`

const List = styled.li`
 font-size: 1.2rem;
 font-weight: 500;
 color: var(--darkGrey);
 background: ${props => props.showBackground ? "white" : null};
 box-shadow:  ${props => props.showBackground ? "var(--boxShadow)" : null};
 padding: 25px 20px;
 margin: 10px 0;
 border-radius: var(--cardBorderRadius);
 cursor: pointer;
 &:hover{
     color: black;
     background: white;
     box-shadow: var(--boxShadow);
 }
`
const IconStyle = styled(FontAwesomeIcon)`
 margin-right: 10px;
 font-size: 1.5rem;
 
`