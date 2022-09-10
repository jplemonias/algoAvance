function Labyrinth(data) {
    this.data = data;

    this.creatElementHtml = (parent, elem, value) => {
        const el = document.createElement(elem);
        el.innerHTML = value;
        parent.appendChild(el);
    }

    this.display = () => {
        let container = document.getElementById("container");
        container.style.width = `${this.data[0].size * Math.sqrt(this.data.length)}px`;
        container.style.height = container.style.width;
        this.data.forEach((cell, i) => cell.display(i));
    }

    // this.setCSSProperties = () => { console.log("set properties") };

    
    this.Empty = (d) => {console.log(d);this.data = d};


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

    this.getNeighborsHumans = (cell) => {
        let neighbors = [];
        for (cellInData of this.data) {

            let idTop = `${cell.x - 1}-${cell.y}`
            let idRig = `${cell.x}-${cell.y + 1}`
            let idBot = `${cell.x + 1}-${cell.y}`
            let idLef = `${cell.x}-${cell.y - 1}`

            switch (cellInData.id) {
                case idTop:
                    if (!cell.walls[0] && !cellInData.visitedHumans) {
                        neighbors[0] = cellInData
                    }
                    else { neighbors[0] = false }
                    break;
                case idRig:
                    if (!cell.walls[1] && !cellInData.visitedHumans) {
                        neighbors[1] = cellInData
                    }
                    else { neighbors[1] = false }
                    break;
                case idBot:
                    if (!cell.walls[2] && !cellInData.visitedHumans) {
                        neighbors[2] = cellInData
                    }
                    else { neighbors[2] = false }
                    break;
                case idLef:
                    if (!cell.walls[3] && !cellInData.visitedHumans) {
                        neighbors[3] = cellInData
                    }
                    else { neighbors[3] = false }
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

    this.display = (div) => {
        let cellDiv = document.querySelector(`#container :nth-child(${div + 1}n)`);
        cellDiv.setAttribute("id", this.id);
        cellDiv.style.borderWidth = this.walls.map(elt => elt ? "1px" : "0px").join(" ");

        if (cellData.entrance) {
            return cellDiv.classList.add(`h-[${this.size}px]`, `w-[${this.size}px]`, `cell`, "entrance");
        }
        if (cellData.exit) {
            return cellDiv.classList.add(`h-[${this.size}px]`, `w-[${this.size}px]`, `cell`, "exit");
        }
        cellDiv.classList.add(`h-[${this.size}px]`, `w-[${this.size}px]`, `cell`);
    };
    this.visited = false;
    this.visitedHumans = false;
}
