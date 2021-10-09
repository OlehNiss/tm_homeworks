'use strict';
let getElem = x => document.querySelector(x);
const myAge = 20;
let queue;
if(localStorage.getItem('queueData')){
    queue = JSON.parse(localStorage.getItem('queueData'));
}else if(!localStorage.getItem('queueData')){
    queue = [];
}

function add(){
    let inputText = getElem('.inputField').value;
    if(inputText != ''){
        if(queue.length == myAge){
            remover();
        }
        queue.push(inputText);
        console.log('queue after add:',queue);
        let queueToJson = JSON.stringify(queue);
        localStorage.setItem('queueData', queueToJson);

        getElem('.queue_box').innerHTML += `<div class="queueMember"><p>${queue.length+1}</p><p>${inputText}</p></div>`;
        getElem('.inputField').value = '';
        reCount();
    }
    else if(inputText == ''){
        validateOn();
    }
}

function remover(){
    // if(localStorage.getItem('queueData')){
    //     queue = JSON.parse(localStorage.getItem('queueData'));
    // }
    if(queue.length > 0){
        queue.shift();
        console.log('queue after shift:',queue);
        let queueToJson = JSON.stringify(queue);
        localStorage.setItem('queueData', queueToJson);

        let elem = getElem('.queue_box');
        elem.removeChild(elem.children[0]);
        reCount();
    }else{
        alert('There is no elements in queque to delete!');
    }
}
function reCount(){
    let element = getElem('.queue_box');
    for(let i=0;i<element.children.length;i++){
        element.children[i].firstChild.innerHTML = i+1;
    }
}
function validateOn(){
    getElem('.inputField').style.cssText = `
            border: 1px solid red;
        `;
    if(!getElem('#inputWarning')){
        let p = document.createElement("p");
        p.setAttribute("id", "inputWarning");
        p.setAttribute("style", "color:red;");
        p.textContent = 'Input field must filled';
        getElem('.editForm').append(p);
    }
}
function validateOff(){
    getElem('.inputField').style.cssText = `
            border: none;
        `;
    if(getElem('#inputWarning')){
        getElem('#inputWarning').remove();
    }
}

function queueVisualizationFromStorage(){
    if(localStorage.getItem('queueData')){
        let queueData = JSON.parse(localStorage.getItem('queueData'));
        let divVisualize = '';
        for(let i=0;i<queueData.length;i++){
            divVisualize = `<div class="queueMember"><p>${i+1}</p><p>${queueData[i]}</p></div>`;
            getElem('.queue_box').innerHTML += divVisualize;
        }
    }
}

queueVisualizationFromStorage();
getElem('.addElement').addEventListener('click', add);
getElem('.removeElement').addEventListener('click', remover);
getElem('.inputField').addEventListener('change', validateOff);