import React from 'react'
import styled from 'styled-components'
function DesignBoardCard({ title }) {
    return (
        <Container>
            {title}
        </Container>
    )
}

export default DesignBoardCard
const Container = styled.div`
  width: 250px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--beige);
    margin-right: 30px;
`
