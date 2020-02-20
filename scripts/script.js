const DATA = {
    whichSite:['landing', 'multiPage', 'onlineStore'],
    price:[4000, 8000, 26000],
    desktopTemplates :[50, 40, 30],
    adapt:20,
    mobileTemplates: 15,
    editable:10,
    metrikaYandex:[500, 2000 , 1000],
    analyticsGoogle:[850, 1350, 3000],
    deadlineDay:[[2,7],[3,10],[7,14]],
    deadlinePercent:[[20],[17],[15]]
};
const startButton = document.querySelector('.start-button');
let firstScreen = document.querySelector('.first-screen');
let mainForm = document.querySelector('.main-form');
let formCalculate = document.querySelector('.form-calculate');
let endButton = document.querySelector('.end-button');
let total = document.querySelector('.total');
let fastRange = document.querySelector('.fast-range');
let totalPriceSum = document.querySelector('.total_price__sum'),
adapt = document.getElementById('adapt'),
mobileTemplates = document.getElementById('mobileTemplates'),
typeSite = document.querySelector('.type-site'),
maxDeadline = document.querySelector('.max-deadline');


function showEl(el){
    el.style.display = 'block';
}
function hideEl(el){
    el.style.display = 'none';
}

function renderTextContent(total, site, maxDay){
    totalPriceSum.textContent = total;
    typeSite.textContent = site;
    maxDeadline.textContent = maxDay;
}

function priceCalculation(el){
    let result = 0;
    let index = 0,
    options = [],
    site = '',
    maxDeadlineDay = DATA.deadlineDay[index][1];

    if(el.name === 'whichSite'){
        for(const item of formCalculate.elements){
            if (item.type === 'checkbox') {
                item.checked = false;

            }
        }
        hideEl(fastRange);
    }

    for (const item of formCalculate.elements) {
        if (item.name === 'whichSite' && item.checked) {
             index = (DATA.whichSite.indexOf(item.value));
             site = item.dataset.site;
             maxDeadlineDay = DATA.deadlineDay[index][1];
        }else if(item.classList.contains('calc-handler') && item.checked){
            options.push(item.value);
        }
    }
    
     options.forEach(function(key){
         if(typeof (DATA[key]) === 'number'){
             if (key === 'sendorder') {
                 result += DATA[key]
             } else {
                 result += DATA.price[index] * DATA[key] / 100;
             }
         } else {
             if (key === 'desktopTemplates'){
                 result += DATA.price[index] * DATA.desktopTemplates[index] /100;
             } else {
                 result += DATA[key][index];
             }
         }
     }
     );

     result += DATA.price[index];
     renderTextContent(result, site, maxDeadlineDay);
     totalPriceSum.textContent = result;
}
function handlerCallbackForm(event){
    let target = event.target;

    if (adapt.checked) {
        mobileTemplates.disabled = false;
    } else {
        mobileTemplates.disabled = true;
        mobileTemplates.checked = true;
    }

    if (target.classList.contains('want-faster')){
        if(target.checked){
            showEl(fastRange);
        }else{
            hideEl('fastRange');
        }
    }
    if(target.classList.contains('calc-handler')){
        priceCalculation(target);
    }
}
startButton.addEventListener('click', function() {
    showEl(mainForm);
    hideEl(firstScreen);
} );
endButton.addEventListener('click', function() {
    // console.log(formCalculate.elements);
    for(const element of formCalculate.elements){
        if(element.tagName === 'FIELDSET'){
            hideEl(element);
        }
    }
    showEl(total);
} );
formCalculate.addEventListener('change', handlerCallbackForm);