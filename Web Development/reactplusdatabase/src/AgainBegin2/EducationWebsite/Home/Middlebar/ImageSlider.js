import React, { useState, useEffect, useRef } from 'react';

const ImageSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <div style={{ display: 'flex' }} ref={slideRef}>
          {images.map((image, index) => (
            <img key={index} src={image} alt='' style={{ width: '100%' }} />
          ))}
        </div>
      </div>
      <button
        onClick={handlePrevSlide}
        style={{
          position: 'absolute',
          top: '30%',
          left: '10px',
          transform: 'translateY(-50%)',
        }}
      >
        &#10094;
      </button>
      <button
        onClick={handleNextSlide}
        style={{
          position: 'absolute',
          top: '30%',
          right: '10px',
          transform: 'translateY(-50%)',
        }}
      >
        &#10095;
      </button>
    </div>
  );
};
export default ImageSlider;