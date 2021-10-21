// const url = 'https://dog.ceo/api/breeds/image/random';
// const url = 'https://api.thecatapi.com/v1/images/search';
// const url = 'https://goweather.herokuapp.com/weather/Lviv';
// const url = 'https://geek-jokes.sameerkumar.website/api?format=json';
// const url = 'https://forza-api.tk/';
// const url = 'https://api.lyrics.ovh/v1/eminem/not afraid';
export const url = 'https://akabab.github.io/superhero-api/api/all.json';

export let inp = document.querySelector('.search');

export class Creature {
    race;
    gender;

    constructor(url) {
        this.url = url;
    }
}
export function addMember(id) {
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
            alert('Such hero is already exist is your team!');
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
export function removeMember(id) {
    if (document.getElementById(`member${id}`)) {
        let divToRemove = document.getElementById(`member${id}`);
        divToRemove.remove();
    }
}