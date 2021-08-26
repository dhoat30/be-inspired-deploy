import React from 'react'
import * as styles from './Card.module.css';


function Card(props) {
    return (
        <React.Fragment>
            <img src={props.src}></img>
        </React.Fragment>

    )
}

export default Card
