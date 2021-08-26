import React from 'react'

import Card from '../../UI/Cards/Card/Card'

import * as styles from './HomeGallery.module.css';


function HomeGallery() {

  // const secondData = useStaticQuery(querySecond)
  return (
    <React.Fragment>


      <div className={`flex-row justify-center ${styles.galleryContainer}`}>

        <Card queryData={"hello"} flex="flex-column" justify="justify-center" cardsMargin={true} />
        <Card queryData={"hello"} flex="flex-column" justify="justify-center" cardsMargin={true} />
        <Card queryData={"hello"} flex="flex-column" justify="justify-center" cardsMargin={true} />
        <Card queryData={"hello"} flex="flex-column" justify="justify-center" cardsMargin={true} />
        <Card queryData={"hello"} flex="flex-column" justify="justify-center" cardsMargin={true} />
        <Card queryData={"hello"} flex="flex-column" justify="justify-center" cardsMargin={true} />
        <Card queryData={"hello"} flex="flex-column" justify="justify-center" cardsMargin={true} />



      </div>
    </React.Fragment>
  )
}

export default HomeGallery
