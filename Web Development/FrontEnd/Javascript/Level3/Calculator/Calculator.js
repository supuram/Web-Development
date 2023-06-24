let press = document.querySelectorAll('button')
let resultScreen = document.querySelector('.result')
let operatorButton = document.querySelectorAll('.operator')
let numberButton = document.querySelectorAll('numbers')
resultScreen.style.paddingLeft = "9px"
let calculation = []
let str = ""

press.forEach((key) => {
    key.addEventListener('click', () => {
        let value = key.textContent
        if(value === 'C'){
            calculation = []
            location.reload()
        }
        else if(value === '='){
            resultScreen.textContent = eval(str)
        }
        else{
            calculation.push(value)
            str = calculation.join('')
            resultScreen.textContent = str
        }
    })
})