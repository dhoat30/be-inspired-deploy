import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../../UI/Button/Button'
import Input from '../../../UI/Input/Input'
import LoadingOverlay from '../../../UI/LoadingOverlay/LoadingOverlay'

function DetailForm(props) {
    const [enteredTitle, setEnteredTitle] = useState('')
    const [enteredCategory, setEnteredCategory] = useState('')
    const [enteredSubCategory, setEnteredSubCategory] = useState('')
    const [enteredTradeProfessional, setEnteredTradeProfessional] = useState('')
    const [enteredWebsite, setEnteredWebsite] = useState('')
    const [enteredDesc, setEnteredDesc] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    // change handlers  
    const titleChangeHandler = (e) => {
        setEnteredTitle(e.target.value)
    }
    const categoryChangeHandler = (e) => {
        setEnteredCategory(e.target.value)
    }
    const subCategoryChangeHandler = (e) => {
        setEnteredSubCategory(e.target.value)
    }
    const tradeChangeHandler = (e) => {
        setEnteredTradeProfessional(e.target.value)
    }
    const websiteChangeHandler = (e) => {
        setEnteredWebsite(e.target.value)
    }
    const descChangeHandler = (e) => {
        setEnteredDesc(e.target.value)
    }


    // Parent Categories values
    let selectParentCategories
    // child categories values
    let selectChildCategories

    // trade professional names
    let tradeName
    if (props.categories && props.trade) {
        selectParentCategories = props.categories.map(item => {
            if (item.parent === 0) {
                return (
                    <React.Fragment key={item.id}>
                        <option value={item.id}>{item.name}</option>
                    </React.Fragment>
                )
            }
        })

        selectChildCategories = props.categories.map(item => {
            if (item.parent !== 0) {
                return (
                    <React.Fragment key={item.id}>
                        <option value={item.id}>{item.name}</option>
                    </React.Fragment>
                )
            }
        })
        tradeName = props.trade.map(item => {
            return (
                <React.Fragment key={item.id}>
                    <option value={item.id}>{item.name}</option>
                </React.Fragment>
            )
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const galleryData = props.galleryData.map(item => {
            return {
                ID: item.id
            }
        })
        const formData = {
            title: enteredTitle,
            "project-categories": [
                enteredCategory,
                enteredSubCategory
            ],
            fields: {
                trade_professional_id: enteredTradeProfessional,
                website_link: enteredWebsite,
                description: enteredDesc,
                gallery: galleryData
            },
            status: "publish",
            authToken: props.authToken
        }

        setError('')
        setLoading(true)
        fetch('/api/projects/add-project', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                setLoading(false)
                // clear data
                document.getElementById("detail-form").reset();
                setEnteredTitle('')
                setEnteredCategory('')
                setEnteredSubCategory('')
                setEnteredTradeProfessional('')
                setEnteredWebsite('')
                setEnteredDesc('')
                // clear image uploader 
                props.clearImageUploader()
                if (res.data.code) {
                    setError(res.data.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <React.Fragment>
            <Container onSubmit={submitHandler} id="detail-form">
                <TitleInput
                    type="text"
                    placeholder="Add project title"
                    inputChange={titleChangeHandler}
                    value={enteredTitle}
                />
                <InputBox>
                    <SelectStyle id="categories" name="categories" onChange={categoryChangeHandler}>
                        <option value="category">Select Project Category</option>
                        {selectParentCategories}
                    </SelectStyle>

                    <SelectStyle id="sub-categories" name="sub-categories" onChange={subCategoryChangeHandler}>
                        <option value="sub-category">Select Project Sub-Category</option>
                        {selectChildCategories}
                    </SelectStyle>

                    <SelectStyle id="trade-proffessional" name="trade-proffessional" onChange={tradeChangeHandler}>
                        <option value="select-trade-professional">Select Trade Proffesional</option>
                        {tradeName}
                    </SelectStyle>

                    <InputStyle
                        type="url"
                        placeholder="Add website link"
                        inputChange={websiteChangeHandler}
                        value={enteredWebsite}
                    />
                    <TextAreaStyle placeholder="Add description" value={enteredDesc} onChange={descChangeHandler} />

                </InputBox>
                {error ? <div className="error"> {error} </div> : null}
                <ButtonStyle>Save</ButtonStyle>

            </Container>
            <LoadingOverlay show={loading} />
        </React.Fragment>
    )
}

export default DetailForm

const Container = styled.form`
            width: 55%;
            min-width: 300px;
            `
const InputBox = styled.div`
            margin-top: 50px;
            `
const InputStyle = styled(Input)`
            font-size: 1rem;
            border: none;
            height: auto;
            border-bottom:${props => props.focus ? "3px solid #4a85c9" : "1px solid var(--lightGrey)"};
            border-radius: 0;
            color: var(--darkGrey);
            padding: 0 0 10px 0;
            `
const TitleInput = styled(InputStyle)`
            font-size: 2rem;
            font-weight: 600;
            `

const SelectStyle = styled.select`
            width: 100%;
            display: block;
            padding: 10px 0;
            font-size: 1rem;
            margin-bottom: 20px;
            color: var(--lightGrey);
            border:none;
            border-bottom: 1px solid var(--lightGrey);
            `

const TextAreaStyle = styled.textarea`
            width: 100%;
            border: none;
            border-bottom: 1px solid var(--lightGrey);
            color: var(--darkGrey);
            height: 40px;
            margin: 20px 0 0 0;
            font-size: 1rem;
            `

const ButtonStyle = styled(Button)`
            margin: 20px 0 0 auto;
            display: block;
            `