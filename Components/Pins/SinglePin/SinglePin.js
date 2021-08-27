import React from 'react'
import styled from 'styled-components'
import ImageCard from '../../UI/Cards/ImageCard/ImageCard'
import ShareDownloadIcons from './ShareDownloadIcons/ShareDownloadIcons'

function SinglePin(props) {

    return (
        <Container>

            <ImageContainer>
                <ImageCard
                    src={props.pinData.gallery[0].url}
                    alt={props.pinData.title}
                />
            </ImageContainer>
            <ContentContainer>
                <ShareDownloadIcons
                    src={props.pinData.gallery[0].url}
                    alt={props.pinData.title}
                />
            </ContentContainer>
        </Container>
    )
}

export default SinglePin
const Container = styled.section`
            margin: 50px auto;
            box-shadow: var(--boxShadow);
            border-radius: var(--cardBorderRadius);
            max-width: 1000px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 95%;
            @media (max-width: 1000px){
                margin: 50px auto;
}
            `

const ImageContainer = styled.div`
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            width: 50%;
            margin: 0 auto 0 0;
            position: relative;
            height: 700px;
            padding: 20px !important;
            @media (max-width: 1000px){
                width: 100%;
}
            `

const ContentContainer = styled.div`
            width: 50%;
            padding: 20px 50px;
            @media (max-width: 1000px){
                width: 100%;
}


            `