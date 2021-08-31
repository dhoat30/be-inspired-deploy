import React, { useState } from 'react'
import styled from 'styled-components'
import MediumTitle from '../../Titles/Titles/MediumTitle'
import Search from '../../Search/Search'
import Paragraph from '../../Titles/Paragraph/Paragraph'
import Image from 'next/image'
import Button from '../../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons'
function DesignBoardsCard() {
    const [showSaveButton, setShowSaveButton] = useState(false)
    return (
        <Container>
            <MediumTitle align="center">Save to board</MediumTitle>
            <div>
                <SearchStyle />
            </div>
            <Boards>
                <Paragraph>All Boards</Paragraph>
                <BoardsContainer>
                    <SingleBoard
                        onMouseEnter={() => setShowSaveButton(true)}
                        onMouseLeave={() => setShowSaveButton(false)}>
                        <Content>
                            <ImageStyle
                                src="https://inspiry.co.nz/wp-content/uploads/2021/07/WK-30052100.jpg"
                                width="50"
                                height="50"
                            />
                            <ParagraphStyle>Demo</ParagraphStyle>
                        </Content>
                        {showSaveButton ? <Button>Save</Button> : null}
                    </SingleBoard>

                </BoardsContainer>
            </Boards>
            <AddBoard>
                <IconContainer>
                    <IconStyle icon={faPlus} />
                </IconContainer>

                <ParagraphStyle>Create Board</ParagraphStyle>
            </AddBoard>
        </Container>
    )
}
export default DesignBoardsCard

const Container = styled.div`
position: fixed;
width: 100%;
min-width: 250px;
max-width: 350px;
background: white;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 3;
border-radius: var(--cardBorderRadius);
box-shadow: var(--boxShadow); 
`
const SearchStyle = styled(Search)`
@media (max-width: 600px) {
    position: static;
    width: 100%;
    left: 0;
    top: 0;
    transform: translate(0, 0);
    margin: 0 auto;
}
`
const Boards = styled.div`
margin: 20px 25px 0 25px;
@media (max-width: 500px) {
    margin: 20px 10px 0 10px;
}
`
const BoardsContainer = styled.div`
margin: 10px 0; 
height: 300px;
overflow: scroll;
@media (max-width: 500px) {
    height: 250px;
}
`
const SingleBoard = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
border-radius: var(--cardBorderRadius);
padding: 5px;
cursor: pointer;
&:hover{ 
    background: var(--beige);
}
`
const Content = styled.div`
display: flex;
align-items: center;
`
const ImageStyle = styled(Image)`
object-fit: cover;
border-radius: 8px;
`
const ParagraphStyle = styled(Paragraph)`
font-weight: 700;
margin-left: 10px;
`
const AddBoard = styled.div`
display: flex;
align-items: center;
margin: 0 25px; 
padding: 10px 0;
cursor: pointer;
@media (max-width: 500px) {
    margin: 0 10px 0 10px;
}
`
const IconContainer = styled.div`
padding: 8px 15px;
background: var(--beige);
border-radius: 8px;
`
const IconStyle = styled(FontAwesomeIcon)`
font-size: 30px;
`