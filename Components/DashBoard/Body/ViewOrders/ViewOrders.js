import React from 'react'
import styled from 'styled-components'
import SectionTitle from '../../../UI/Titles/Titles/SectionTitle'

function ViewOrders({ userData, authToken }) {

    return (
        <Container>
            <SectionTitle> Order History</SectionTitle>
        </Container>
    )
}
export default ViewOrders

const Container = styled.div`
    padding: 20px 30px;
`