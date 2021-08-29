import React from 'react'
import Button from '../Button/Button'
import GetDesignBoards from './GetDesignBoards/GetDesignBoards'
import styled from 'styled-components'

function SaveButtons({ title }) {
    return (
        <Container>
            <GetDesignBoards title={title} />
            <Button>Save</Button>
        </Container>
    )
}

export default SaveButtons

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
max-width: 90%;
margin: 0 auto;
`
