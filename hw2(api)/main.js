import {
    ValidationError
} from '/errors.js'
import {
    PermissionError
} from '/errors.js'
import {
    DatabaseError
} from '/errors.js'

// import {url, inp} from '/variables.js'
// import {Creature} from '/variables.js'
// import {addToTeam} from '/variables.js'
// import {removeMember} from '/variables.js'

// const delay = ms => {
//     return new Promise(r => setTimeout(() => r(), ms))
// }

// const url = 'https://dog.ceo/api/breeds/image/random';
// const url = 'https://api.thecatapi.com/v1/images/search';
// const url = 'https://goweather.herokuapp.com/weather/Lviv';
// const url = 'https://geek-jokes.sameerkumar.website/api?format=json';
// const url = 'https://forza-api.tk/';
// const url = 'https://api.lyrics.ovh/v1/eminem/not afraid';

const url = 'https://akabab.github.io/superhero-api/api/all.json';

let inp = document.querySelector('.search');


function addMember(id) {
    let teamDiv = document.querySelector('.team');
    let teamMembers = document.querySelector('.team').children;
    if (teamMembers.length > 0) {
        if (teamDiv.innerHTML.includes(`member${id}`) == false) {
            let parDiv = document.getElementById(`${id}`).parentNode.innerHTML;
            document.querySelector('.team').innerHTML += `<div class="card" id="member${id}">${parDiv}</div>`;
            let memberDiv = document.getElementById(`member${id}`);
            memberDiv.children[7].setAttribute('onclick', `removeMember(${id})`);
            memberDiv.children[7].setAttribute('id', `remove${id}`);
            memberDiv.children[7].textContent = `Remove`;
        } else {
            console.log('Such element is already exist!');
        }
    } else if (teamMembers.length == 0) {
        let parDiv = document.getElementById(`${id}`).parentNode.innerHTML;
        document.querySelector('.team').innerHTML += `<div class="card" id="member${id}">${parDiv}</div>`;
        let memberDiv = document.getElementById(`member${id}`);
        memberDiv.children[7].setAttribute('onclick', `removeMember(${id})`);
        memberDiv.children[7].setAttribute('id', `remove${id}`);
        memberDiv.children[7].textContent = `Remove`;
    }
}
function removeMember(id) {
    if (document.getElementById(`member${id}`)) {
        let divToRemove = document.getElementById(`member${id}`);
        divToRemove.remove();
    }
}
window.addMember = addMember;
window.removeMember = removeMember;

class Creature {
    race;
    gender;

    constructor(url) {
        this.url = url;
    }
}
class SuperHero extends Creature {
    img_url;
    nick;
    fullName;
    placeOfBirth;
    work;
    inputVal;

    constructor(url) {
        super(url)
    }

    async fetchToDo() {
        this.searchCleaner();
        this.inputval = this.inputToUpper(inp);

        const response = await fetch(url);
        const data = await response.json();
        try{
            for (let i = 0; i < data.length; i++) {
                if (data[i].name.includes(this.inputval)) {
                    this.img_url = data[i].images.sm;
                    this.nick = data[i].name;
                    this.fullName = data[i].biography.fullName;
                    this.race = data[i].appearance.race;
                    if (this.race == null) {
                        this.race = 'Unknown';
                    }
                    if (this.fullName == '') {
                        this.fullName = '-';
                    }
                    this.gender = data[i].appearance.gender;
                    this.placeOfBirth = data[i].biography.placeOfBirth.slice(0, 43);
                    this.work = data[i].work.occupation.slice(0, 78);
                    this.searchCards(this.img_url, this.nick, this.fullName, this.race, this.gender, this.placeOfBirth, this.work, i);
                }
            }
        }catch(error){
            console.error(error);
        }
        // fetch(url)
        //     .then(response => response.json())
        //     .then(data => {
        //         for (let i = 0; i < data.length; i++) {
        //             if (data[i].name.includes(this.inputval)) {
        //                 this.img_url = data[i].images.sm;
        //                 this.nick = data[i].name;
        //                 this.fullName = data[i].biography.fullName;
        //                 this.race = data[i].appearance.race;
        //                 if (this.race == null) {
        //                     this.race = 'Unknown';
        //                 }
        //                 if (this.fullName == '') {
        //                     this.fullName = '-';
        //                 }
        //                 this.gender = data[i].appearance.gender;
        //                 this.placeOfBirth = data[i].biography.placeOfBirth.slice(0, 43);
        //                 this.work = data[i].work.occupation.slice(0, 78);
        //                 this.searchCards(this.img_url, this.nick, this.fullName, this.race, this.gender, this.placeOfBirth, this.work, i);
        //             }
        //         }
        //     })
        //     .catch(new ValidationError('A validation error'))
        //     .catch(new PermissionError('A permission error'))
        //     .catch(new DatabaseError('A database error'))
        //     .catch(error => console.log(error));
    }

    searchCards(img_url, nick, fullName, race, gender, placeOfBirth, work, id) {
        let str = '';
        str += `<div class="card">`;
        str += `<img class="img" src="${img_url}">`;
        str += `<p class="nick"><b>Alias:</b> ${nick}</p>`;
        str += `<p class="fullName"><b>Full Name:</b> ${fullName}</p>`;
        str += `<p class="race"><b>Race: </b> ${race}</p>`;
        str += `<p class="gender"><b>Gender:</b> ${gender}</p>`;
        str += `<p class="placeOfBirth"><b>Was born in:</b> ${placeOfBirth}</p>`;
        str += `<p class="work"><b>Work:</b> ${work}</p>`;
        str += `<button class="btn addButtons" id="${id}" onclick="addMember(${id})">Add hero</button>`;
        str += `</div>`;
        document.querySelector('.searchResult').innerHTML += str;
        // document.getElementById(`${id}`).setAttribute('onclick', `addMember(${id})`);
    }
    inputToUpper(str) {
        return str.value.charAt(0).toUpperCase() + str.value.slice(1);
    }

    searchCleaner() {
        document.querySelector('.searchResult').innerHTML = '';
    } 
}


const hero = new SuperHero(url);

document.querySelector('.btn').addEventListener('click', () => {
    hero.fetchToDo();
})

// function fetchToDo() {
//     console.log('FetchToDo started...');
//     inpVal = inp.value.charAt(0).toUpperCase() + inp.value.slice(1);
//     return fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             // console.log('Data: ', data);
//             // console.log(data[0].name);
//             for (let i = 0; i < data.length; i++) {
//                 if (data[i].name.includes(inpVal)) {
//                     console.log(data[i]);
//                     str = '';
//                     str += `<div class="card">`;
//                     str += `<img class="img" src="${data[i].images.sm}">`;
//                     str += `<p class="nick"><b>Alias:</b> ${data[i].name}</p>`;
//                     str += `<p class="fullName"><b>Full Name:</b> ${data[i].biography.fullName}</p>`;
//                     if(data[i].appearance.race == null){
//                         data[i].appearance.race = 'Unknown';
//                     }
//                     str += `<p class="race"><b>Race: </b> ${data[i].appearance.race}</p>`;
//                     str += `<p class="gender"><b>Gender:</b> ${data[i].appearance.gender}</p>`;
//                     str += `<p class="placeOfBirth"><b>Was born in:</b> ${data[i].biography.placeOfBirth.slice(0,44)}</p>`;
//                     str += `<p class="work"><b>Work:</b> ${data[i].work.occupation.slice(0,78)}</p>`;
//                     str += `<button onclick="addToTeam(${i})" class="btn">Add hero</button>`;
//                     str += `</div>`;
//                     document.querySelector('.team').innerHTML += str;
//                 }
//             }
//             // str = '';
//             // str += `<div class="card">`;
//             // str += `<img class="img" src="${data.images.sm}">`;
//             // str += `<p class="nick"><b>Alias:</b> ${data.name}</p>`;
//             // str += `<p class="fullName"><b>Full Name:</b> ${data.biography.fullName}</p>`;
//             // str += `<p class="race"><b>Race: </b> ${data.appearance.race}</p>`;
//             // str += `<p class="gender"><b>Gender:</b> ${data.appearance.gender}</p>`;
//             // str += `<p class="placeOfBirth"><b>Was born in:</b> ${data.biography.placeOfBirth}</p>`;
//             // str += `<p class="work"><b>Work:</b> ${data.work.occupation}</p>`;
//             // str += `</div>`;
//             // document.querySelector('.team').innerHTML += str;

//             // a = document.createElement('p');
//             // a.textContent = data.lyrics;
//             // document.querySelector('.dog').appendChild(a);
//             // console.log('Data: ', data.message.slice(30,50));

//             // document.querySelector('.name').innerHTML = data.lyrics.replace(/\n/gi, '<br>');
//         })
//         .catch(er => console.log('Error:', er))
// }
// document.querySelector('.btn').addEventListener('click', () => {
//     document.querySelector('.team').innerHTML = '';
//     fetchToDo();
// });
