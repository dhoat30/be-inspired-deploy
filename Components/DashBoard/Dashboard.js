import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import ProfilePicture from './ProfilePicture/ProfilePicture'
import LoadingOverlay from '../UI/LoadingOverlay/LoadingOverlay'
import styled from 'styled-components'
import SideNavbar from './SideNavbar/SideNavbar'
import DesignBoards from './Body/DesignBoards/DesignBoards'
import ViewOrders from './Body/ViewOrders/ViewOrders'
import EditProfile from './Body/EditProfile/EditProfile'

function Dashboard({ authToken }) {

    const [userID, setUserID] = useState('')
    const [userData, setUserData] = useState('')
    const [showDesignBoards, setShowDesignBoards] = useState(true)
    const [showViewOrders, setShowViewOrders] = useState(false)
    const [showEditProfile, setShowEditProfile] = useState(false)

    const designBoardsHandler = () => {
        setShowDesignBoards(true)
        setShowViewOrders(false)
        setShowEditProfile(false)
    }

    const viewOrdersHandler = () => {
        setShowDesignBoards(false)
        setShowViewOrders(true)
        setShowEditProfile(false)
    }

    const editProfileHandler = () => {
        setShowDesignBoards(false)
        setShowViewOrders(false)
        setShowEditProfile(true)
    }

    const navData = {
        showDesignBoards,
        showViewOrders,
        showEditProfile
    }

    useEffect(() => {
        // register request
        axios.get(`https://inspiry.co.nz/wp-json/wp/v2/users?slug=${authToken.username}`)
            .then(response => {
                setUserID(response.data[0].id)
                return axios({
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken.token}`
                    },
                    url: `https://inspiry.co.nz/wp-json/wp/v2/users/${response.data[0].id}`,
                    data: {
                        id: response.data[0].id
                    }
                })
            }).then(response => {
                setUserData(response)
            }).catch(err => {
                console.log(err)
            })
    }, [authToken.username])

    if (userID) {
        authToken.userID = userID
    }

    return (
        <React.Fragment>
            {userData ?
                <Container>
                    <Sidebar>
                        <ProfilePicture userData={userData} />
                        <SideNavbar
                            navData={navData}
                            designBoards={designBoardsHandler}
                            viewOrders={viewOrdersHandler}
                            editProfile={editProfileHandler}
                        />
                    </Sidebar>
                    <Body>
                        {showDesignBoards ? <DesignBoards /> : null}
                        {showViewOrders ? <ViewOrders /> : null}
                        {showEditProfile ? <EditProfile userData={userData} authToken={authToken} /> : null}
                    </Body>
                </Container>
                : <LoadingOverlay show={true} />}
        </React.Fragment>
    )
}

export default Dashboard
const Container = styled.section`
min-height: 100vh;
height: auto;
background: var(--offWhite);
display: flex;
`
const Sidebar = styled.div`
    padding: 100px 0;
    margin: 0 20px;
    width: 350px;
`
const Body = styled.div`
width: 100%;
min-height: 500px;
background: white;
margin: 100px 20px 100px 0;
border-radius: var(--cardBorderRadius);
`