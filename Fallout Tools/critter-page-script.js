
const __critterTemplate = document.querySelector("[data-attribute=\"critter-template\"]");
const __critterResults = document.querySelector("#critter-results")

const critterData = JSON.parse(sessionStorage.getItem('critterData'))
const critterRequested = new URLSearchParams(window.location.search).get("critter");
console.log(critterData[critterRequested])
let critter = {}
console.log(critterRequested)

function populateList(){
    const resultCard = document.createElement('div')
    resultCard.classList.toggle('critter-result', true)
    resultCard.textContent = 'Loading'


    __critterResults.append(resultCard);
    critter = {name: critterData[critterRequested], element: resultCard}
}

populateList()

async function populateItems(container, url = null){
        //This checks whether our container element's first child contains a class or not.
        //This is used to see if the container has loaded in our database info previously, if it hasn't
        //Then the first child should be the text "loading" which will return classList as undefined.
        //This allows the preload button to preload our database info without creating duplicates
        //within our container element by escaping the function early.
        if(container.childNodes.length > 0 && !(container.childNodes[0].classList == undefined)){
            return;
        }
        else{
            const critterTemplate = __critterTemplate.content.cloneNode(true)
            let value = url;
            if(value == null){
                value = await fetch(critterData[critterRequested].url).then((res) => {return res.json()});
            }
            const resultCard = critterTemplate
            const head = resultCard.querySelector(".head")
            head.textContent = `Name: ${critterData[critterRequested].name}`
            const specialStats = resultCard.querySelector(".special-stats").querySelectorAll('.special-stat')
            const secondaryStats = resultCard.querySelector(".secondary-stats").querySelectorAll('.secondary-stat')
            const gmInfo = resultCard.querySelector(".gminfo-stats").querySelectorAll('.gminfo-stat')
            const damageThresholds = resultCard.querySelector(".damage-thresholds").querySelectorAll('.damage-threshold')
            const skills = resultCard.querySelector(".skills").querySelectorAll('.skill')
            
            specialStats.forEach((child, i = 0) => {
                let valueKeys = Object.keys(value.special)
                child.children[0].textContent = `${valueKeys[i]}:`
                child.children[1].textContent = value.special[valueKeys[i]]
                i++;
            });
            damageThresholds.forEach((child, i = 0) => {
                let valueKeys = Object.keys(value.damageThreshold)
                child.children[0].textContent = `${valueKeys[i].replace(valueKeys[i][0], valueKeys[i][0].toUpperCase()).replace("_", ".")}:`
                child.children[1].textContent = value.damageThreshold[valueKeys[i]]
                i++;
            });
            secondaryStats.forEach((child, i = 0) => {
                let valueKeys = Object.keys(value.secondaryStats)
                child.children[0].textContent = `${valueKeys[i]}:`
                child.children[1].textContent = value.secondaryStats[valueKeys[i]]
                i++;
            });
            skills.forEach((child, i = 0) => {
                let valueKeys = Object.keys(value.skillsInfo)
                child.children[0].textContent = `${valueKeys[i].replace("_", ".").replace("-", " ").replace("_", ".")
                .replace(valueKeys[i][0], valueKeys[i][0].toUpperCase())}:`
                child.children[1].textContent = value.skillsInfo[valueKeys[i]]
                i++;
            });
            gmInfo.forEach((child, i = 0) => {
                let valueKeys = Object.keys(value.gmInfo)
                child.children[0].textContent = `${valueKeys[i].replace("_", ".").replace("-", " ").replace("_", ".")
                .replace(valueKeys[i][0], valueKeys[i][0].toUpperCase())}:`
                child.children[1].textContent = value.gmInfo[valueKeys[i]]
                i++;
            });
            container.append(critterTemplate)
            container.width = 'auto'
            container.height = 'auto'
            //This removes the "loading" text which is essential in checking to see
            //Whether data has been loaded into the container prior.
            container.childNodes[0].textContent = '';
            critter.html = container.innerHTML;
        }
    }

populateItems(critter.element)