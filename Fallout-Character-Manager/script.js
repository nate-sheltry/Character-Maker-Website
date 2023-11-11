const __healthBlock = document.getElementById('health_block')
const __healthBar = __healthBlock.children[0];
const __healthPoints = __healthBlock.children[1];

const __healthModifiers = document.getElementById('hp_modifiers');

const __healthModSub = __healthModifiers.children[0]
const __healthModAdd = __healthModifiers.children[1]
const __healthModTemp = __healthModifiers.children[2]

const __skillsBtn = document.getElementById('skill-button')

const __skillBox = document.getElementById('skill_box')

__skillsBtn.addEventListener('pointerdown', (e)=>{
    __skillBox.hidden = !__skillBox.hidden;
})

function modifyHealth(e){
    let parent = e.target.parentElement;
    let value = parseInt(e.target.parentElement.children[0].value);
    if(isNaN(value) || value == 0) return;
    if(parent.classList.contains('modify-subtract')) value = value*-1;
    healthUpdate(value);
}

function tempHealth(){
    let modifier = parseInt(__healthModTemp.children[0].value);
    if(isNaN(modifier) || modifier == 0) return;

    let inputMax = __healthPoints.children[2].value;
    if(inputMax[0] === '0' && inputMax > 1) {inputMax = inputMax.split('').splice(1,1); __healthPoints.children[2].value = inputMax}
    let hpMax = parseInt(inputMax);
    __healthPoints.children[2].value = hpMax + modifier;

    healthUpdate(modifier);
}

function healthUpdate(modifier = null){
    let barMax = parseFloat(__healthBar.children[1].style.strokeDasharray.split(',')[1]);
    let inputMax = __healthPoints.children[2].value;
    let inputCurrent = __healthPoints.children[1].value;

    if(inputMax[0] === '0' && inputMax.length > 1) {inputMax = inputMax.split('').splice(1,1); __healthPoints.children[2].value = inputMax}
    if(inputCurrent[0] === '0' && inputCurrent.length > 1) {inputCurrent = inputCurrent.split('').splice(1,1); __healthPoints.children[1].value = inputCurrent}
    let hpMax = parseInt(inputMax)
    let hpCurrent = parseInt(inputCurrent)
    
    if(modifier != null){
        hpCurrent += modifier;
    }
    if(isNaN(hpCurrent) || hpCurrent <= 0) hpCurrent = 0
    if(isNaN(hpMax) || hpMax <= 0) {hpMax = 0; __healthPoints.children[2].value = hpMax}
    __healthPoints.children[1].value = hpCurrent;
    let reduction = (hpMax - hpCurrent)/hpMax;
    if(reduction < 0) reduction = 0;

    __healthBar.children[1].style.strokeDashoffset = (reduction * barMax);
}

//Performance Debug
const testfunction = (func) => {
    const startTime = performance.now();
    //replace function here to test.
    func()
    const result = 'void'
    const endTime = performance.now();
    const runtime = (endTime - startTime);
    console.log("Result: " + result);
    console.log("Runtime: " + runtime + " milliseconds");
}

console.log(__healthPoints.children[1])
__healthPoints.children[1].addEventListener('input', ()=>(healthUpdate()));
__healthPoints.children[2].addEventListener('input', ()=>(healthUpdate()));

__healthModSub.children[1].addEventListener('click', modifyHealth);
__healthModAdd.children[1].addEventListener('click', modifyHealth);
__healthModTemp.children[1].addEventListener('click', tempHealth);