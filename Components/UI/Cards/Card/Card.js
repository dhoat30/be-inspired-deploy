import React from 'react'
import Image from 'next/image'
import styled from 'styled-components';

function Card(props) {
    return (
        <React.Fragment>
            <ImgStyle src={props.src} />
        </React.Fragment>

    )
}

export default Card
const ImgStyle = styled.img`
    border-radius: var(--cardBorderRadius);
`
