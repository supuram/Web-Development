// By Bing

let items = document.querySelectorAll('.container-item')
let selectedRowIndex = 0;
let selectedColumnIndex = 0;
let numberOfRows = 3;
let numberOfColumns = 3;

document.addEventListener("keydown", (event1) => {
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
    else if(event1.key === 'x' || event1.key === '0'){
        let selectedIndex = selectedRowIndex * numberOfColumns + selectedColumnIndex;
        let selectedItem = items[selectedIndex];
        
        selectedItem.textContent = event1.key;
    }

    let selectedIndex = selectedRowIndex * numberOfColumns + selectedColumnIndex;
    
    items.forEach((item, index) => {
        if(index === selectedIndex){
            item.classList.add('select')
        }
        else{
            item.classList.remove('select')
        }
    })
});

items.forEach((item, index) => {
    item.addEventListener('click', () => {
        items.forEach((item, index) => {
            item.classList.remove('select');
        });
        item.classList.add('select');
        selectedColumnIndex = index % numberOfColumns
        selectedRowIndex = Math.floor(index / numberOfColumns)
        
    });
});