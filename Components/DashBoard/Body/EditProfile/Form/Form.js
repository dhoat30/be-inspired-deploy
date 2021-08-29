import React, { useState } from 'react'
import Input from '../../../../UI/Input/Input'
import styled from 'styled-components'
import SelectInput from '../../../../UI/SelectInput/SelectInput'
import Button from '../../../../UI/Button/Button'

function Form({ userData, optionsData, authToken }) {
    const [enteredFirstName, setEnteredFirstName] = useState(userData.data.first_name)
    const [enteredLastName, setEnteredLastName] = useState(userData.data.last_name)
    const [enteredEmail, setEnteredEmail] = useState(userData.data.email)
    const [enteredPhone, setEnteredPhone] = useState("Phone Number")
    const [enteredAge, setEnteredAge] = useState(userData.data.acf.age_group ? userData.data.acf.age_group : "Select")
    const [enteredRegions, setEnteredRegions] = useState(userData.data.acf.region_district ? userData.data.acf.region_district : "Select")
    const [enteredIndustry, setEnteredIndustry] = useState(userData.data.acf.industry ? userData.data.acf.industry : "Select")
    const [enteredCompanyName, setEnteredCompanyName] = useState(userData.data.acf.company_name)
    const [enteredWebsite, setEnteredWebsite] = useState(userData.data.acf.website_url)
    const [enteredJobTitle, setEnteredJobTitle] = useState(userData.data.acf.job_title)

    const [submissionError, setSubmissionError] = useState('')

    const [enteredFirstNameTouched, setEnteredFirstNameTouched] = useState(false)
    const [enteredLastNameTouched, setEnteredLastNameTouched] = useState(false)
    const [enteredEmailTouched, setEnteredEmailTouched] = useState(false)

    // validate First Name
    let enteredFirstNameIsValid = enteredFirstName.length > 2
    const firstNameInputIsInvalid = !enteredFirstNameIsValid && enteredFirstNameTouched

    //   validate last name
    let enteredLastNameIsValid = enteredLastName.length > 2
    const lastNameInputIsInvalid = !enteredLastNameIsValid && enteredLastNameTouched

    // validate email
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    let enteredEmailIsValid = pattern.test(enteredEmail)
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched

    // on blur handler
    const firstNameBlurHandler = () => {
        setEnteredFirstNameTouched(true)
    }
    const lastNameBlurHandler = () => {
        setEnteredLastNameTouched(true)
    }
    const emailBlurHandler = () => {
        setEnteredEmailTouched(true)
    }
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

    const websiteChangeHandler = (e) => {
        setEnteredWebsite(e.target.value)
    }
    const ageGroupChangeHandler = (e) => {

        setEnteredAge(e.target.value)
    }
    const regionChangeHandler = (e) => {
        setEnteredRegions(e.target.value)
    }
    const industryChangeHandler = (e) => {
        setEnteredIndustry(e.target.value)
    }
    const companyNameChangeHandler = (e) => {
        setEnteredCompanyName(e.target.value)
    }
    const jobTitleChangeHandler = (e) => {
        setEnteredJobTitle(e.target.value)
    }
    // input Data
    const inputData = [
        {
            title: "First Name*",
            type: "text",
            inputChange: firstNameChangeHandler,
            value: enteredFirstName,
            onBlur: firstNameBlurHandler,
            isInvalid: firstNameInputIsInvalid,
            errorMessage: "Enter first name"
        },
        {
            title: "Last Name*",
            type: "text",
            inputChange: lastNameChangeHandler,
            value: enteredLastName,
            onBlur: lastNameBlurHandler,
            isInvalid: lastNameInputIsInvalid,
            errorMessage: "Enter last name"
        },
        {
            title: "Email*",
            type: "email",
            inputChange: emailChangeHandler,
            value: enteredEmail,
            onBlur: emailBlurHandler,
            isInvalid: emailInputIsInvalid,
            errorMessage: "Enter valid email address"
        },
        {
            title: "Phone Number",
            type: "text",
            inputChange: phoneChangeHandler,
            value: enteredPhone
        },
        {
            title: "Website Url",
            type: "url",
            inputChange: websiteChangeHandler,
            value: enteredWebsite
        }
    ]

    const inputFields = inputData.map(item => {
        return (<InputContainer key={item.title}>
            <LabelStyle htmlFor={item.title}> {item.title}</LabelStyle>
            <InputStyle
                isInvalid={item.isInvalid}
                type={item.type}
                placeholder={item.title}
                value={item.value}
                inputChange={item.inputChange}
                blurChange={item.onBlur}
            />
            {item.isInvalid ?
                <div className="error left-align">{item.errorMessage} </div> : null
            }

        </InputContainer>
        )
    })

    let ageData
    let regionData
    let industryData
    if (optionsData) {
        ageData = optionsData.age_group.map(option => {
            return {
                title: option
            }
        })

        regionData = optionsData.region_district.map(option => {
            return {
                title: option
            }
        })
        industryData = optionsData.industry.map(option => {
            return {
                title: option
            }
        })
    }

    async function submitHandler(e) {
        e.preventDefault()

        const body = {
            first_name: enteredFirstName,
            last_name: enteredLastName,
            email: enteredEmail,
            acf: {
                phone_number: enteredPhone,
                website_url: enteredWebsite,
                age_group: enteredAge,
                region_district: enteredRegions,
                industry: enteredIndustry,
                company_name: enteredCompanyName,
                job_title: enteredJobTitle
            }
        }
        fetch(`https://inspiry.co.nz/wp-json/wp/v2/users/${authToken.userID}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken.token}`
            },
            method: "POST",
            body: JSON.stringify(body)
        }
        )
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))


    }

    // console.log(`${enteredFirstName} & ${enteredLastName} & ${enteredEmail} & ${enteredPhone} & ${enteredWebsite} & ${enteredCompanyName} & ${enteredJobTitle} & ${enteredAge} & ${enteredRegions} & ${enteredIndustry} & `)
    return (
        <FormContainer onSubmit={submitHandler}>
            {inputFields}

            <InputContainer>
                <LabelStyle htmlFor="Age Group"> Age Group</LabelStyle>
                <SelectInput defaultValue={enteredAge} name="age-group" options={ageData} onChange={ageGroupChangeHandler} />
            </InputContainer>

            <InputContainer>
                <LabelStyle htmlFor="Region/District"> Region/District</LabelStyle>
                <SelectInput defaultValue={enteredRegions} name="region" options={regionData} onChange={regionChangeHandler} />
            </InputContainer>

            <InputContainer>
                <LabelStyle htmlFor="Industry"> Industry</LabelStyle>
                <SelectInput defaultValue={enteredIndustry} name="industry" options={industryData} onChange={industryChangeHandler} />
            </InputContainer>

            <InputContainer>
                <LabelStyle htmlFor="company-name"> Company Name</LabelStyle>
                <InputStyle
                    type="text"
                    placeholder="Company Name"
                    value={enteredCompanyName}
                    inputChange={companyNameChangeHandler}
                />
            </InputContainer>
            <InputContainer>
                <LabelStyle htmlFor="job-title"> Job Title</LabelStyle>
                <InputStyle
                    type="text"
                    placeholder="Job Title"
                    value={enteredJobTitle}
                    inputChange={jobTitleChangeHandler}
                />
            </InputContainer>
            <ButtonStyle disabled>Save</ButtonStyle>
        </FormContainer>
    )
}
export default Form

const FormContainer = styled.form`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
max-width: 640px;
`
const InputContainer = styled.div`
width: 50%;
max-width: 300px;
margin-bottom: 30px;
@media (max-width: 1050px){ 
    width: 100%;
    max-width: 100%;
}
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
const ButtonStyle = styled(Button)`
margin: 0 0 0 auto;
padding: 10px 50px !important;
font-size: 1.2rem;
`
const Border = styled.div`
border-bottom: 2px solid var(--beige);

`