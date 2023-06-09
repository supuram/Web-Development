// With help from Bing

let items = document.querySelectorAll('.container-item')
let selectedRowIndex = 0
let selectedColumnIndex = 0
let numberOfRows = items.length ** 0.5
let numberOfColumns = items.length ** 0.5

let items2D = new Array(numberOfRows);
for (let i = 0; i < numberOfRows; i++) {
    items2D[i] = new Array(numberOfColumns);
}

for (let i = 0; i < items.length; i++) {
    let row = Math.floor(i / numberOfColumns);
    let column = i % numberOfColumns;
    items2D[row][column] = items[i];
}

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
        checkWin()
    }

    let selectedIndex = selectedRowIndex * numberOfColumns + selectedColumnIndex;
    
    // For adding the color to the selected box
    items.forEach((item, index) => {
        if(index === selectedIndex){
            item.classList.add('select')
        }
        else{
            item.classList.remove('select')
        }
    })
});

// For navigating through the grid using clicks and adding color to the selected box
items.forEach((item, index) => {
    item.addEventListener('click', () => {
        items.forEach((item, index) => {
            item.classList.remove('select');
        });
        item.classList.add('select');
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