import React, { useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import DesignBoards from './DesignBoards/DesignBoards'
import ViewOrders from './ViewOrders/ViewOrders'
import EditProfile from './EditProfile/EditProfile'
import { useRouter } from 'next/router'
import UserDataContext from '../../../store/user-data-context'
import axios from 'axios'

function Body({ authToken, userData }) {
    const [designBoards, setDesignBoards] = useState(false)
    const router = useRouter()
    const userDataCtx = useContext(UserDataContext)
    useEffect(() => {
        if (!userDataCtx.optionsData) {
            fetch('/api/select-options/select-options')
                .then(res => res.json())
                .then(res => userDataCtx.getOptionsData(res.data[0].acf))
                .catch(err => console.log(err))
        }

        // get boards
        axios.post('/api/boards/boards', {
            token: authToken.token
        })
            .then(res => {
                if (!res.data.data.data) {
                    setDesignBoards(res.data)
                }
            })
            .catch(err => console.log(err))

    }, [])
    console.log(designBoards)
    return (
        <BodyContainer>
            {router.asPath === "/members/design-boards" ? <DesignBoards designBoards={designBoards} /> : null}
            {router.asPath === "/members/order-history" ? <ViewOrders /> : null}
            {router.asPath === "/members/edit-profile" ?
                <EditProfile
                    optionsData={userDataCtx.optionsData}
                    userData={userData}
                    authToken={authToken} />
                : null}

        </BodyContainer>
    )
}

export default Body
const BodyContainer = styled.section`
width: 100%;
min-height: 500px;
background: white;
margin: 100px 20px 100px 0;
border-radius: var(--cardBorderRadius);
`
