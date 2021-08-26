import React from 'react'
import styled from 'styled-components'
function Errors(props) {
    return (
        <Container>{props.children}</Container>
    )
}

export default Errors

const Container = styled.p`
  color: red;
  font-size: 1rem;
  margin: 5px 0;
`