import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import ImageCards from '../ImageCards/ImageCards'
import * as styles from './AllPins.module.css'
import Link from 'next/link'
import LoadingOverlay from '../../UI/LoadingOverlay/LoadingOverlay'
import DesignBoardsCard from '../../UI/Cards/DesignBoardsCard/DesignBoardsCard'
import SaveButtons from '../../UI/SaveButtons/SaveButtons'
import Overlay from '../../UI/Overlay/Overlay'
import AuthContext from '../../../store/auth-context'
import NotificationContext from '../../../store/notification-context'
import axios from 'axios'

function Content(props) {
    const [showOverlay, setShowOverlay] = useState(false)
    const [designBoard, setDesignBoard] = useState(false)
    const [showSaveButtons, setShowSaveButtons] = useState(-1)
    const [showDesignBoardsCard, setShowDesignBoardsCard] = useState(false)
    const [designBoardImages, setDesignBoardImages] = useState('')
    const [clickedProjectData, setClickedProjectData] = useState('')
    const [testArray, setTestArray] = useState([])
    // get auth token 
    const authContext = useContext(AuthContext)
    let token = authContext.token

    // notification context
    const notificationCtx = useContext(NotificationContext)

    // get the board name 
    useEffect(() => {
        axios.post('/api/boards/boards', {
            token: token
        })
            .then(res => {
                if (!res.data.data.data) {
                    setDesignBoard(res.data)
                    // get product ids 
                    const productIDS = res.data.data.map(item => {
                        if (item.product_id) {
                            return item.product_id
                        }
                    })
                    // convert array to string 
                    let idString = productIDS.toString()
                    return axios(`https://inspiry.co.nz/wp-json/wp/v2/product?include=${idString}`)
                }
            })
            .then(res => setDesignBoardImages(res.data))
            .catch(err => console.log(err))
    }, [token])

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
    const boardNameClickHandler = (item) => {
        setClickedProjectData(item)
        setShowDesignBoardsCard(true)
    }

    const saveButtonClickHandler = (projectData) => {
        axios.post('/api/boards/add-to-board', {
            projectID: projectData.id,
            boardID: designBoard.data[0].id,
            postTitle: projectData.title,
            status: "publish",
            token: token
        })
            .then(res => {
                if (res.data.data.message) {
                    notificationCtx.showNotification({
                        title: "Error",
                        message: `${res.data.data.message}`,
                        status: "error"
                    })
                }
                else {
                    notificationCtx.showNotification({
                        title: "Success",
                        message: `Saved to ${designBoard.data[0].title}`,
                        status: "success"
                    })
                }
            })
            .catch(err => console.log(err))
    }

    const card = props.projectData.map((item, index) => {
        if (item.title && item.gallery[0]) {
            return (
                <CardContainer key={item.id} id={item.id} onMouseLeave={onMouseLeaveHandler} onMouseEnter={() => onMouseEnterHandler(item.id)}>

                    {showSaveButtons === item.id && designBoard ?
                        <SaveButtons
                            saveButtonClick={() => saveButtonClickHandler(item)}
                            title={designBoard.data[0].title}
                            boardNameClick={() => boardNameClickHandler(item)}
                            bkColor="var(--beige)"
                            color="white" />
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
            </Container>

            <LoadingOverlay show={showOverlay} />

            {showDesignBoardsCard ? <Overlay onClick={() => setShowDesignBoardsCard(false)} /> : null}

            {showDesignBoardsCard ? <DesignBoardsCard
                authToken={token}
                clickedCardData={clickedProjectData}
                designBoards={designBoard}
                designBoardImages={designBoardImages}
                cancelClick={() => setShowDesignBoardsCard(false)} /> : null}

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
