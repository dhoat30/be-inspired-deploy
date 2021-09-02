import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import MediumTitle from '../../Titles/Titles/MediumTitle'
import Search from '../../Search/Search'
import Paragraph from '../../Titles/Paragraph/Paragraph'
import Image from 'next/image'
import Button from '../../Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons'
import axios from 'axios'
import NotificationContext from '../../../../store/notification-context'
function DesignBoardsCard({ cancelClick, designBoards, designBoardImages, clickedCardData, authToken }) {
    const [boardImages, setBoardImages] = useState([])
    const [showSaveButton, setShowSaveButton] = useState(-1)

    const notificationCtx = useContext(NotificationContext)
    // useEffect(() => {
    //     if (designBoardImages) {
    //         designBoardImages.map(item => {
    //             fetch(`https://inspiry.co.nz/wp-json/wp/v2/media/${item.featured_media}`)
    //                 .then(res => res.json())
    //                 .then(res => setBoardImages((prevVals => [...prevVals, res])))
    //                 .catch(err => console.log(err))
    //         })
    //     }

    // }, [designBoardImages])
    // console.log(boardImages)
    const mouseEnterHandler = (id) => {
        setShowSaveButton(id)
    }

    // save post to board 
    const saveButtonHandler = (boardData) => {
        console.log(clickedCardData)
        console.log(boardData)

        axios.post('/api/boards/add-to-board', {
            projectID: clickedCardData.id,
            boardID: boardData.id,
            postTitle: clickedCardData.title,
            status: "publish",
            token: authToken
        })
            .then(res => {
                if (res.data.data.message) {
                    notificationCtx.showNotification({
                        title: "Error",
                        message: `${res.data.data.message}`,
                        status: "error"
                    })
                }
                else {
                    notificationCtx.showNotification({
                        title: "Success",
                        message: `Saved to ${boardData.title}`,
                        status: "success"
                    })


                }
            })
            .catch(err => console.log(err))
    }

    const designBoard = designBoards.data.map((board, index) => {
        return (
            <SingleBoard key={board.id}
                onMouseEnter={() => mouseEnterHandler(board.id)}
                onMouseLeave={() => setShowSaveButton(-1)}>
                <Content>
                    <ImageStyle
                        src={"https://inspiry.co.nz/wp-content/uploads/2020/12/icon-card@2x.jpg"}
                        width="50"
                        height="50"
                    />
                    <ParagraphStyle>{board.title} </ParagraphStyle>
                </Content>
                {showSaveButton === board.id ? <Button onClick={() => saveButtonHandler(board)}>Save</Button> : null}
            </SingleBoard>
        )
    })
    return (
        <Container>
            <MediumTitle align="center">Save to board</MediumTitle>
            <div>
                <SearchStyle />
            </div>
            <Boards>
                <Paragraph >All Boards</Paragraph>
                <BoardsContainer >

                    {designBoard}
                </BoardsContainer>
            </Boards>
            <AddBoard >
                <IconContainer>
                    <IconStyle icon={faPlus} />
                </IconContainer>

                <AddBoardButtons>
                    <ParagraphStyle>Create Board</ParagraphStyle>
                    <Paragraph onClick={cancelClick}>Cancel</Paragraph>
                </AddBoardButtons>
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
const AddBoardButtons = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
`