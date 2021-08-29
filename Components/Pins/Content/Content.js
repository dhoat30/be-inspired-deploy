import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ImageCards from '../ImageCards/ImageCards'
import * as styles from './AllPins.module.css'
import Link from 'next/link'
import LoadingOverlay from '../../UI/LoadingOverlay/LoadingOverlay'
import SaveButtons from '../../UI/SaveButtons/SaveButtons'

function Content(props) {
    const [showOverlay, setShowOverlay] = useState(false)
    const [designBoardTitle, setDesignBoardTitle] = useState('')

    const bodyData = {
        token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaW5zcGlyeS5jby5ueiIsImlhdCI6MTYzMDE0ODQ0NCwibmJmIjoxNjMwMTQ4NDQ0LCJleHAiOjE2MzA3NTMyNDQsImRhdGEiOnsidXNlciI6eyJpZCI6IjEyIn19fQ.VfWddrb8RD1JC2yR62O_SGO_dBVXFF9_M-nCDfXZNdI`
    }

    useEffect(() => {
        fetch('/api/boards/boards', {
            method: "POST",
            body: JSON.stringify(bodyData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => setDesignBoardTitle(res.data[0]))
            .catch(err => console.log(err))
    }, [])
    const clickHandler = () => {
        setShowOverlay(true)
    }

    const card = props.projectData.map(item => {
        if (item.title && item.gallery[0]) {
            return (
                <div key={item.id} >
                    <SaveButtons title={designBoardTitle.title} />
                    <Link href={`/pins/${item.slug}`} passHref>
                        <AnchorTag onClick={clickHandler}>

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

