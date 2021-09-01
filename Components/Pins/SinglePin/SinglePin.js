import React from 'react'
import styled from 'styled-components'
import ImageCard from '../../UI/Cards/ImageCard/ImageCard'
import SaveBoard from '../../UI/SaveBoard/SaveBoard'
import SaveButtons from '../../UI/SaveButtons/SaveButtons'
import MainBody from './MainBody/MainBody'
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
                <TopSection>
                    <ShareDownloadIcons
                        src={props.pinData.gallery[0].url}
                        alt={props.pinData.title}
                    />
                    <SaveButtonsStyle title="Kitchen" />
                </TopSection>

                <MainBody pinData={props.pinData} />

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
            padding: 20px 20px;
            @media (max-width: 1000px){
                width: 100%;
}
`
const TopSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const SaveButtonsStyle = styled(SaveButtons)`
position: static !important;
justify-content: flex-end;
margin: 0;
width: 200px;
top: 0;
left: 0;
transform: translate(0,0);
`