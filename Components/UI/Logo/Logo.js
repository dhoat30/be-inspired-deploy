import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import ILogo from './ILogo/ILogo'
import axios from 'axios'
function Logo(props) {
    const [logo, setLogo] = useState('')
    useEffect(() => {
        fetch('/api/getLogo')
            .then(res => res.json())
            .then(res => setLogo(res.data[0].acf))
    }, [])

    let img
    let logoIcon
    if (logo) {
        const logoData = {
            logo: logo.logo.url,
            iLogo: logo.icon_logo.url
        }

        img = (<Image
            src={logoData.logo}
            width={158}
            height={28}
            priority={true}
            alt="Inspiry Logo"
        />)
        logoIcon = (<ILogo imgSrc={logoData.iLogo} />)
    }

    return (
        <Container className={props.className}>
            {props.showIcon ? logoIcon : null}
            {img}
        </Container>
    )
}

export default Logo

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 190px;
`

