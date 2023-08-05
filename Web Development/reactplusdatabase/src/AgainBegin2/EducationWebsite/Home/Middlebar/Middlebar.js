import React from "react";
import './Middlebar.css'
import ImageSlider from './ImageSlider.js'
import student1 from './../../images/Middlebar/1.svg'
import student2 from './../../images/Middlebar/2.svg'
import student3 from './../../images/Middlebar/3.svg'
import student4 from './../../images/Middlebar/4.svg'

export default function Middlebar(){
    const images = [student1, student2, student3, student4]
    return(
        <div style={{marginTop:'2rem'}}>
            <ImageSlider images={images} />
        </div>
    )
}