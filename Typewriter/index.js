// const containerEle = document.querySelector('.container');

// const serviceCategories = ['We', 'Service', 'Man', 'Women', 'Kids', ]

// let categoryIndex = 0;

// let characterIndex = 0;

// updateText();

// function updateText() {
//     characterIndex++;

//     containerEle.innerHTML = 
//     `
//     <span>${serviceCategories[categoryIndex].slice(0, characterIndex)}</span>
//     `

//     if(characterIndex === serviceCategories[categoryIndex].length) {
//         categoryIndex++;
//     }

//     setTimeout(updateText, 500)

// }










// // console.log(containerEle);

// // const logArrayElements = (element, index /*, array */) => {
// //     console.log(`a[${index}] = ${element}`);
// //   };

// // let characterIndex = 0;


// // function updateText() {
// //     containerEle.forEach( (item, index ) => {
// //         item.textContent;
// //         console.log(item)
// //         // characterIndex++;
// //         // console.log(item)
// //         // item.appendChild(container2)
// //     })
// // }

// // updateText();







const text = document.querySelector('.text');
const phrase = text.textContent;
let index = 0;

function showLetter() {
    if (index <= phrase.length) {
        text.textContent = phrase.slice(0, index);
        index++;
        setTimeout(showLetter, 100);
    }
}

showLetter();

