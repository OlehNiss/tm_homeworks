let getElem = x => document.querySelector(x);
const myAge = 20;
function add(){
    let innerFilling = getElem('.inputField').value;
    let elemsLength = getElem('.queue_box').children.length;
    if(innerFilling != ''){
        if(elemsLength == myAge){
            remover();
        }
        getElem('.queue_box').innerHTML += `<div class="queueMember"><p>${elemsLength+1}</p><p>${innerFilling}</p></div>`;
        getElem('.inputField').value = '';
        reCount();
        localStoragePush();
    }
    else if(innerFilling == ''){
        validateOn();
    }
}

function remover(){
    let elem = getElem('.queue_box');
    for(let i=0;i<elem.children.length;i++){
        elem.removeChild(elem.children[i]);
        reCount();
        localStoragePush();
        break;
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
    //or make a class and add it instead of this style property;

    let p = document.createElement("p");
    p.setAttribute("id", "inputWarning");
    p.setAttribute("style", "color:red;");
    p.textContent = 'Input field must filled';
    getElem('.editForm').append(p);

    // getElem('.editForm').innerHTML += `<p style="color:red;" id="inputWarning">Input field must filled</p>`;

}

function validateOff(){
    getElem('.inputField').style.cssText = `
            border: none;
        `;
    // getElem('#inputWarning').style.display = 'none';
    getElem('#inputWarning').remove();
}

function localStoragePush (){
    localStorage.setItem('myQueue',getElem('.queue_box').innerHTML);
}

if(localStorage.getItem('myQueue')){
    getElem('.queue_box').innerHTML = localStorage.getItem('myQueue');
}
getElem('.addElement').addEventListener('click', add);
getElem('.removeElement').addEventListener('click', remover);
getElem('.inputField').addEventListener('change', validateOff);