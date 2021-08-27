import React from 'react'
import styled from 'styled-components'
import ImageCards from '../ImageCards/ImageCards'
import * as styles from './AllPins.module.css'

import Link from 'next/link'
function Content(props) {
    const card = props.projectData.map(item => {
        return (
            <div key={item.id}>
                <Link href={`/pins/${item.slug}`} passHref>
                    <AnchorTag>
                        <ImageCards projectData={props.projectData} src={item.gallery[0].url} />
                        {item.title}
                    </AnchorTag>
                </Link>
            </div>
        )
    })
    return (
        <Container className={`${styles.mercCardsContainer}`}>
            {card}
            {card}
            {card}
            {card}
            {card}
            {card}
            {card}
            {card}
            {card}

        </Container>
    )
}

export default Content
const Container = styled.div`
`
const AnchorTag = styled.a`
color: var(--darkGrey); 
text-decoration: none; 
font-weight: 600;
font-size: 1.1rem;
`

