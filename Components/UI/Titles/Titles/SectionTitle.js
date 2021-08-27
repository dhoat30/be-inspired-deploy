import React from 'react'
import styled from 'styled-components'
function SectionTitle(props) {
    return (
        <Container className={props.className}>{props.children}</Container>
    )
}

export default SectionTitle
const Container = styled.h2`
font-size: 2.5rem;
margin: 10px 0;
font-weight: 600;
`