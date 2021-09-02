import React, { useState } from 'react'
import styled from 'styled-components'
import SectionTitle from '../../../UI/Titles/Titles/SectionTitle'
import DesignBoardCard from './DeisgnBoardCard/DesignBoardCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/pro-light-svg-icons'
import MediumTitle from '../../../UI/Titles/Titles/MediumTitle'
import CreateBoard from '../../../UI/Cards/CreateBoard/CreateBoard'
function DesignBoards({ userData, authToken, designBoards }) {
    const [showCreateBoard, setShowCreateBoard] = useState(true)
    let designBoardCards
    if (designBoards) {
        designBoardCards = designBoards.data.map(board => {
            return (
                <DesignBoardCard title={board.title} />
            )
        })
    }

    return (
        <Container>
            <SectionTitle> Design Boards</SectionTitle>
            <DesignBoardContainer>
                <CreateNewBoard>
                    <FontAwesomeIcon icon={faPlus} size="3x" />
                    <MediumTitleStyled>Create new board</MediumTitleStyled>
                </CreateNewBoard>
                {designBoards ? designBoardCards : null}
            </DesignBoardContainer>

            {showCreateBoard ? <CreateBoard /> : null}
        </Container>
    )
}
export default DesignBoards

const Container = styled.div`
    padding: 20px 30px;
`
const DesignBoardContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: flex-start;

`
const CreateNewBoard = styled.div`
    width: 250px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--beige);
    margin-right: 30px;
    cursor: pointer;
`
const MediumTitleStyled = styled(MediumTitle)`
font-weight: 700;
`