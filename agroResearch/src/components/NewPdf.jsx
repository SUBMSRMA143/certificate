import React from 'react'
import img11 from "../assets/11.png"
import img1 from "../assets/1.jpg"
import img2 from "../assets/2.jpg"
import img3 from "../assets/3.jpg"
import img4 from "../assets/4.jpg"
import img5 from "../assets/5.jpg"

const NewPdf = () => {
    return (
        <div className='pdf-container container'>
            <img className='pdf-head' src={img11} alt="" />
            <img className='pdf' src={img1} alt="" />
            <img className='pdf' src={img2} alt="" />
            <img className='pdf' src={img3} alt="" />
            <img className='pdf' src={img4} alt="" />
            <img className='pdf' src={img5} alt="" />
        </div>
    )
}

export default NewPdf
