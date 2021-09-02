import React from 'react'
import styled from 'styled-components'
function CreateBoard() {
    return (
        <Container>
            this
        </Container>
    )
}

export default CreateBoard
const Container = styled.div`
    position: fixed;
   max-width: 350px;
   width: 95%;
   min-height: 200px;
   margin: 0 auto;
   background: white;
   border-radius: var(--cardBorderRadius);
   box-shadow: var(--boxShadow);
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);

`