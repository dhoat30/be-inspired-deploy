import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHistory, faUser } from '@fortawesome/pro-regular-svg-icons'

function SideNavbar(props) {
    const designBoardsHandler = (e) => {
        props.designBoards()
    }
    const viewOrdersHandler = (e) => {
        props.viewOrders()
    }
    const editProfileHandler = (e) => {
        props.editProfile()
    }

    return (
        <Container>
            <List onClick={designBoardsHandler} showBackground={props.navData.showDesignBoards}>
                <IconStyle icon={faHeart} />
                Design Boards
            </List>
            <List onClick={viewOrdersHandler} showBackground={props.navData.showViewOrders}>
                <IconStyle icon={faHistory} />
                View Orders
            </List>
            <List onClick={editProfileHandler} showBackground={props.navData.showEditProfile}>
                <IconStyle icon={faUser} />
                Edit Profile
            </List>

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