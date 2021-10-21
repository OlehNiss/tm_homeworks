import { ValidationError } from '/errors.js'
import { PermissionError } from '/errors.js'
import { DatabaseError } from '/errors.js'

import {url, inp} from '/variables.js'
import {Creature} from '/variables.js'
import {addMember, removeMember} from '/variables.js'

window.addMember = addMember;
window.removeMember = removeMember;

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

        /* Using .then */
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (this.inputval != '') {
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
                    if(document.querySelector('.searchResult').innerHTML == ''){
                        document.querySelector('.searchResult').innerHTML += `<h2 class="noResults">No results found</h2>`
                    }
                }else if (this.inputval == '') {
                    if(document.querySelector('.searchResult').innerHTML == ''){
                        document.querySelector('.searchResult').innerHTML += `<h2 class="noResults">No results found</h2>`
                    } 
                    alert('You didn\'t input anything, so there is nothing to show!!');
                }
            })
            .catch(new ValidationError('A validation error'))
            .catch(new PermissionError('A permission error'))
            .catch(new DatabaseError('A database error'))
            .catch(error => console.log(error));

        /* Using async/await */
        // const response = await fetch(url);
        // const data = await response.json();
        // if (this.inputval != '') {
        //     try {
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
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }else if (this.inputval == '') {
        //     if(document.querySelector('.searchResult').innerHTML == ''){
        //         document.querySelector('.searchResult').innerHTML += `<h2 class="noResults">No results found</h2>`
        //     } 
        //     alert('You didn\'t input anything, so there is nothing to show!!');
        // }
    }

    searchCards(img_url, nick, fullName, race, gender, placeOfBirth, work, id) {
        let str = '';
        str = 
            `<div class="card">
                <img class="img" src="${img_url}">
                <p class="nick"><b>Alias:</b> ${nick}</p>
                <p class="fullName"><b>Full Name:</b> ${fullName}</p>
                <p class="race"><b>Race: </b> ${race}</p>
                <p class="gender"><b>Gender:</b> ${gender}</p>
                <p class="placeOfBirth"><b>Was born in:</b> ${placeOfBirth}</p>
                <p class="work"><b>Work:</b> ${work}</p>
                <button class="btn addButtons" id="${id}" onclick="addMember(${id})">Add hero</button>
            </div>`;
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
