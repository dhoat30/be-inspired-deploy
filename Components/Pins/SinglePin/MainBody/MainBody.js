import React from 'react'
import styled from 'styled-components'
import Anchor from '../../../UI/Anchor/Anchor'
import Paragraph from '../../../UI/Titles/Paragraph/Paragraph'
import ColumnTitle from '../../../UI/Titles/Titles/ColumnTitle'
import LargeTitle from '../../../UI/Titles/Titles/LargeTitle'
import SectionTitle from '../../../UI/Titles/Titles/SectionTitle'
function MainBody(props) {
    return (
        <Container>
            <Anchor href={props.pinData.website}>{props.pinData.website.replace(/(^\w+:|^)\/\//, '')}</Anchor>
            <SectionTitle>{props.pinData.title} </SectionTitle>
            <Paragraph>{props.pinData.description}</Paragraph>
        </Container>
    )
}

export default MainBody

const Container = styled.div`
margin: 20px 0;
`

