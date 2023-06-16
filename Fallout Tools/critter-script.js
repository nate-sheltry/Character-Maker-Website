
let dataItems = []

const __critterSearch = document.querySelector("#critter-search")
const __critterTemplate = document.querySelector("[data-attribute=\"critter-template\"]");
const __critterResults = document.querySelector("#critter-results")

const options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    threshold: 0,
}

//get our critter data from our FalloutDatabase API formate is {name: value, url: value}
const apiLink = 'https://nate-sheltry.github.io/FalloutDatabase/index-critter-data.json'
const dataIndex = await fetch(apiLink).then((res) => {return res.json()});

function populateList(){
    dataItems = Object.keys(dataIndex).map(key => {
        const resultCard = __critterTemplate.content.cloneNode(true).children[0]
        const head = resultCard.querySelector(".head")

        head.textContent = `Name: ${dataIndex[key].name}`
        __critterResults.append(resultCard);
        return {name: key, element: resultCard}
    })
}

function populateItems(container){
    let item = dataItems.find(obj => obj.element === container)
        if(item.element === container){
            fetch(dataIndex[item.name].url).then((res) => res.json()).then(value => {
            const resultCard = container
            const specialStats = resultCard.querySelector(".special-stats").querySelectorAll('.special-stat')
            const secondaryStats = resultCard.querySelector(".secondary-stats").querySelectorAll('.secondary-stat')
            const gmInfo = resultCard.querySelector(".gminfo-stats").querySelectorAll('.gminfo-stat')
            const damageThresholds = resultCard.querySelector(".damage-thresholds").querySelectorAll('.damage-threshold')
            const skills = resultCard.querySelector(".skills").querySelectorAll('.skill')
            
            for(let i = 0; i < specialStats.length; i++){
                let child = specialStats[i];
                let valueKeys = Object.keys(value.special)
                child.children[0].textContent = `${valueKeys[i]}:`
                child.children[1].textContent = value.special[valueKeys[i]]
            };
            for(let i = 0; i < damageThresholds.length; i++){
                let child = damageThresholds[i];
                let valueKeys = Object.keys(value.damageThreshold)
                child.children[0].textContent = `${valueKeys[i].replace(valueKeys[i][0], valueKeys[i][0].toUpperCase()).replace("_", ".")}:`
                child.children[1].textContent = value.damageThreshold[valueKeys[i]]
            };
            for(let i = 0; i < secondaryStats.length; i++){
                let child = secondaryStats[i];
                let valueKeys = Object.keys(value.secondaryStats)
                child.children[0].textContent = `${valueKeys[i]}:`
                child.children[1].textContent = value.secondaryStats[valueKeys[i]]
            };
            for(let i = 0; i < skills.length; i++){
                let child = skills[i];
                let valueKeys = Object.keys(value.skillsInfo)
                child.children[0].textContent = `${valueKeys[i].replace("_", ".").replace("-", " ").replace("_", ".")
                .replace(valueKeys[i][0], valueKeys[i][0].toUpperCase())}:`
                child.children[1].textContent = value.skillsInfo[valueKeys[i]]
            };
            for(let i = 0; i < gmInfo.length; i++){
                let child = gmInfo[i];
                let valueKeys = Object.keys(value.gmInfo)
                child.children[0].textContent = `${valueKeys[i].replace("_", ".").replace("-", " ").replace("_", ".")
                .replace(valueKeys[i][0], valueKeys[i][0].toUpperCase())}:`
                child.children[1].textContent = value.gmInfo[valueKeys[i]]
            };
        });
    }
}

__critterSearch.addEventListener('keypress', e => {
    if(e.keyCode != 13)
        return
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

__critterResults.querySelectorAll(".critter-result").forEach(child => {
    const observer = new IntersectionObserver((container, containerObserver) => {
        if(!container[0].isIntersecting){
            return;
        }
        populateItems(container[0].target);
        containerObserver.unobserve(container[0].target)
    }, options)
    observer.observe(child)
})