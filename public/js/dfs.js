import myJson from '../json/labyrinthes.json' assert {type: 'json'};
import { EXO_CHOICE } from './choiceExo.js';

let DATA = myJson[EXO_CHOICE.ARR_LENGTH][EXO_CHOICE.EXO];
const LABYRINTH_OBJ = [];

const BODY = document.querySelector("body");

let LABYRINTH = new Labyrinth(LABYRINTH_OBJ);
let entrance = null

LABYRINTH.creatElementHtml(BODY, 'div', null);
document.querySelector('div').setAttribute('id', 'container');

const CONTAIN = document.querySelector("#container");
const SIZE_LABYRINTH = document.getElementById('sizeLabyrinth');


for (const size in myJson) {
    LABYRINTH.creatElementHtml(SIZE_LABYRINTH, 'option', `${size}x${size}`);
    const el = SIZE_LABYRINTH.querySelector(':last-child')
    el.setAttribute('name', 'choiceSize');
    //console.log(el)
    el.setAttribute('value', size);
}

createLab();
// new solve(LABYRINTH, LABYRINTH_OBJ[entrance]);

function createLab() {
    LABYRINTH_OBJ.splice(0, LABYRINTH_OBJ.length)
    for (const cell of DATA) {
        LABYRINTH_OBJ.push(new Cell(cell));
        if (cell.entrance) {
            entrance = LABYRINTH_OBJ.length - 1;
            //console.log(LABYRINTH_OBJ[entrance].id)
        }

        let container = document.getElementById("container");
        LABYRINTH.creatElementHtml(container, 'div', null);
    }
    LABYRINTH.Empty(LABYRINTH_OBJ)
    LABYRINTH.display();
    // new solve(LABYRINTH, LABYRINTH_OBJ[entrance]);
}


function deleteLab() {
    CONTAIN.innerHTML = '';
}

function getSubmit(lvl, choice) {
    choice = checkInput(choice)
    if (choice === undefined) choice = 1;
    DATA = myJson[lvl][`ex-${choice - 1}`]
}

function checkInput(elts) {
    for (var i = 0; i < elts.length; i++) {
        if (elts[i].checked === true) return elts[i].value;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const lab = document.querySelector('select');
    const elts = document.querySelectorAll('input');

    for (var i = 0; i < elts.length; i++) {
        elts[i].addEventListener('change', () => {
            getSubmit(lab.value, elts);
            deleteLab()
            createLab();
        });
    }

    lab.addEventListener('change', () => {
        getSubmit(lab.value, elts);
        deleteLab()
        createLab();
    });
});

// console.assert(LABYRINTH.getNeighbors(LABYRINTH.data[0]) == LABYRINTH.data[1] , "Expression returned false");
