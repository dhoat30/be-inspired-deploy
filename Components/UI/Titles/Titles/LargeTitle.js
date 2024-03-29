import React from 'react'
import styled from 'styled-components'
function LargeTitle(props) {
    return (
        <Container className={props.className}>{props.children}</Container>
    )
}

export default LargeTitle
const Container = styled.h1`
font-size: 3rem;
margin: 10px 0;
`
