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
    const [isBoardNameClicked, setIsBoardNameClicked] = useState(false)
    const [showSaveButtons, setShowSaveButtons] = useState(-1)
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

    const boardNameClickHandler = () => {
        setIsBoardNameClicked(true)
        console.log(isBoardNameClicked)
    }


    const anchorClickHandler = (e) => {
        setShowOverlay(true)
    }
    const onMouseEnterHandler = id => {
        setShowSaveButtons(id)
    }
    const testLeaveHandler = e => {
        setShowSaveButtons(-1)
    }

    const card = props.projectData.map(item => {
        if (item.title && item.gallery[0]) {
            return (
                <CardContainer key={item.id} id={item.id} onMouseLeave={testLeaveHandler} onMouseEnter={() => onMouseEnterHandler(item.id)}>

                    {showSaveButtons === item.id ?
                        <SaveButtons title={designBoard.title} />
                        : null}

                    <Link href={`/pins/${item.slug}`} passHref >
                        <AnchorTag onClick={anchorClickHandler}>
                            {item.gallery[0] ?
                                <ImageCards src={item.gallery[0].url} showOverlay={showSaveButtons === item} />
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
            <DesignBoardsCard />
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
const CardContainer = styled.div`
position: relative;
border: solid red;
`
