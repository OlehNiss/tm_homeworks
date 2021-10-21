/* Using .then */
// function callApi<T>(url: string): Promise<T> {
//     return fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.statusText)
//             }
//             return response.json()
//         })

// }

// callApi<IUser[]>('https://jsonplaceholder.typicode.com/posts')
//     .then((data) => {
//         console.log(data[0].body)
//     })
//     .catch(error => {
//         console.log(error);
//     })

// Task 1
/*  Using async/await  */
interface IUser{
    userId: number;
    id: number;
    title: string;
    body: string;
}

async function callApi<T>(url: string): Promise<T>{
    const response =  await fetch(url);
    const body = await response.json();
    return body;

}

const data = callApi<IUser[]>(
    "https://jsonplaceholder.typicode.com/posts"
).then((values) => {
    // console.log('All values: ', values);
    let str: string = '';
    for(let value  of values){
        str += 
        `<div class="contentCard">
        <p><b>Id:</b> ${value.id}<p>
        <p><b>UserId:</b> ${value.userId}<p>
        <p><b>Title:</b> ${value.title}<p>
        <p><b>Body:</b> ${value.body}<p>
        </div>`
    }
    document.querySelector('.dataContainer').innerHTML = str;
})


//Task 2
let arr = [{
    name: 'mercedes',
    color: 'black',
    year: 2013,
    price: 15500
},
{
    name: 'bmw',
    color: 'blue',
    year: 2016,
    price: 18900
},
{
    name: 'audi',
    color: 'white',
    year: 2011,
    price: 12300
},
{
    name: 'porsche',
    color: 'red',
    year: 2016,
    price: 22400
}
]

const newObj ={
    name: 'volkswagen',
    color: 'white',
    year: 2012,
    price: 11200
}

interface ObjectShape {
    name: string;
    color: string;
    year: number;
    price: number;
}

function updateObjectInArray<ObjectShape> (initialArray: ObjectShape[], keyToFind: string, keyValueToFind: string, patch: ObjectShape): ObjectShape[]{
    let newArr: ObjectShape[] = initialArray;
        for(let i = 0;i < newArr.length;i++){
            if(newArr[i].hasOwnProperty(keyToFind)){
                if(newArr[i][keyToFind] === keyValueToFind){
                    newArr[i] = patch;
                    // newArr[i][keyToFind] = patch[keyToFind]; //or only one value
                }
            }
        }
    return newArr;
}

console.log('Task 2');
console.log('Array objects before update: ');
arr.forEach(item => console.log(item))

console.log('Array after update: ', updateObjectInArray(arr,'name','bmw', newObj));
// console.log('After update:');
// updateObjectInArray(arr,'name','bmw', newObj).forEach(item => console.log(item));

