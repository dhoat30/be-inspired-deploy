
import SinglePin from '../../Components/Pins/SinglePin/SinglePin'

export default function SinglePinPage(props) {
    return (
        <SinglePin pinData={props.pinData} />
    )
}


export async function getServerSideProps(context) {
    const { params } = context
    const pinID = params.pid

    const response = await fetch(`https://inspiry.co.nz/wp-json/wp/v2/projects?slug=${pinID}`)
    const data = await response.json()
    const pinData = {
        title: data[0].title.rendered,
        gallery: data[0].acf.gallery,
        website: data[0].acf.website_link,
        description: data[0].acf.description,
        tradeProfessionalID: data[0].acf.trade_professional_id
    }
    return {
        props: {
            pinData: pinData
        }
    }
}