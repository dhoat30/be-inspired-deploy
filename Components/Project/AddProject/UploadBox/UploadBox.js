import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/pro-duotone-svg-icons'
import MediumTitle from '../../../UI/Titles/Titles/MediumTitle'
import Loading from '../../../UI/Loading/Loading'
import uploadImages from '../../../../util/upload-images-function'

function UploadBox(props) {

    const [enteredImages, setEnteredImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showImage, setShowImage] = useState('')
    const uploadRef = useRef()

    useEffect(() => {
        console.log(enteredImages)
        props.onUploadData(enteredImages)
    }, [enteredImages, props])

    const imageChangeHandler = async (e) => {
        let imagesArray = []
        if (e.target.files) {
            for (let i = 0; i < e.target.files.length; i++) {
                console.log(e.target.files[i])

                // send request to upload image
                let formdata = new FormData();
                setLoading(true) //set loading to true 
                formdata.append("file", e.target.files[i], e.target.files[i].name);

                const headers = {
                    "Authorization": `Bearer ${props.authToken}`
                }
                uploadImages('https://inspiry.co.nz/wp-json/wp/v2/media', formdata, headers)
                    .then(res => {
                        setLoading(false)
                        console.log(res)
                        if (res.code) {
                            setError(res.message)
                        }
                        else {
                            setEnteredImages(oldArray => [...oldArray, res])
                            if (res.media_details.sizes.shop_catalog) {
                                setShowImage(res.media_details.sizes.shop_catalog.source_url)
                            }
                            else {
                                setShowImage(res.source_url)
                            }
                        }
                    })
                    .catch(err => {
                        setLoading(false)
                    })
            }
        }

    }

    const boxClickHandler = () => {
        if (!enteredImages && !props.clearImage) {
            uploadRef.current.click()
        }
        else {
            uploadRef.current.click()
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
    }

    return (
        <React.Fragment>
            <form onSubmit={submitHandler}>
                <Container onClick={boxClickHandler}>
                    <BorderLine>

                        {!loading ?
                            <Content>
                                {showImage && !props.clearImage ? <ImgStyle src={showImage} /> :
                                    <>
                                        <IconStyle icon={faArrowCircleUp} size="3x" />
                                        <MediumTitleStyle align="center" >
                                            Drag and drop or click to upload a gallery
                                        </MediumTitleStyle>
                                        <div className="error"> {error} </div>
                                    </>
                                }
                            </Content>
                            : <Loading />}
                    </BorderLine>
                </Container>


                <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={imageChangeHandler}
                    multiple accept="image/*"
                    ref={uploadRef} />
            </form>

        </React.Fragment>
    )
}

export default UploadBox
const Container = styled.div`
    border: 1px solid var(--lightGrey);
    background: var(--beige);
    position: relative;
    width: 40%;

    min-width: 300px;

    cursor: pointer;
`
const BorderLine = styled.div`
 height: 400px;
border: 3px dashed #F8CEA4; 

margin: 10px;
border-radius: var(--cardBorderRadius);
display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
`

const Content = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    max-width: 250px;
`
const ImgStyle = styled.img`
width: 100%;
height: auto;
`
const IconStyle = styled(FontAwesomeIcon)`
color: #EDAA67;
`

const MediumTitleStyle = styled(MediumTitle)`
color: #EDAA67;
`