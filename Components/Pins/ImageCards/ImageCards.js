import React from 'react'
import MercCards from '../../UI/Cards/MercCards/MercCards'
function ImageCards(props) {
    return (
        <div >
            <div>
                <MercCards src={props.src} />
            </div>
        </div>
    )
}

export default ImageCards
