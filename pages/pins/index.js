import Head from 'next/head'
import AllPins from '../../Components/Pins/AllPins'

export default function Pins(props) {
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