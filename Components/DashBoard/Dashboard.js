import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import ProfilePicture from './ProfilePicture/ProfilePicture'
import LoadingOverlay from '../UI/LoadingOverlay/LoadingOverlay'
import styled from 'styled-components'
import SideNavbar from './SideNavbar/SideNavbar'
import Body from './Body/Body'
import UserDataContext from '../../store/user-data-context'

function Dashboard({ authToken }) {
    const [userID, setUserID] = useState('')
    const [showDesignBoards, setShowDesignBoards] = useState(true)
    const [showViewOrders, setShowViewOrders] = useState(false)
    const [showEditProfile, setShowEditProfile] = useState(false)

    // user data context
    const userDataCtx = useContext(UserDataContext)

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
        if (!userDataCtx.userData) {
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
                    userDataCtx.getUserData(response)
                }).catch(err => {
                    console.log(err)
                })
        }

    }, [authToken.username])

    if (userID) {
        authToken.userID = userID
    }

    return (
        <React.Fragment>
            {userDataCtx.userData ?
                <Container>
                    <Sidebar>
                        <ProfilePicture userData={userDataCtx.userData} />
                        <SideNavbar
                            navData={navData}
                            designBoards={designBoardsHandler}
                            viewOrders={viewOrdersHandler}
                            editProfile={editProfileHandler}
                        />
                    </Sidebar>
                    <Body
                        showDesignBoards={showDesignBoards}
                        showViewOrders={showViewOrders}
                        showEditProfile={showEditProfile}
                        userData={userDataCtx.userData}
                        authToken={authToken}
                    />
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
