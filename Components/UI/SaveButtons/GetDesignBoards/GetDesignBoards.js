import React from 'react'
import Paragraph from '../../Titles/Paragraph/Paragraph'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/pro-light-svg-icons'
function GetDesignBoards({ title, boardNameClick }) {
    return (
        <Container onClick={boardNameClick}>
            <ParagraphStyle>{title}
            </ParagraphStyle>
            <IconStyle icon={faChevronDown} />
        </Container>
    )
}

export default GetDesignBoards
const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
`
const ParagraphStyle = styled(Paragraph)`
max-width: 120px;
color: white;
`
const IconStyle = styled(FontAwesomeIcon)`
margin-left: 10px;
color: white;
`