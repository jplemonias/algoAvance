function Labyrinth(data) {
    this.data = data;

    this.display = () => {
        let container = document.getElementById("container");
        container.style.width = `${this.data[0].size * Math.sqrt(this.data.length)}px`;
        container.style.height = container.style.width;
        this.data.forEach(cell => cell.display());
    }

    // this.setCSSProperties = () => { console.log("set properties") };

    this.getNeighbors = (cell) => {
        let neighbors = [];
        for (cellInData of this.data) {

            let idTop = `${cell.x - 1}-${cell.y}`
            let idRig = `${cell.x}-${cell.y + 1}`
            let idBot = `${cell.x + 1}-${cell.y}`
            let idLef = `${cell.x}-${cell.y - 1}`

            switch (cellInData.id) {
                case idTop:
                    if (!cell.walls[0] && !cellInData.visited)
                        neighbors.push(cellInData)
                    break;
                case idRig:
                    if (!cell.walls[1] && !cellInData.visited)
                        neighbors.push(cellInData)
                    break;
                case idBot:
                    if (!cell.walls[2] && !cellInData.visited)
                        neighbors.push(cellInData)
                    break;
                case idLef:
                    if (!cell.walls[3] && !cellInData.visited)
                        neighbors.push(cellInData)
                    break;
            }
        }
        return neighbors;
    }
}

function Cell(cellData) {

    this.x = cellData["posX"];
    this.y = cellData["posY"];
    this.size = 25;
    this.id = this.x + "-" + this.y;
    this.walls = cellData["walls"];
    this.entrance = cellData["entrance"];
    this.exit = cellData["exit"];

    this.display = () => {

        let container = document.getElementById("container");
        let cellDiv = document.createElement("div");

        cellDiv.classList.add("cell");
        cellDiv.setAttribute("id", this.id);
        cellDiv.style.width = this.size + "px";
        cellDiv.style.height = this.size + "px";
        cellDiv.style.borderWidth = this.walls.map(elt => elt ? "1px" : "0px").join(" ");

        container.appendChild(cellDiv);

        if (cellData.entrance) {
            cellDiv.classList.add("entrance");
        }
        if (cellData.exit) {
            cellDiv.classList.add("exit");
        }
    };
    this.visited = false;
}

function Stack() {
    this.PATH = []
    this.isEmpty = () => this.PATH.length < 1;
    this.push = (elt) => this.PATH.push(elt);
    this.pop = () => this.PATH.pop();
}

function solve(labyrinth, e) {

    let s = new Stack();
    s.push(e);

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

async function build_path(currentCell){
    const ARR = []

    while (!currentCell.parent.entrance) {
        ARR.push(currentCell.parent)
        currentCell = currentCell.parent
        // document.getElementById(`${currentCell.x}-${currentCell.y}`).style.backgroundColor = '#cd7dcd'
    }

    ARR.reverse()

    for (let i = 0; i<ARR.length; i++) {
        await timer();
        document.getElementById(`${ARR[i].x}-${ARR[i].y}`).style.backgroundColor = '#cd7dcd'
        if (i === ARR.length -1) {
            console.log('U won !!!')
            // document.getElementById(`${currentCell.parent.x}-${currentCell.parent.y}`).style.backgroundColor = 'gold'
        }
    }
}

function timer() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 100);
    });
}