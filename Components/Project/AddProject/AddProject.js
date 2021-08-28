import { faTabletRugged } from '@fortawesome/pro-duotone-svg-icons'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DetailForm from './DetailForm/DetailForm'
import UploadBox from './UploadBox/UploadBox'
import UnderlineLink from '../../UI/Titles/Links/UnderlineLink'
function AddProject(props) {
    const [categoryData, setCategoryData] = useState('')
    const [tradeData, setTradeData] = useState('')
    const [galleryData, setGalleryData] = useState()
    const [clearImage, setClearImage] = useState(false)
    useEffect(() => {
        // get project categories 
        fetch('/api/projects/projects')
            .then(res => res.json())
            .then(res => setCategoryData(res))
            .catch(err => console.log(err))

        // get trade professionals 
        fetch('/api/trade-professionals/trade-professionals')
            .then(res => res.json())
            .then(res => setTradeData(res))
            .catch(err => console.log(err))
    }, [])



    let categories
    let trade
    if (categoryData && tradeData) {
        categories = categoryData.data.map(item => {
            return {
                id: item.id,
                name: item.name,
                slug: item.slug,
                parent: item.parent
            }
        })
        trade = tradeData.data.map(item => {
            return {
                id: item.id,
                name: item.title.rendered,
                slug: item.slug
            }
        })
    }
    function uploadHandler(res) {
        setGalleryData(res)
    }

    console.log(galleryData)

    const clearImageUploader = () => {
        setClearImage(true)
    }
    return (
        <Container>

            <UnderlineLinkStyle href="/pins">Create a Project</UnderlineLinkStyle>
            <ContentBox>
                <UploadBox authToken={props.authToken}
                    onUploadData={uploadHandler}
                    clearImage={clearImage}
                />

                <DetailForm categories={categories}
                    trade={trade}
                    authToken={props.authToken}
                    galleryData={galleryData}
                    clearImageUploader={clearImageUploader}
                />
            </ContentBox>
        </Container>
    )
}

export default AddProject

const Container = styled.section`
    background: var(--offWhite);
    height: 100vh;
    width: 100%;
    border: solid var(--offWhite);
    padding: 10px;
    display: flex;
    flex-direction: column;
`
const ContentBox = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 1200px;
    background: white;
    box-shadow: var(--boxShadow); 
    border-radius: var(--cardBorderRadius);
    padding: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
`
const UnderlineLinkStyle = styled(UnderlineLink)`
max-width: 1200px;
margin: 50px auto 30px auto;

`