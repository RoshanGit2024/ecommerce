import React from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Fade, Zoom, Slide } from 'react-slideshow-image'

function ProductSlider() {
    const slideImages = [
        {
            url: "http://localhost:8000/uploads/products/lenovolaptop2.jpg",
            caption: "explore our new product"
        },
        {
            url: "http://localhost:8000/uploads/products/gymband.jpg",
            caption: "explore our new product gym accesories"
        }
    ]
    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    const spanStyle = {
        fontSize: '20px',
        background: '#efefef',
        color: '#000000',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center',
        maxWidth: '90%'
    }
    return (
        <div className='slide-container' style={{ maxWidth: '100%', overflow: 'hidden' }}>
            <Fade>
                {slideImages.map((image, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, backgroundImage: `url(${image.url})` }}>
                            <span style={spanStyle}>{image.caption}</span>
                        </div>
                    </div>
                ))}
            </Fade>
        </div>
    )
}

export default ProductSlider
