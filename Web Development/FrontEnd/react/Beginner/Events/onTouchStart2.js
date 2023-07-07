import React from 'react';

class MoveableImage extends React.Component {
  state = {
    isMoving: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
  };

  handleTouchStart = (event) => {
    const { pageX, pageY } = event.touches[0]; // touches[] is predefined
    console.log(event.touches[0])
    this.setState({
      isMoving: true,
      startX: pageX - this.state.offsetX,
      startY: pageY - this.state.offsetY
      
        // variables inside setState are not predefined
    });
  }

  handleTouchMove = (event) => {
    if (!this.state.isMoving) return;

    const { pageX, pageY } = event.touches[0];
    const offsetX = pageX - this.state.startX;
    const offsetY = pageY - this.state.startY;

    this.setState({
      offsetX,
      offsetY
    });
  }

  handleTouchEnd = () => {
    this.setState({
      isMoving: false
    });
  }

  render() {
    const { offsetX, offsetY } = this.state;

    const imageStyle = {
      position: 'absolute',
      top: offsetY + 'px',
      left: offsetX + 'px',
      width: '200px',
      height: '200px'
    };

    return (
      <img
        src='https://images.pexels.com/photos/633481/pexels-photo-633481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        alt=""
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        style={imageStyle}
      />
    );
  }
}
export default MoveableImage

/*
touches is a property of the event object, which represents an array-like list of all current touches on the touch 
surface. It is part of the Touch Events API and contains information about each touch point.

touches[0] refers to the first touch point in the touches array. It represents the touch event associated with the 
first finger that touches the screen. It provides details about that specific touch, such as the position (pageX 
and pageY) and other properties.

So, event.touches[0] retrieves the first touch point from the touches array in the event object, allowing you to 
access properties like pageX and pageY to determine the coordinates of the touch point.
===================================================================================================================

const offsetX = pageX - this.state.startX;, pageX represents the current touch position, and this.state.startX 
represents the initial touch position when the touch event started.

By subtracting the initial touch position from the current touch position, we calculate the horizontal offset 
(offsetX) of the image based on the touch movement. This allows the image to move horizontally as you drag your 
finger.
*/