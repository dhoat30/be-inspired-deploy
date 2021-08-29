import React, { useState } from 'react'
import Input from '../../../../UI/Input/Input'
import styled from 'styled-components'
import SelectInput from '../../../../UI/SelectInput/SelectInput'

function Form({ userData, optionsData }) {
    console.log(userData)
    const [enteredFirstName, setEnteredFirstName] = useState(userData.data.first_name)
    const [enteredLastName, setEnteredLastName] = useState(userData.data.last_name)
    const [enteredEmail, setEnteredEmail] = useState(userData.data.email)
    const [enteredPhone, setEnteredPhone] = useState("Phone Number")
    const [enteredAge, setEnteredAge] = useState(userData.data.acf.age_group)
    const [enteredRegions, setEnteredRegions] = useState(userData.data.acf.region_district)
    const [enteredIndustry, setEnteredIndustry] = useState(userData.data.acf.industry)
    const [enteredCompanyName, setEnteredCompanyName] = useState(userData.data.acf.company_name)
    const [enteredWebsite, setEnteredWebsite] = useState(userData.data.acf.website_url)
    // on change handlers
    const firstNameChangeHandler = (e) => {
        setEnteredFirstName(e.target.value)
    }
    const lastNameChangeHandler = (e) => {
        setEnteredLastName(e.target.value)
    }
    const emailChangeHandler = (e) => {
        setEnteredEmail(e.target.value)
    }
    const phoneChangeHandler = (e) => {
        setEnteredPhone(e.target.value)
    }
    const ageChangeHandler = (e) => {
        setEnteredAge(e.target.value)
    }

    // input Data
    const inputData = [
        {
            title: "First Name",
            type: "text",
            inputChange: firstNameChangeHandler,
            value: enteredFirstName
        },
        {
            title: "Last Name",
            type: "text",
            inputChange: lastNameChangeHandler,
            value: enteredLastName
        },
        {
            title: "Email",
            type: "email",
            inputChange: emailChangeHandler,
            value: enteredEmail
        },
        {
            title: "Phone Number",
            type: "number",
            inputChange: phoneChangeHandler,
            value: enteredPhone
        }
    ]

    const inputFields = inputData.map(item => {
        return (<InputContainer key={item.title}>
            <LabelStyle htmlFor={item.title}> {item.title}</LabelStyle>
            <InputStyle
                type={item.type}
                placeholder={item.title}
                value={item.value}
                inputChange={item.inputChange}
            />
        </InputContainer>
        )
    })

    let ageData
    let regionData
    let industryData
    if (optionsData) {
        ageData = optionsData.age_group.map(option => {
            return {
                value: option,
                title: option
            }
        })

        regionData = optionsData.region_district.map(option => {
            return {
                value: option,
                title: option
            }
        })
        industryData = optionsData.industry.map(option => {
            return {
                value: option,
                title: option
            }
        })
    }

    return (
        <FormContainer>
            {inputFields}

            <InputContainer>
                <LabelStyle htmlFor="Age Group"> Age Group</LabelStyle>
                <SelectInput name="age-group" options={ageData} />
            </InputContainer>

            <InputContainer>
                <LabelStyle htmlFor="Region/District"> Region/District</LabelStyle>
                <SelectInput name="region" options={regionData} />
            </InputContainer>

            <InputContainer>
                <LabelStyle htmlFor="Industry"> Industry</LabelStyle>
                <SelectInput name="industry" options={industryData} />
            </InputContainer>
        </FormContainer>
    )
}
export default Form

const FormContainer = styled.form`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
border: solid red;
max-width: 640px;
`
const InputContainer = styled.div`
width: 50%;
max-width: 300px;
margin-bottom: 30px;
`
const InputStyle = styled(Input)`
 margin: 5px 0;
 border-radius: 10px;
 background: var(--offWhite);
`
const LabelStyle = styled.label`
font-weight: 600;
color: var(--darkGrey);
margin-left: 3px;
`