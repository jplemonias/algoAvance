import myJson from './labyrinthes.json' assert {type: 'json'};
import { EXO_CHOICE } from './choiceExo.js';
import { START_POSITION, END_POSITION } from './generatLab.js';

const ARR_LENGTH = EXO_CHOICE.ARR_LENGTH,
    EXO = EXO_CHOICE.EXO,
    DATA = myJson[ARR_LENGTH][EXO],
    MY_POSITION = [],
    MY_TOTAL_ROAD = [],
    My_ROAD = [],
    ANOTER_POSSIBILITY = [[],[],[],[]];

let win = false;
let blockedCount = 0;
let blocked = blockedCount === 4;
MY_POSITION[0] = START_POSITION[0]

while (!win) {
    if (MY_POSITION[0] === END_POSITION[0]) {
        console.log('U won')
        document.querySelectorAll("span")[MY_POSITION[0]].style.backgroundColor = "gold";
        win = true;
    }
    // moveOn (wall, X, Y)
    if (!win) {
        for (const cell in DATA[MY_POSITION[0]]) {
            if (cell === 'walls') {
            // console.log('Road',MY_TOTAL_ROAD)
                for (let wall = 0; wall < DATA[MY_POSITION[0]][cell].length; wall++) {
                    //console.log(myJson[ARR_LENGTH][EXO][i]['posX'])
                    const X = DATA[MY_POSITION[0]]['posX'];
                    const Y = DATA[MY_POSITION[0]]['posY'];


                    if (!DATA[MY_POSITION[0]][cell][wall]) {
                        // console.log('MY_POSITION', MY_POSITION[0])
                        // console.log('length', DATA[MY_POSITION[0]][cell].length)
                        let positionTemp = MY_POSITION[0];
                        if (MY_TOTAL_ROAD.length) {
                            const caca = test(MY_POSITION - MY_TOTAL_ROAD[MY_TOTAL_ROAD.length - 1]);
                            positionTemp = moveOn(wall, X, Y, caca);
                        }
                        else {
                            positionTemp = moveOn(wall, X, Y, null);
                        }
                        if (MY_POSITION[0] !== positionTemp){
                            MY_POSITION[0] = positionTemp;
                            wall = DATA[MY_POSITION[0]][cell].length;
                        }
                        MY_POSITION[0] = positionTemp;
                    }
                }
            }
        }
    }
}

function test(old) {
    let noTest = null;
    switch (old) {
        case ARR_LENGTH:
            noTest = 0;
            // console.log(`On ne vérifie pas vers le haut`);
            break;
        case -1:
            noTest = 1;
            // console.log(`On ne vérifie pas vers la droite`);
            break;
        case -ARR_LENGTH:
            noTest = 2;
            // console.log(`On ne vérifie pas vers le bas`);
            break;
        case 1:
            noTest = 3;
            // console.log(`On ne vérifie pas vers la gauche`);
            break;
    }
    return noTest;
}

function moveOn(wall, X, Y, notest) {
    // console.log('notest', notest)
    const cellWall = document.querySelectorAll("span");
    let newPosition = MY_POSITION[0];
    let itsTrue = false;
    if (wall === 0 && notest !== 0) {
        itsTrue = true;
        // console.log(`On est case ${X}-${Y}, on peut avancer vers le haut`);
        MY_TOTAL_ROAD.push(MY_POSITION[0]);
        newPosition = MY_POSITION[0] - ARR_LENGTH;
        // MY_POSITION[1] = Y;
        checkOtherPossibility(1, newPosition);
        checkOtherPossibility(3, newPosition);
    }
    if (wall === 1 && notest !== 1) {
        itsTrue = true;
        // console.log(`On est case ${X}-${Y}, on peut avancer vers la droite`);
        MY_TOTAL_ROAD.push(MY_POSITION[0]);
        newPosition = MY_POSITION[0] + 1;
        // MY_POSITION[1] = Y;
        checkOtherPossibility(2, newPosition);
    }
    if (wall === 2 && notest !== 2) {
        itsTrue = true;
        // console.log(`On est case ${X}-${Y}, on peut avancer vers le bas`);
        MY_TOTAL_ROAD.push(MY_POSITION[0]);
        newPosition = MY_POSITION[0] + ARR_LENGTH;
        // MY_POSITION[1] = Y;
        checkOtherPossibility(3, newPosition);
    }
    if (wall === 3 && notest !== 3) {
        itsTrue = true;
        // console.log(`On est case ${X}-${Y}, on peut avancer vers la gauche`);
        MY_TOTAL_ROAD.push(MY_POSITION[0]);
        newPosition = MY_POSITION[0] - 1;
    }
    if (!itsTrue){
        console.log('~~~~~~~~~~~~~~~~~~~TEST')
    }
    // console.log('newPosition', newPosition)
    cellWall[newPosition].style.backgroundColor = "chartreuse";
    return newPosition;
}

function checkOtherPossibility(wallPosition, position, notest) {
    console.log(DATA[MY_POSITION[0]].walls[wallPosition], position)
}