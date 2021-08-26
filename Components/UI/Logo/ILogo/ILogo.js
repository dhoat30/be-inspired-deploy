import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
function ILogo(props) {
    return (
        <React.Fragment>
            {props.imgSrc ? <LogoIcon
                src={props.imgSrc}
                width={30}
                height={35}
                priority={true}
            /> : null}
        </React.Fragment>
    )
}
const LogoIcon = styled(Image)`
position: absolute !important;
top: 10;
`

export default ILogo
