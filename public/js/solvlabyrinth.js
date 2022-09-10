function Stack() {
    this.PATH = []
    this.isEmpty = () => this.PATH.length < 1;
    this.push = (elt) => this.PATH.push(elt);
    this.pop = () => this.PATH.pop();
}

function HumansStack() {
    this.PATH = []
    this.isEmpty = () => this.PATH.length < 1;
    this.push = (elt) => this.PATH.push(elt);
    this.pop = () => this.PATH.pop();
    this.position = () => { return this.PATH.length - 1 };
}

function solve(labyrinth, e) {

    let s = new Stack();
    s.push(e);
    let hs = new HumansStack();
    hs.push(e);

    let key = new logKey(labyrinth);

    document.addEventListener("keydown", eve => {
        if (!hs.isEmpty()) {
            if (!hs.PATH[hs.PATH.length - 1]) {
                hs.pop();
            }
            hs.push(key.direction(labyrinth.getNeighborsHumans(hs.PATH[hs.PATH.length - 1]), hs.PATH[hs.PATH.length - 1], eve))
            if (!hs.PATH[hs.PATH.length - 1]) {
                hs.pop();
            }
            const svg = 'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z';
            el = document.getElementById(`${hs.PATH[hs.PATH.length - 1].id}`);  
            el.style.backgroundColor = 'pink'


            // labyrinth.creatElementHtml(el, "div", '');
            // el = el.querySelector('div');
            
            
            // labyrinth.creatElementHtml(el, "svg", '');
            // el = el.querySelector('svg');
            // el.classList.add(`heart`);
            // el.setAttribute('viewBox', "0 0 32 29.6");
            // labyrinth.creatElementHtml(el, "path", '');
            // el = el.querySelector('path');
            // el.setAttribute('d', svg);
        }
    }, false)


    while (!s.isEmpty()) {

        let current_cell = s.pop();

        if (current_cell.exit) {
            return build_path(current_cell);
        }
        if (!current_cell.visited) {
            // if (!current_cell.entrance) {
            //     document.getElementById(current_cell.id).style.backgroundColor = 'purple'
            // }
            current_cell.visited = true;

            labyrinth.getNeighbors(current_cell).forEach(neighbor => {
                if (!neighbor.visited) {
                    neighbor.parent = current_cell;
                    s.push(neighbor);
                }
            })
        }
    }
    return undefined;
}

async function build_path(currentCell) {
    const ARR = []

    while (!currentCell.parent.entrance) {
        ARR.push(currentCell.parent)
        currentCell = currentCell.parent
        // document.getElementById(`${currentCell.x}-${currentCell.y}`).style.backgroundColor = '#cd7dcd'
    }

    ARR.reverse()

    for (let elt of ARR) {
        await timer(100);
        document.getElementById(`${elt.x}-${elt.y}`).style.backgroundColor = '#cd7dcd'
    }
    console.log('The PC won !!!')

    // for (let i = 0; i<ARR.length; i++) {
    //     await timer(100);
    //     document.getElementById(`${ARR[i].x}-${ARR[i].y}`).style.backgroundColor = '#cd7dcd'
    //     if (i === ARR.length -1) {
    //         console.log('U won !!!')
    //         // document.getElementById(`${currentCell.parent.x}-${currentCell.parent.y}`).style.backgroundColor = 'gold'
    //     }
    // }

}

function timer(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, time);
    });
}


function logKey(labyrinth) {

    this.direction = (voisins, position, e) => {
        let newP = position;
        switch (e.key) {
            case 'ArrowUp':
                if (voisins[0] && !voisins[0].visitedHumans)
                    newP = voisins[0];
                break;
            case 'ArrowRight':
                if (voisins[1] && !voisins[1].visitedHumans)
                    newP = voisins[1];
                break;
            case 'ArrowDown':
                if (voisins[2] && !voisins[2].visitedHumans)
                    newP = voisins[2];
                break;
            case 'ArrowLeft':
                if (voisins[3] && !voisins[3].visitedHumans)
                    newP = voisins[3];
                break;
        }
        return newP
    }
}