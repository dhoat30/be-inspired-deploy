import React, { useState } from 'react'
import styled from 'styled-components'
import Logo from '../UI/Logo/Logo'
import Navbar from './Navbar/Navbar'
import Link from 'next/link'
import Search from '../UI/Search/Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/pro-light-svg-icons'
import Backdrop from '../UI/Backdrop/BackdropSection'

function Header() {
    const [showSearch, setShowSearch] = useState(false)

    // show search bar
    const searchIconHandler = () => {
        setShowSearch(true)
    }
    const hideSearchIconHandler = () => {
        setShowSearch(false)
    }
    return (
        <React.Fragment>
            <Backdrop show={showSearch} clicked={hideSearchIconHandler}></Backdrop>
            <Container>
                <Link href="/" passHref>
                    <a> <LogoStyle showIcon={true} /></a>
                </Link>
                <SearchContainer>
                    <IconStyle icon={faSearch} onClick={searchIconHandler} />
                    <SearchStyle showSearch={showSearch} />
                </SearchContainer>

                <Navbar />
            </Container>
        </React.Fragment>

    )
}

export default Header

const Container = styled.section`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 0 20px;
height: 50px;
`

const LogoStyle = styled(Logo)`
@media (max-width: 450px){ 
    width: 150px;
}
`
const SearchContainer = styled.div`
width: 50% !important;
@media(max-width: 600px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
`
const SearchStyle = styled(Search)`
@media(max-width: 600px) {
    display: ${(props) => !props.showSearch ? "none" : "block"};

}
`

const IconStyle = styled(FontAwesomeIcon)`
font-size: 30px;
display: none;
cursor: pointer;
@media(max-width: 600px) {
    display: block;
}
@media (max-width: 450px){ 
    font-size: 20px;
}

`