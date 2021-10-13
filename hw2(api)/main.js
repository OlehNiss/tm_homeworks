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

// nick;
// race;
// gender;
// fullName;
// placeOfBirth;
// work;
// img;
let teamMass = []

inp = document.querySelector('.search');

// function addToTeam(){

// }


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

// fetchToDo()
//     .then(data => {
//         // console.log('Data: ', data);
//         // console.log(data[0].name);
//         for (let i = 0; i < data.length; i++) {
//             if (data[i].name.includes('Flash')) {
//                 console.log(data[i]);
//                 str = '';
//                 str += `<div class="card">`;
//                 str += `<img class="img" src="${data[i].images.sm}">`;
//                 str += `<p class="nick"><b>Alias:</b> ${data[i].name}</p>`;
//                 str += `<p class="fullName"><b>Full Name:</b> ${data[i].biography.fullName}</p>`;
//                 str += `<p class="race"><b>Race: </b> ${data[i].appearance.race}</p>`;
//                 str += `<p class="gender"><b>Gender:</b> ${data[i].appearance.gender}</p>`;
//                 str += `<p class="placeOfBirth"><b>Was born in:</b> ${data[i].biography.placeOfBirth}</p>`;
//                 str += `<p class="work"><b>Work:</b> ${data[i].work.occupation}</p>`;
//                 str += `</div>`;
//                 document.querySelector('.team').innerHTML += str;
//             }
//         }
//         // str = '';
//         // str += `<div class="card">`;
//         // str += `<img class="img" src="${data.images.sm}">`;
//         // str += `<p class="nick"><b>Alias:</b> ${data.name}</p>`;
//         // str += `<p class="fullName"><b>Full Name:</b> ${data.biography.fullName}</p>`;
//         // str += `<p class="race"><b>Race: </b> ${data.appearance.race}</p>`;
//         // str += `<p class="gender"><b>Gender:</b> ${data.appearance.gender}</p>`;
//         // str += `<p class="placeOfBirth"><b>Was born in:</b> ${data.biography.placeOfBirth}</p>`;
//         // str += `<p class="work"><b>Work:</b> ${data.work.occupation}</p>`;
//         // str += `</div>`;
//         // document.querySelector('.team').innerHTML += str;

//         // a = document.createElement('p');
//         // a.textContent = data.lyrics;
//         // document.querySelector('.dog').appendChild(a);
//         // console.log('Data: ', data.message.slice(30,50));

//         // document.querySelector('.name').innerHTML = data.lyrics.replace(/\n/gi, '<br>');
//     })
//     .catch(er => console.log('Error:', er))

// document.querySelector('.btn').addEventListener('click', () => {
//     document.querySelector('.team').innerHTML = '';
//     fetchToDo();
// });


// class Creature {
//     race;
//     gender;

//     constructor(heroRace, heroGender) {
//         this.race = heroRace;
//         this.gender = heroGender;
//     }
// }
class SuperHero {
    img;
    nick;
    fullName;
    race;
    gender;
    placeOfBirth;
    work;
    add;
    inputVal;

    constructor(url){
        this.url = url;
    }

    fetchToDo() {
        console.log('FetchToDo started...');
        this.searchCleaner();
        this.inputval = this.inputToUpper(inp);
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log('Data: ', data);
                // console.log(data[0].name);
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name.includes(this.inputval)) {
                        // console.log(data[i]);
                        this.img = data[i].images.sm;
                        this.nick = data[i].name;
                        this.fullName = data[i].biography.fullName;
                        this.race = data[i].appearance.race;
                        if(this.race == null){
                            this.race = 'Unknown';
                        }
                        this.gender = data[i].appearance.gender;
                        this.placeOfBirth = data[i].biography.placeOfBirth.slice(0,44);
                        this.work = data[i].work.occupation.slice(0,78);
                        this.searchCards(this.img, this.nick, this.fullName, this.race, this.gender, this.placeOfBirth, this.work, i);
                    }
                }
                return data;
                // str = '';
                // str += `<div class="card">`;
                // str += `<img class="img" src="${data.images.sm}">`;
                // str += `<p class="nick"><b>Alias:</b> ${data.name}</p>`;
                // str += `<p class="fullName"><b>Full Name:</b> ${data.biography.fullName}</p>`;
                // str += `<p class="race"><b>Race: </b> ${data.appearance.race}</p>`;
                // str += `<p class="gender"><b>Gender:</b> ${data.appearance.gender}</p>`;
                // str += `<p class="placeOfBirth"><b>Was born in:</b> ${data.biography.placeOfBirth}</p>`;
                // str += `<p class="work"><b>Work:</b> ${data.work.occupation}</p>`;
                // str += `</div>`;
                // document.querySelector('.team').innerHTML += str;
        
                // a = document.createElement('p');
                // a.textContent = data.lyrics;
                // document.querySelector('.dog').appendChild(a);
                // console.log('Data: ', data.message.slice(30,50));
        
                // document.querySelector('.name').innerHTML = data.lyrics.replace(/\n/gi, '<br>');
            })
            // .then(myData => {
            //         let str1 = '';
            //         str1 += `<div class="card">`;
            //         str1 += `<img class="img" src="${myData[id].images.sm}">`;
            //         str1 += `<p class="nick"><b>Alias:</b> ${myData[id].name}</p>`;
            //         str1 += `<p class="fullName"><b>Full Name:</b> ${myData[id].biography.fullName}</p>`;
            //         if(myData[id].appearance.race == null){
            //             myData[id].appearance.race = 'Unknown';
            //         }
            //         str1 += `<p class="race"><b>Race: </b> ${myData[id].appearance.race}</p>`;
            //         str1 += `<p class="gender"><b>Gender:</b> ${myData[id].appearance.gender}</p>`;
            //         str1 += `<p class="placeOfBirth"><b>Was born in:</b> ${myData[id].biography.placeOfBirth.slice(0,44)}</p>`;
            //         str1 += `<p class="work"><b>Work:</b> ${myData[id].work.occupation.slice(0,78)}</p>`;
            //         str1 += `<button onclick="addToTeam()" class="btn">Delete</button>`;
            //         str1 += `</div>`;
            //         document.querySelector('.team').innerHTML += str1;
            // })
            .catch(er => console.log('Error:', er))
    }

    searchCards(img, nick, fullName, race, gender, placeOfBirth, work, id){
        let str = '';
        str += `<div class="card">`;
        str += `<img class="img" src="${img}">`;
        str += `<p class="nick"><b>Alias:</b> ${nick}</p>`;
        str += `<p class="fullName"><b>Full Name:</b> ${fullName}</p>`;
        str += `<p class="race"><b>Race: </b> ${race}</p>`;
        str += `<p class="gender"><b>Gender:</b> ${gender}</p>`;
        str += `<p class="placeOfBirth"><b>Was born in:</b> ${placeOfBirth}</p>`;
        str += `<p class="work"><b>Work:</b> ${work}</p>`;
        // str += `<button onclick="${this.addToTeam(i)}" class="btn" id="${i}">Add hero</button>`;
        str += `<button onclick="addToTeam(${id})" class="btn" id="${id}">Add hero</button>`;
        str += `</div>`;
        document.querySelector('.searchResult').innerHTML += str;
    }

    inputToUpper(str){
        return str.value.charAt(0).toUpperCase() + str.value.slice(1);
    }

    searchCleaner(){
        document.querySelector('.searchResult').innerHTML = '';
    }
    // addToTeam(){
        // this.id = id;
        // let str = '';
        // str += `<div class="card">`;
        // str += `<img class="img" src="${data[id].images.sm}">`;
        // str += `<p class="nick"><b>Alias:</b> ${data[id].name}</p>`;
        // str += `<p class="fullName"><b>Full Name:</b> ${data[id].biography.fullName}</p>`;
        // if(data[id].appearance.race == null){
        //     data[id].appearance.race = 'Unknown';
        // }
        // str += `<p class="race"><b>Race: </b> ${data[id].appearance.race}</p>`;
        // str += `<p class="gender"><b>Gender:</b> ${data[id].appearance.gender}</p>`;
        // str += `<p class="placeOfBirth"><b>Was born in:</b> ${data[id].biography.placeOfBirth.slice(0,44)}</p>`;
        // str += `<p class="work"><b>Work:</b> ${data[id].work.occupation.slice(0,78)}</p>`;
        // str += `<button onclick="addToTeam(${id})" class="btn">Add hero</button>`;
        // str += `</div>`;
        // document.querySelector('.team').innerHTML += str;
    
    // }

    // get img_url(){
    //     return this.img_url;
    // }

}

function addToTeam(id){
    // let parDiv = document.getElementById(`${id}`).parentNode.children[6];
    // document.querySelector('.team').innerHTML += parDiv;
    // document.getElementById(`${id}`).parentNode.children[6] = `<p>Fgs</p>`;
    // console.log(fullName);
    // const obj = {
    //     img: img,
    //     nick: nick,
    //     fullName: fullName,
    //     race: race,
    //     gender: gender,
    //     placeOfBirth: placeOfBirth,
    //     work: work
    // }
    // teamMass = [];
    // teamMass.push(obj)
    // let teamToJson = JSON.stringify(teamMass);
    // localStorage.setItem('teamMembers', teamToJson);

    // let parDiv = document.getElementById(`${id}`).parentNode.innerHTML;
    let parDiv = document.getElementById(`${id}`).parentNode.innerHTML;
    // console.log(parDiv);
    document.querySelector('.team').innerHTML += `<div class="card" id="member${id}">${parDiv}</div>`;
    let memberDiv = document.getElementById(`member${id}`);
    memberDiv.children[7].setAttribute('onclick',`removeMember(${id})`);
    memberDiv.children[7].setAttribute('id',`remove${id}`);
    memberDiv.children[7].textContent = `Remove`;
}
function removeMember(id){
    let divToRemove = document.getElementById(`member${id}`);
    // console.log(divToRemove);
    divToRemove.remove();
}


const hero = new SuperHero(url);

document.querySelector('.btn').addEventListener('click', () => {
    hero.fetchToDo();
})









// img = document.createElement('img');
// img_div = document.querySelector('.img');
// class Dog{

//     img_url;
//     // name;
//     constructor(url){
//         this.url = url;
//     }

//     async fetchToDo() {
//         console.log('FetchToDo started...');
//         await fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             this.img_url = data[0].url;
//             // console.log(data[0].url);
//             // this.img_url =  data.url;
//             // console.log(this.img_url);
//             // console.log('Data: ', data.message.slice(30,50));
//         })
//         .then(()=>{
//             img.setAttribute('src', this.img_url);
//         })
//         .catch(er => console.log('Error:', er))
//     }
//     showCat(){
//         this.fetchToDo();
//         img.height = '500';
//         img.width = '500';
//         img_div.appendChild(img);

//     }
//     // get img_url(){
//     //     return this.img_url;
//     // }

// }

// const dog = new Dog(url);

// document.querySelector('.btn').addEventListener('click', () => {
//     dog.showCat();
// })