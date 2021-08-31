import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ImageCards from '../ImageCards/ImageCards'
import * as styles from './AllPins.module.css'
import Link from 'next/link'
import LoadingOverlay from '../../UI/LoadingOverlay/LoadingOverlay'
import DesignBoardsCard from '../../UI/Cards/DesignBoardsCard/DesignBoardsCard'
import SaveButtons from '../../UI/SaveButtons/SaveButtons'
import Overlay from '../../UI/Overlay/Overlay'

function Content(props) {
    const [showOverlay, setShowOverlay] = useState(false)
    const [designBoard, setDesignBoard] = useState('')
    const [showSaveButtons, setShowSaveButtons] = useState(-1)
    const [showDesignBoardsCard, setShowDesignBoardsCard] = useState(false)
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
            .then(res => setDesignBoard(res.data[0]))
            .catch(err => console.log(err))
    }, [])
    // set white overlay
    const anchorClickHandler = (e) => {
        setShowOverlay(true)
    }
    // hover event handlers 
    const onMouseEnterHandler = id => {
        setShowSaveButtons(id)
    }
    const onMouseLeaveHandler = e => {
        setShowSaveButtons(-1)
    }
    // board name click handlers 
    const boardNameClickHandler = () => {
        console.log('board name clicked ')
        setShowDesignBoardsCard(true)
    }

    const card = props.projectData.map(item => {
        if (item.title && item.gallery[0]) {
            return (
                <CardContainer key={item.id} id={item.id} onMouseLeave={onMouseLeaveHandler} onMouseEnter={() => onMouseEnterHandler(item.id)}>

                    {showSaveButtons === item.id ?
                        <SaveButtons title={designBoard.title} boardNameClick={boardNameClickHandler} />
                        : null}

                    <Link href={`/pins/${item.slug}`} passHref >
                        <AnchorTag onClick={anchorClickHandler}>
                            {item.gallery[0] ?
                                <ImageCards src={item.gallery[0].url} showOverlay={showSaveButtons === item.id} />
                                : null
                            }

                            {item.title}
                        </AnchorTag>
                    </Link>

                </CardContainer>
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
            {showDesignBoardsCard ? <Overlay onClick={() => setShowDesignBoardsCard(false)} /> : null}
            {showDesignBoardsCard ? <DesignBoardsCard /> : null}
        </React.Fragment>

    )
}

export default Content
const Container = styled.div`
`
const AnchorTag = styled.a`
color: var(--darkGrey); 
text-decoration: none; 
font-weight: 500;
font-size: 1rem;
`
const CardContainer = styled.div`
position: relative;

`
