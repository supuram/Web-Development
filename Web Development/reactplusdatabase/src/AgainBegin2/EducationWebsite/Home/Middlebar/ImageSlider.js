// This code just leaves a small white margin in the images. Below is the corrected code
// import React, { useState, useEffect, useRef } from 'react';

// const ImageSlider = ({ images }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slideRef = useRef(null);

//   const handleNextSlide = () => {
//     setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   const handlePrevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   useEffect(() => {
//     slideRef.current.style.transition = 'all 0.5s ease-in-out';
//     slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
//   }, [currentSlide]);

//   return (
//     <div style={{ position: 'relative', margin:'0px', width: '100%', height: '100%' }}>
//       <div style={{ display: 'flex', overflow: 'hidden' }}>
//         <div style={{ display: 'flex', position:'relative' }} ref={slideRef}>
//           {images.map((image, index) => (
//             <img key={index} src={image} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//           ))}
//         </div>
//       </div>
//       <button
//         onClick={handlePrevSlide}
//         style={{
//           position: 'absolute',
//           top: '30%',
//           left: '10px',
//           transform: 'translateY(-50%)',
//         }}
//       >
//         &#10094;
//       </button>
//       <button
//         onClick={handleNextSlide}
//         style={{
//           position: 'absolute',
//           top: '30%',
//           right: '10px',
//           transform: 'translateY(-50%)',
//         }}
//       >
//         &#10095;
//       </button>
//     </div>
//   );
// };
// export default ImageSlider;

import React, { useState } from 'react';

const ImageSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div style={{ position: 'relative', margin: '0px', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          width: `${images.length * 100}%`,
          transform: `translateX(-${currentSlide * (100 / images.length)}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              flex: `0 0 ${100 / images.length}%`,
              position: 'relative',
              minWidth: '0',
              overflow: 'hidden',
            }}
          >
            <img src={image} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      <button
        onClick={handlePrevSlide}
        style={{
          position: 'absolute',
          top: '50%',
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
          top: '50%',
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
