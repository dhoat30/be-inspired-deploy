import React from 'react'
import styled from 'styled-components'
function Paragraph(props) {
    return (
        <Container className={props.className}>{props.children}</Container>
    )
}

export default Paragraph

const Container = styled.p`
    margin: 0;
`
