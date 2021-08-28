import React, { useState } from 'react'
import styled from 'styled-components'
import ImageCards from '../ImageCards/ImageCards'
import * as styles from './AllPins.module.css'

import Link from 'next/link'
import LoadingOverlay from '../../UI/LoadingOverlay/LoadingOverlay'
function Content(props) {
    const [showOverlay, setShowOverlay] = useState(false)

    const clickHandler = () => {
        setShowOverlay(true)
    }

    const card = props.projectData.map(item => {
        if (item.title && item.gallery[0]) {
            return (
                <div key={item.id} onClick={clickHandler}>
                    <Link href={`/pins/${item.slug}`} passHref>
                        <AnchorTag>
                            {item.gallery[0] ?
                                <ImageCards src={item.gallery[0].url} />
                                : null
                            }

                            {item.title}
                        </AnchorTag>
                    </Link>
                </div>
            )
        }

    })
    return (
        <React.Fragment>
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
            <LoadingOverlay show={showOverlay} />
        </React.Fragment>

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

