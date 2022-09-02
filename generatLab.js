import myJson from './labyrinthes.json' assert {type: 'json'};
import { EXO_CHOICE } from './choiceExo.js';

export const START_POSITION = []
export const END_POSITION = []

const ARR_LENGTH = EXO_CHOICE.ARR_LENGTH
const EXO = EXO_CHOICE.EXO
const MY_EXO = myJson[ARR_LENGTH][EXO];

const body = document.querySelector("body");

creatElementHtml(body, 'ul', null);
creatBoard();

function creatBoard() {
    for (let i = 0; i < MY_EXO.length; i++) {
        const CELL = MY_EXO[i];
        if (i % ARR_LENGTH === 0) {
            const ul = document.querySelector("ul");
            creatElementHtml(ul, 'li', null);
        }
        const li = document.querySelectorAll("li");
        creatElementHtml(li[CELL.posX], 'span', '&nbsp;&nbsp;&nbsp;&nbsp;');
        creatCells(CELL, i)
    }
}

function creatCells(CELL, i) {
    for (const cell in CELL) {
        const cellWall = document.querySelectorAll("span");
        if (cell === "entrance") {
            startAndEnd("chartreuse", CELL, cellWall[i], START_POSITION);
        }
        if (cell === "exit") {
            startAndEnd("red", CELL, cellWall[i], END_POSITION);
        }
        if (cell === 'walls') {
            for (let wall = 0; wall < CELL[cell].length; wall++) {
                if (CELL[cell][wall]) {
                    wallOrNot('black', wall, cellWall[i])
                }
                else {
                    wallOrNot('white', wall, cellWall[i])
                }
            }
        }
    }
}

function creatElementHtml(parent, elem, value) {
    const el = document.createElement(elem);
    el.innerHTML = value;
    parent.appendChild(el);
}

function startAndEnd(color, arrCell, cell, sORe) {
    cell.style.backgroundColor = `${color}`;
    // console.log(MY_EXO.indexOf(arrCell))
    sORe[0] = MY_EXO.indexOf(arrCell);
    // sORe[1] = arrCell['posY'];
}

function wallOrNot(color, wall, arrCell) {
    switch (wall) {
        case 0:
            arrCell.style.borderTop = `1px solid ${color}`;
            break;
        case 1:
            arrCell.style.borderRight = `1px solid ${color}`;
            break;
        case 2:
            arrCell.style.borderBottom = `1px solid ${color}`;
            break;
        case 3:
            arrCell.style.borderLeft = `1px solid ${color}`;
            break;
    }
}