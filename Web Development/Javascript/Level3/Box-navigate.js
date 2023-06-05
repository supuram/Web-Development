// By Bing

let boxes = document.querySelectorAll('.box');
let selectedBoxIndex = 0;
      
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        selectedBoxIndex = (selectedBoxIndex + 1) % boxes.length;
    } 
    else if (event.key === 'ArrowLeft') {
        selectedBoxIndex = (selectedBoxIndex - 1 + boxes.length) % boxes.length;
    }
          
    boxes.forEach((box, index) => {
        if (index === selectedBoxIndex) {
            box.classList.add('selected');
        } 
        else {
            box.classList.remove('selected');
        }
    });
});

// Remember, forEach((element, index, array). So here box is the element, i.e, each box in the array of boxes