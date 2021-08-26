import { getSession, useSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AddProject from '../../../Components/Project/AddProject/AddProject'
import React from 'react'

export default function Home() {
    const [authToken, setAuthToken] = useState('')
    const router = useRouter()
    useEffect(() => {
        getSession().then(sessions => {
            if (!sessions) {
                router.push('/')
            }
            else {
                setAuthToken(sessions.user.email)
            }
        })
    }, [router])
    return (
        <React.Fragment>
            {authToken ? <AddProject authToken={authToken} /> : null}
        </React.Fragment>


    )
}
