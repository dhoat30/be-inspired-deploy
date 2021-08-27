import Head from 'next/head'
import Image from 'next/image'
import LoggedOut from '../../Components/LoggedOut/LoggedOut'
export default function SinglePin(props) {
    return (
        <h1>{props.title}</h1>
    )
}


export async function getServerSideProps(context) {
    const { params } = context
    const pinID = params.pid

    const response = await fetch(`https://inspiry.co.nz/wp-json/wp/v2/projects?slug=${pinID}`)
    const data = await response.json()
    console.log(data[0].title)
    const tradeProfessionalID = false
    return {
        props: {
            title: data[0].title,
            gallery: data[0].acf.gallery,
            website: data[0].acf.website_link,
            description: data[0].acf.description,
            tradeProfessionalID: tradeProfessionalID

        }
    }
}