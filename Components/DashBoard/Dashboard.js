import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProfilePicture from './ProfilePicture/ProfilePicture'
import LoadingOverlay from '../UI/LoadingOverlay/LoadingOverlay'
import styled from 'styled-components'
import SideNavbar from './SideNavbar/SideNavbar'
import DesignBoards from './Body/DesignBoards/DesignBoards'
import ViewOrders from './Body/ViewOrders/ViewOrders'
import EditProfile from './Body/EditProfile/EditProfile'
function Dashboard({ authToken }) {
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

                return axios({
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaW5zcGlyeS5jby5ueiIsImlhdCI6MTYzMDE0ODQ0NCwibmJmIjoxNjMwMTQ4NDQ0LCJleHAiOjE2MzA3NTMyNDQsImRhdGEiOnsidXNlciI6eyJpZCI6IjEyIn19fQ.VfWddrb8RD1JC2yR62O_SGO_dBVXFF9_M-nCDfXZNdI"
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
                        {showEditProfile ? <EditProfile userData={userData} /> : null}
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