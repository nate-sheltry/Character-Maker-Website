
let dataItems = []
let load = false;

const __critterSearch = document.querySelector("#critter-search")
const __critterTemplate = document.querySelector("[data-attribute=\"critter-template\"]");
const __critterResults = document.querySelector("#critter-results")

console.log()

const options = {
    root: __critterResults,
    rootMargin: "200%",
    //threshold: 0.1,
}

//get our critter data from our FalloutDatabase API formate is {name: value, url: value}
const apiLink = 'https://nate-sheltry.github.io/FalloutDatabase/index-critter-data.json'
const dataIndex = await fetch(apiLink).then((res) => {return res.json()});
const batchData = []
const otherData = []
let emptyHTML;

async function processRequests(urls){
    for(let i = 0; i < urls.length; i++){
        let url = urls[i];
        await fetch(url).then(response => response.json())
        .then(data => otherData.push(data)).catch(error => console.error(error));
    }
}

async function fetchData(urls){
    await Promise.all(urls.map(url => {
        return fetch(url).then(response => response.json())
        .then(data => batchData.push(data)).catch(error => console.error(error));
    })).then(() => {console.log(batchData)})
}

function populateList(){
    dataItems = Object.keys(dataIndex).map(key => {
        const resultCard = document.createElement('div')
        resultCard.classList.toggle('critter-result', true)
        resultCard.textContent = 'Loading'
        emptyHTML = resultCard.innerHTML;


        __critterResults.append(resultCard);
        return {name: key, element: resultCard}
    })
}

async function populateItems(container, url = null){
    let item = dataItems.find(obj => obj.element === container)
    if(item.element === container){
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
                value = await fetch(dataIndex[item.name].url).then((res) => {return res.json()});
            }
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
            //This removes the "loading" text which is essential in checking to see
            //Whether data has been loaded into the container prior.
            container.childNodes[0].textContent = '';
            item.html = container.innerHTML;
        }
    }
}

__critterSearch.addEventListener('input', e => {
    const value = e.target.value;
    let itemsToUpdate = [];
    if(value.length > 0){
        for(let i = 0; i < dataItems.length; i++){
            let item = dataItems[i];
            let name = dataIndex[item.name].name;
            const isVisible = name.toLowerCase().includes(value.toLowerCase())
            item.element.classList.toggle('hide', !isVisible);
        }
    }
    if(value.length == 0){
        for(let i = 0; i < dataItems.length; i++){
            let item = dataItems[i];
            if(item.element.classList.toggle('hide', false)){
                continue;
            }
            item.element.classList.toggle('hide', false);
        }
    }
})

populateList();

let critterObserver;

//This observer is responsible for loading html in and out of the search cards inorder to make CSS layout
//adjustments faster and less time consuming. This also has the added benefit of making the entire page more responsibe.
//Since this observer is only changing text, it's options preload quite a bit ahead of where the user is currently viewing to try
//and account for faster viewing speeds.
const backgroundObserver = new IntersectionObserver((entries) => {
    entries.forEach(container => {
        let item = dataItems.find(obj => obj.element === container.target)
        if(!item.element === container.target){
            //If the container, or section element in this case, is not the same as the one stored in the dictionary
            //we want to exit out as something has gone wrong! This should never run, but is implemented as a safety measure.
            return
        }
        if(item.html == undefined){
            //If there is no data stored yet in the dictionary for this item, return!
            return
        }
        if(!container.isIntersecting){
            //When the data is no longer needed to be displayed, load the HTML out.
            //This is done to make CSS layout adjustments faster. Small adjustments are about 10 times faster
            //Large layout adjustments are about 40-50 times faster.
            container.target.innerHTML = emptyHTML;
            return
        }
        //This loads the needed display data into the object.
        container.target.innerHTML = item.html;
    });
},  {
    //Our options for the observer's sensitivity and what it is watching.
    root: __critterResults,
    rootMargin: "900%",
    //threshold: 0.1,
})

__critterResults.querySelectorAll(".critter-result").forEach(child => {
    const observer = new IntersectionObserver((container, containerObserver) => {
        if(!container[0].isIntersecting){
            //If the element isn't viewable don't do anything.
            return;
        }
        //When it is observable, by the observer we fill it with the necessayr data for display.
        populateItems(container[0].target);

        //Once data has been loaded in, there is no reason to observe whether
        //our element container is intersecting anymore or not.
        containerObserver.unobserve(container[0].target)
        //We now want to switch to our observer declared above, which will help with CSS speeds
        backgroundObserver.observe(child)
    }, options)
    observer.observe(child)
    critterObserver = observer;
})

document.querySelector("#load-button").addEventListener("click", async function buttonHandler(e) {
    const urls = Object.keys(dataIndex).map(data => {return dataIndex[data].url});
    e.target.removeEventListener('click', buttonHandler)
    await processRequests(urls);
    //await fetchData(urls)
    //console.log(batchData)
    let childs = __critterResults.querySelectorAll(".critter-container")
    for(let i = 0; i < childs.length; i++){
        populateItems(childs[i], otherData[i])
        //This is ensuring we cannot populate our container twice with the
        //built in check in our populateItems function.
        critterObserver.unobserve(childs[i])
        backgroundObserver.observe(childs[i])
    }
    e.target.parentNode.removeChild(e.target)
})