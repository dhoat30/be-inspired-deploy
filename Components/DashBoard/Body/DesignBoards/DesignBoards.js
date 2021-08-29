import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SectionTitle from '../../../UI/Titles/Titles/SectionTitle'
function DesignBoards({ userData, authToken }) {
    const [optionsData, setOptionsData] = useState('')
    useEffect(() => {
        fetch('/api/select-options/select-options')
            .then(res => res.json())
            .then(res => setOptionsData(res.data[0].acf))
            .catch(err => console.log(err))
    }, [])
    return (
        <Container>
            <SectionTitle> Design Boards</SectionTitle>
        </Container>
    )
}
export default DesignBoards

const Container = styled.div`
    padding: 20px 30px;
`
