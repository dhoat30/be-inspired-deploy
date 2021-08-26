import React from 'react'
import styled from 'styled-components'
function MediumTitle(props) {
    return (
        <Container className={props.className} align={props.align}>{props.children} </Container>
    )
}

export default MediumTitle
const Container = styled.h6`
    font-size: 1.3rem;
    font-weight: 500;
    text-align: ${props => props.align ? props.align : "left"};
    margin: 10px 0;
`