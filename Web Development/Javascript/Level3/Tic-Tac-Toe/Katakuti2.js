// With help from Bing

let gridSize = prompt("Enter the size of the grid between 1 to 10:");
gridSize = parseInt(gridSize)

let items = document.querySelectorAll('.container-item')

let numberOfRows = gridSize
let numberOfColumns = gridSize
let items2D = new Array(numberOfRows);

if (isNaN(gridSize) || gridSize < 1 || gridSize > 10) {
    alert("Invalid grid size. Please enter a number between 1 to 10")
} 
else {
    let container = document.querySelector('.container')
    container.innerHTML = ''
    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`

    for (let i = 0; i < gridSize ** 2; i++) {
        let item = document.createElement('div')
        item.classList.add('container-item')
        if (i === 0) {
            item.classList.add('select')
        }
        container.appendChild(item)
    }

    items = document.querySelectorAll('.container-item')
    
    // Setting the fontSize equal to 75 % of box 
    /*let containerWidth = container.offsetWidth;
    let containerHeight = container.offsetHeight;
    let areaBox = ((containerWidth * containerHeight)/(numberOfRows * numberOfColumns)) ** 0.5
    let finalPixel = 0.75 * areaBox*/
    
    items.forEach(item1 => {
        item1.style.fontSize = `40px`;
    })

    // Adding items to a 2D array
    for (let i = 0; i < numberOfRows; i++) {
        items2D[i] = new Array(numberOfColumns);
    }

    for (let i = 0; i < items.length; i++) {
        let row = Math.floor(i / numberOfColumns);
        let column = i % numberOfColumns;
        items2D[row][column] = items[i];
    }
}

let selectedRowIndex = 0
let selectedColumnIndex = 0

document.addEventListener("keydown", (event1) => {

    // User navigates through the grid
    if(event1.key === 'ArrowRight'){
        selectedColumnIndex = (selectedColumnIndex + 1) % numberOfColumns
    }
    else if(event1.key === 'ArrowLeft'){
        selectedColumnIndex = (selectedColumnIndex - 1 + numberOfColumns) % numberOfColumns
    }
    else if(event1.key === 'ArrowDown'){
        selectedRowIndex = (selectedRowIndex + 1) % numberOfRows
    }
    else if(event1.key === 'ArrowUp'){
        selectedRowIndex = (selectedRowIndex -1 + numberOfRows) % numberOfRows
    }

    // User gives either x or 0 to fill the box
    else if(event1.key === 'x' || event1.key === '0'){
        let selectedItem = items2D[selectedRowIndex][selectedColumnIndex]
        selectedItem.textContent = event1.key  
        if (event1.key === 'x') {
            selectedItem.classList.add('select')
        } 
        else if (event1.key === '0') {
            selectedItem.classList.add('select1')
        }
        checkWin()
    }

    let selectedIndex = selectedRowIndex * numberOfColumns + selectedColumnIndex;
    
    // For adding the color to the selected box
    items.forEach((item, index) => {
        if(index === selectedIndex){
            item.classList.add('select2')
            if(item.textContent === '0'){
                item.classList.remove('select')
                item.classList.add('select1')
            }
            if(item.textContent === 'x'){
                item.classList.remove('select1')
                item.classList.add('select')
            }
        }
        else{
            item.classList.remove('select2')
        }
    })
});

// For navigating through the grid using clicks and adding color to the selected box
items.forEach((item, index) => {
    item.addEventListener('click', () => {
        items.forEach((item, index) => {
            item.classList.remove('select2')
        });
        item.classList.add('select2')
        if(item.textContent === '0'){
            item.classList.remove('select')
            item.classList.add('select1')
        }
        if(item.textContent === 'x'){
            item.classList.remove('select1')
            item.classList.add('select')
        }
        selectedColumnIndex = index % numberOfColumns
        selectedRowIndex = Math.floor(index / numberOfColumns)
        checkWin()
    });
});

function checkWin() {
    let totalCount = 0
    for(let i = 0; i < numberOfRows; i++){
        let countColumn_x = 0
        let countRow_x = 0
        let countColumn_zero = 0
        let countRow_zero = 0
        for(let j = 0; j < numberOfColumns; j++){
            if(items2D[i][j].textContent == 'x'){
                countColumn_x++
            }
            if(items2D[j][i].textContent == 'x'){
                countRow_x++
            }

            if(items2D[i][j].textContent == '0'){
                countColumn_zero++
            }
            if(items2D[j][i].textContent == '0'){
                countRow_zero++
            }
            if(items2D[i][j].textContent == 'x' || items2D[i][j].textContent == '0'){
                totalCount++
            }
        }
        if(countRow_x == items.length ** 0.5 || countColumn_x == items.length ** 0.5){
            setTimeout(() => {
                alert('Player with x wins');
                location.reload();
            }, 100);
        }
        if(countRow_zero == items.length ** 0.5 || countColumn_zero == items.length ** 0.5){
            setTimeout(() => {
                alert('Player with 0 wins');
                location.reload();
            }, 100);
        }
    }
    if(totalCount == items.length){
        setTimeout(() => {
            alert('Its a draw');
            location.reload();
        }, 100);
    }
    let countDiagonal1_x = 0
    let countDiagonal2_x = 0
    let countDiagonal1_zero = 0
    let countDiagonal2_zero = 0

    for(let i = 0; i < numberOfRows; i++){
        if(items2D[i][i].textContent == 'x'){
            countDiagonal1_x++
        }
        if(items2D[i][numberOfColumns - i - 1].textContent == 'x'){
            countDiagonal2_x++
        }
        if(items2D[i][i].textContent == '0'){
            countDiagonal1_zero++
        }
        if(items2D[i][numberOfColumns - i - 1].textContent == '0'){
            countDiagonal2_zero++
        }
    }

    if(countDiagonal1_x == items.length ** 0.5 || countDiagonal2_x == items.length ** 0.5){
        setTimeout(() => {
            alert('Player with x wins');
            location.reload();
        }, 100);
    }
    if(countDiagonal1_zero == items.length ** 0.5 || countDiagonal2_zero == items.length ** 0.5){
        setTimeout(() => {
            alert('Player with 0 wins');
            location.reload();
        }, 100);
    }
}