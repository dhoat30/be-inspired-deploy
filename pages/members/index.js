import { getSession } from 'next-auth/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Dashboard from '../../Components/DashBoard/Dashboard'

export default function Members() {
    const [authToken, setAuthToken] = useState('')
    const router = useRouter()
    useEffect(() => {
        getSession().then(sessions => {
            if (!sessions) {
                router.push('/')
            }
            else {
                setAuthToken({
                    token: sessions.user.email,
                    username: sessions.user.name
                })
            }
        })
    }, [router])

    return (
        <Dashboard authToken={authToken} />
    )
}
