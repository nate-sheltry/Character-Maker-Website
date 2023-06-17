
let dataItems = []
let load = false;

const __critterSearch = document.querySelector("#critter-search")
const __critterTemplate = document.querySelector("[data-attribute=\"critter-template\"]");
const __critterResults = document.querySelector("#critter-results")

const options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "100%",
    threshold: 0,
}

//get our critter data from our FalloutDatabase API formate is {name: value, url: value}
const apiLink = 'https://nate-sheltry.github.io/FalloutDatabase/index-critter-data.json'
const dataIndex = await fetch(apiLink).then((res) => {return res.json()});

function populateList(){
    dataItems = Object.keys(dataIndex).map(key => {
        const resultCard = document.createElement('div')
        resultCard.classList.toggle('critter-container', true);
        resultCard.textContent = 'Loading'

        __critterResults.append(resultCard);
        return {name: key, element: resultCard}
    })
}

async function populateItems(container){
    console.log(container)
    let item = dataItems.find(obj => obj.element === container)
    if(item.element === container){
            const critterTemplate = __critterTemplate.content.cloneNode(true).children[0]
            const value = await fetch(dataIndex[item.name].url).then((res) => {return res.json()});
            const resultCard = critterTemplate
            const head = resultCard.querySelector(".head")
            head.textContent = `Name: ${dataIndex[item.name].name}`
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
    }
}

__critterSearch.addEventListener('input', e => {
    const value = e.target.value;
    if(value.length > 1){
        
        for(let i = 0; i < dataItems.length; i++){
            let item = dataItems[i];
            const isVisible = item.name.toLowerCase().includes(value.toLowerCase())
            item.element.classList.toggle("hide", !isVisible);
        }
    }
    if(value.length == 0){

        
        for(let i = 0; i < dataItems.length; i++){
            let item = dataItems[i];
            item.element.classList.toggle("hide", false);
        }
    }
})

populateList();

let critterObserver = [];

__critterResults.querySelectorAll(".critter-container").forEach(child => {
    const observer = new IntersectionObserver((container, containerObserver) => {
        if(!container[0].isIntersecting){
            return;
        }
        console.log('is being observed')
        populateItems(container[0].target);
        container[0].target.textContent = '';
        containerObserver.unobserve(container[0].target)
    }, options)
    observer.observe(child)
    critterObserver.push(observer);
})

document.querySelector("#load-button").addEventListener("click", e => {
    __critterResults.querySelectorAll(".critter-container").forEach(child => {
        populateItems(child)
        critterObserver.forEach(ob => {
            ob.unobserve(child)
        })
        
    })
})