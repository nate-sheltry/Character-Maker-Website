//space saving functions
function selectItem(string){
    return document.querySelector(string);
}
function selectChild(parent, string){
    if(typeof parent === 'string')
        return document.querySelector(parent).querySelector(string);
    return parent.querySelector(string);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const skills = {barter:'Barter', bigGuns:'Big Guns', energyWeapons:'Energy Weapons', gambling:'Gambling',
                lockpick:'Lockpick', medicine:'Medicine', meleeWeapons:'Melee Weapons', repair:'Repair', science:'Science',
                smallGuns:'Small Guns', sneak:'Sneak', speech:'Speech', survival:'Survival', throwing:'Throwing',
                traps:'Traps', unarmed:'Unarmed'};

const strengthSkills = [skills.meleeWeapons, skills.unarmed]; //-|+2
const perceptionSkills = [skills.lockpick, skills.medicine, skills.traps] //-|+1
const enduranceSkills = [skills.survival] //-|+2
const charismaSkills = [skills.gambling, skills.barter, skills.speech]// -|+2 ~ -|+4 ~ -|+5
const intelligenceSkills = [skills.medicine, skills.survival, skills.repair, skills.science] // -|+1 ~ -|+2 ~ -|+3 ~ -|+4
const agilitySkills = [skills.bigGuns, skills.energyWeapons, skills.meleeWeapons, skills.unarmed, //-|+2 Skills
                       skills.sneak, //skills -|+ 3
                       skills.smallGuns, skills.throwing, //skills -|+4
                       skills.lockpick, skills.traps] //skills -|+1
const luckSkills = [skills.gambling] //-|+ 2

const secStats = {HP:'Health Points', AC:'Armor Class', AP:'Action Points', CW:'Carry Weight', 
                            MD:'Melee Damage', SQ:'Sequence', HR:'Healing Rate', CC:'Critical Chance',
                            radResistance:'Radiation Resistance', poisResistance:'Poison Resistance', elecResistance: 'Electric Resistance'}

const strengthStats = [secStats.HP, secStats.CW]//-+ 1, -|+ 25 or -|+ 15
const perceptionStats = [secStats.SQ] //-|+2
const enduranceStats = [secStats.HP] //-|+2
const agilityStats = [secStats.AC, secStats.AP]
const luckStats = [secStats.CC]

const __specialBox = selectItem("#special_modifier_box");

const specialStandard = "#normal_special";
const specialBuffOrDebuff = "#special_debuff";
const specialBuffedStats = '#debuffed_stats'
const specialBuffedSkills = '#debuffed_skills'

const specialAttribute = {value: null};
const specialValue = {value: null};
const skillValue = {vaue:null}
const specialBuffValue = {value: null}

function identifyAttribute(e){
    let parent = e.target.parentNode.parentNode;
    let stats = selectChild(__specialBox, specialBuffedStats);
    let skills = selectChild(__specialBox, specialBuffedSkills);
    if(!parent === __specialBox)
        return;
    try{
    specialAttribute.value = e.target.value[0].toUpperCase();
    }catch (Exception){specialAttribute.value = null}
    calcValues(specialAttribute.value, specialBuffValue.value, skills, stats);
}
function createChildren(parent, skill, attributeValue, modifier){
    let container = document.createElement("div")
    container.classList.toggle('buff-box');
    let label = document.createElement("label");
    label.textContent = skill;
    let value = document.createElement("label");
    value.textContent = Math.floor((attributeValue * modifier));
    container.appendChild(label);container.appendChild(value);
    parent.appendChild(container);
}
function apChild(parent, skill, attributeValue){
    let container = document.createElement("div")
    container.classList.toggle('buff-box');
    let label = document.createElement("label");
    label.textContent = skill;
    let num = document.createElement("label");
    num.textContent = [Math.floor(5 + ((specialValue.value - (attributeValue*-1)) / 2))];
    container.appendChild(label);container.appendChild(num);
    parent.appendChild(container);
}
function calcValues(attribute, attributeValue, skillsObj, statsObj){
    if(attribute == null || attributeValue == null){
        console.log('couldn\'t compute');return;
    }
    while(skillsObj.children[1]) {
        skillsObj.removeChild(skillsObj.children[1]);
    }
    while(statsObj.children[1]) {
        statsObj.removeChild(statsObj.children[1]);
    }
    switch(attribute){
        case 'S':
            //skills
            strengthSkills.forEach(skill => {
                createChildren(skillsObj, skill, attributeValue, 2)
            });
            //stats
            createChildren(statsObj, strengthStats[0], attributeValue, 1)
            createChildren(statsObj, strengthStats[1], attributeValue, 25)
            createChildren(statsObj, `${strengthStats[1]} (Small Frame)`, attributeValue, 15)
            break;
        case 'P':
            //skills
            perceptionSkills.forEach(skill => {
                createChildren(skillsObj, skill, attributeValue, 1)
            });
            createChildren(statsObj, perceptionStats[0], attributeValue, 2)
            //stats
            break;
        case 'E':
            //skills
            enduranceSkills.forEach(skill => {
                createChildren(skillsObj, skill, attributeValue, 2)
            });
            //stats
            createChildren(statsObj, enduranceStats[0], attributeValue, 2)
            break;
        case 'C':
            //skills
            createChildren(skillsObj, charismaSkills[0], attributeValue, 2)
            createChildren(skillsObj, charismaSkills[1], attributeValue, 4)
            createChildren(skillsObj, charismaSkills[2], attributeValue, 5)
            //stats
            break;
        case 'I':
            //skills
            createChildren(skillsObj, intelligenceSkills[0], attributeValue, 1)
            createChildren(skillsObj, intelligenceSkills[1], attributeValue, 2)
            createChildren(skillsObj, intelligenceSkills[2], attributeValue, 3)
            createChildren(skillsObj, intelligenceSkills[3], attributeValue, 4)
            //stats
            break;
        case 'A':
            //skills
            for(i = 0; i < 4; i++){
                createChildren(skillsObj, agilitySkills[i], attributeValue, 2)
            }
            createChildren(skillsObj, agilitySkills[4], attributeValue, 3)
            createChildren(skillsObj, agilitySkills[5], attributeValue, 4)
            createChildren(skillsObj, agilitySkills[6], attributeValue, 4)
            createChildren(skillsObj, agilitySkills[7], attributeValue, 1)
            createChildren(skillsObj, agilitySkills[8], attributeValue, 1)
            //stats
            createChildren(statsObj, agilityStats[0], attributeValue, 1)
            createChildren(statsObj, `${agilityStats[0]} (Kamikaze)`, attributeValue, 0)
            apChild(statsObj, agilityStats[1], attributeValue)
            break;
        case 'L':
            //skills
            createChildren(skillsObj, luckSkills[0], attributeValue, 2)
            //stats
            createChildren(statsObj, luckStats[0], attributeValue, 1)
            break;
    }
}
function retrieveValue(parent, parentCheck, target, maxValue, variable, minValue = null){
    if(!parent === parentCheck)
        return
    if(target.value > maxValue)
        target.value = maxValue
    if(minValue != null){
        if(target.value < minValue)
            target.value = minValue
    }
    variable.value = target.value;

}
async function modifyValue(target, value){
    let parent = target.parentNode.parentNode;
    let input = target.parentNode.firstChild;
    input.value = parseInt(input.value) + value;
    let stats = selectChild(__specialBox, specialBuffedStats);
    let skills = selectChild(__specialBox, specialBuffedSkills);
    //retrieve Skill
    if(parent == selectChild(__specialBox, specialStandard)){
        retrieveValue(parent, __specialBox, target.parentElement.firstChild, 500, skillValue, -100);
    }
    //retrieve Debuff
    if(parent == selectChild(__specialBox, specialBuffOrDebuff)){
        retrieveValue(parent.parentNode, __specialBox, target.parentElement.firstChild, 20, specialBuffValue, -20);
    }
    calcValues(specialAttribute.value, specialBuffValue.value, skills, stats);
}

function retrieveAttributeValue(e){
    let parent = e.target.parentNode.parentNode;
    let stats = selectChild(__specialBox, specialBuffedStats);
    let skills = selectChild(__specialBox, specialBuffedSkills);
    retrieveValue(parent, __specialBox, e.target, 20, specialValue, 0);
    calcValues(specialAttribute.value, specialBuffValue.value, skills, stats);
}
function retrieveSkillValue(e){
    let parent = e.target.parentNode.parentNode;
    let stats = selectChild(__specialBox, specialBuffedStats);
    let skills = selectChild(__specialBox, specialBuffedSkills);
    retrieveValue(parent, __specialBox, e.target, 500, skillValue, -100);
    calcValues(specialAttribute.value, specialBuffValue.value, skills, stats);
    
}
function retrieveDebuffValue(e){
    let parent = e.target.parentNode.parentNode;
    let stats = selectChild(__specialBox, specialBuffedStats);
    let skills = selectChild(__specialBox, specialBuffedSkills);
    retrieveValue(parent, __specialBox, e.target, 20, specialBuffValue, -20);
    calcValues(specialAttribute.value, specialBuffValue.value, skills, stats);
}

const inputFields = document.querySelectorAll(".attribute");
const valueFields = document.querySelectorAll(".value");
const skillFields = document.querySelectorAll(".skill");
const debuffFields = document.querySelectorAll(".debuff");
const increaseButtons = document.querySelectorAll(".increase");
const decreaseButtons = document.querySelectorAll(".decrease");

inputFields.forEach( field => {
    field.addEventListener('change', identifyAttribute);
});
valueFields.forEach( field => {
    field.addEventListener('change', retrieveAttributeValue);
});
skillFields.forEach( field => {
    field.addEventListener('change', retrieveSkillValue);
});
debuffFields.forEach( field => {
    field.addEventListener('change', retrieveDebuffValue);
});
increaseButtons.forEach( button => {
    button.addEventListener('pointerdown', async(e) => {
        let target;
        target = e.target;
        if(e.target.tagName == "IMG")
            target = e.target.parentElement;
        target.firstChild.src = './images/add_button_down.png';
        await sleep(50);
        modifyValue(target, 1);
        await sleep(50);
        target.firstChild.src = './images/add_button_up.png';
    });
});
decreaseButtons.forEach( button => {
    button.addEventListener('pointerdown', async(e) => {
        let target;
        target = e.target;
        if(e.target.tagName == "IMG")
            target = e.target.parentElement;
        target.firstChild.src = './images/sub_button_down.png';
        await sleep(50);
        modifyValue(target, -1);
        await sleep(50);
        target.firstChild.src = './images/sub_button_up.png';
    });
});

