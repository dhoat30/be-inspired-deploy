import React from 'react'
import Button from '../Button/Button'
import GetDesignBoards from './GetDesignBoards/GetDesignBoards'
import styled from 'styled-components'

function SaveButtons({ title, onClick, boardNameClick }) {
    return (
        <Container onClick={onClick}>
            <GetDesignBoards title={title} boardNameClick={boardNameClick} />
            <Button bkColor="var(--beige)">Save</Button>
        </Container>
    )
}

export default SaveButtons

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
max-width: 90%;
margin: 0 auto;
position: absolute;
top: 10px;
left: 50%;
transform: translate(-50%, 0);
z-index: 3;
`
