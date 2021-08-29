import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import MediumTitle from '../../UI/Titles/Titles/MediumTitle'
function ProfilePicture({ userData }) {
    return (
        <Container>
            <ImageStyle
                src={userData.data.acf.profile_photo.url}
                width="92"
                height="92"
            />
            <div>
                <MediumTitleStyle>{userData.data.first_name}</MediumTitleStyle>
                <MediumTitleStyle>{userData.data.last_name}</MediumTitleStyle>
            </div>

        </Container>
    )
}

export default ProfilePicture
const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
align-items: center;
width: 300px;
`
const ImageStyle = styled(Image)`
border-radius: 50% !important;
`
const MediumTitleStyle = styled(MediumTitle)`
font-weight: 700 !important;
letter-spacing: .02rem;
margin: 0 0 0 20px;
color: var(--darkGrey);
`