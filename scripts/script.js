const startButton = document.querySelector('.start-button');
let firstScreen = document.querySelector('.first-screen');
let mainForm = document.querySelector('.main-form');
let formCalculate = document.querySelector('.form-calculate');
let endButton = document.querySelector('.end-button');
let total = document.querySelector('.total');
let fastRange = document.querySelector('.fast-range');
// console.log(startButton);
// console.dir(startButton);

function showEl(el){
    el.style.display = 'block';
}
function hideEl(el){
    el.style.display = 'none';
}
function handlerCallbackForm(event){
console.log(event.target);
let target = event.target;
if (target.classList.contains('want-faster')){
    if(target.checked){
        showEl(fastRange);
    }else{
        hideEl('fastRange');
    }
}
}
startButton.addEventListener('click', function() {
    console.log('Клик по кнопке');
    showEl(mainForm);
    hideEl(firstScreen);
} );
endButton.addEventListener('click', function() {
    console.log(formCalculate.elements);
    for(const element of formCalculate.elements){
        if(element.tagName === 'FIELDSET'){
            hideEl(element);
        }
    }
    showEl(total);
} );
formCalculate.addEventListener('change', handlerCallbackForm);