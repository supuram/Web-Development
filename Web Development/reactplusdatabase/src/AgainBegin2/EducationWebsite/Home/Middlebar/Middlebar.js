import React from "react";
import './Middlebar.css'
import ImageSlider from './ImageSlider.js'
import student1 from './../../images/1.png'
import student2 from './../../images/2.png'
import student3 from './../../images/3.png'
import student4 from './../../images/4.png'

export default function Middlebar(){
    const images = [student1, student2, student3, student4]
    return(
        <div style={{marginTop:'2rem'}}>
            <ImageSlider images={images} />
        </div>
    )
}