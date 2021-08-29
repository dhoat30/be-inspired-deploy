import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SectionTitle from '../../../UI/Titles/Titles/SectionTitle'
import Form from './Form/Form'
function EditProfile({ userData, authToken }) {
    const [optionsData, setOptionsData] = useState('')
    useEffect(() => {
        fetch('/api/select-options/select-options')
            .then(res => res.json())
            .then(res => setOptionsData(res.data[0].acf))
            .catch(err => console.log(err))
    }, [])
    return (
        <Container>
            <SectionTitle> Edit Profile</SectionTitle>
            {optionsData ?
                <Form userData={userData} optionsData={optionsData} authToken={authToken} />
                : null
            }

        </Container>
    )
}
export default EditProfile

const Container = styled.div`
    padding: 20px 30px;
`