import AllPins from '../../Components/Pins/AllPins'
import { useEffect, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import { getSession } from 'next-auth/client'

export default function Pins(props) {
    const authCtx = useContext(AuthContext)

    useEffect(() => {
        getSession().then(sessions => {
            authCtx.login(sessions.user.email)
        })
    }, [])
    return (
        <AllPins projectData={props.projectData} />
    )
}

export async function getServerSideProps() {
    const response = await fetch("https://inspiry.co.nz/wp-json/wp/v2/projects")
    const data = await response.json()

    const projectData = data.map(item => {
        return {
            id: item.id,
            slug: item.slug,
            title: item.title.rendered,
            gallery: item.acf.gallery
        }
    })

    return {
        props: {
            projectData: projectData
        }
    }
}