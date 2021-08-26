import { getSession, useSession } from 'next-auth/client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
    useEffect(() => {
        getSession().then(sessions => {

            if (!sessions) {
                router.push('/')
            }
        })
    }, [router])



    return (
        <h1>project index</h1>
    )
}