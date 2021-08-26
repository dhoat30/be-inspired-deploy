import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/pro-duotone-svg-icons'
import styled from 'styled-components'
function Loading(props) {
    return (
        <IconStyle icon={faSpinner} spin className={props.className} size="5x" />
    )
}

export default Loading
const IconStyle = styled(FontAwesomeIcon)`
color: var(--darkGrey);
position: absolute;
`