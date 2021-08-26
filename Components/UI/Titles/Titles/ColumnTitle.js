import React from 'react'
import styled from 'styled-components'

function ColumnTitle(props) {
    return (
        <Container>{props.children}</Container>
    )
}

export default ColumnTitle

const Container = styled.h3`
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
`
