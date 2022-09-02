import myJson from './labyrinthes.json' assert {type: 'json'};
import { EXO_CHOICE } from './choiceExo.js';

const DATA = myJson[EXO_CHOICE.ARR_LENGTH][EXO_CHOICE.EXO];
const LABYRINTH_OBJ = [];

const BODY = document.querySelector("body");

const LABYRINTH = new Labyrinth(LABYRINTH_OBJ);
let entrance = null

creatElementHtml(BODY, 'div', null);
document.querySelector('div').setAttribute('id', 'container');

function creatElementHtml(parent, elem, value) {
    const el = document.createElement(elem);
    el.innerHTML = value;
    parent.appendChild(el);
}

for (const cell of DATA){
    LABYRINTH_OBJ.push(new Cell(cell));
    if (cell.entrance){
        entrance = LABYRINTH_OBJ.length-1;
    }
}

LABYRINTH.display();
new solve(LABYRINTH, LABYRINTH_OBJ[entrance]);

console.assert(LABYRINTH.getNeighbors(LABYRINTH.data[0]) == LABYRINTH.data[1] , "Expression returned false");
