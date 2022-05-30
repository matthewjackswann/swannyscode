import { useState } from "react";
import { Link } from "react-router-dom";
import animalInfo from "./animalInfo.json";
import empty from "./imgs/Empty.png";

const gridSize = 5

const checkGrid = (grid) => {
    let tiles = [];
    for (const animal in grid) {
        const points = animalInfo.animals[animal].points;
        const dx = grid[animal].x;
        const dy = grid[animal].y;
        points.forEach(p => {tiles.push({x: p.x + dx, y: p.y + dy});})
    }
    tiles.sort((a, b) => { // sorts pairs so that duplicates are next to each other
        if (a.x === b.x) {
            return a.y - b.y;
        }
        return a.x - b.x;
    });
    for (let i = 1; i < tiles.length; i++) {
        if (tiles[i].x === tiles[i-1].x && tiles[i].y === tiles[i-1].y) {
            return false;
        }
    }
    return true;
};

const getPossibleGrids = (animals) => {
    if (animals.length === 0) {
        return [{}];
    }
    const animalMaxX = gridSize + 1 - animalInfo.animals[animals[0]].width;
    const animalMaxY = gridSize + 1 - animalInfo.animals[animals[0]].height;
    let newGrids = [];
    let partialGrids = getPossibleGrids(animals.slice(1)); // list of grids with the next n-1 animals
    partialGrids.forEach(grid => {
        for (let topX = 0; topX < animalMaxX; topX++) {
            for (let topY = 0; topY < animalMaxY; topY++) {
                let g = {...grid};
                g[animals[0]] = {x: topX, y: topY};
                if (checkGrid(g)) { // checks if the grid is valid
                    newGrids.push(g);
                }
            }
        }
    });
    return newGrids;
};

const reducePossibleGrids = (grids, knownPoints) => {
    let filteredGrids = grids.filter(grid => {
        for (const animal in knownPoints) {
            if (animal === "Empty") {
                const ps = knownPoints[animal];
                for (const a in grid) {
                    const points = animalInfo.animals[a].points;
                    const dx = grid[a].x;
                    const dy = grid[a].y;
                    if (points.some(pos => ps.some(p => p.x === pos.x + dx && p.y === pos.y + dy))) {
                        return false;
                    }
                }
            } else {
                const ps = knownPoints[animal];
                const points = animalInfo.animals[animal].points;
                const dx = grid[animal].x;
                const dy = grid[animal].y;
                if (!ps.every(p => {
                    const shiftedPoint = {x: p.x - dx, y: p.y - dy};
                    return points.some(point => point.x === shiftedPoint.x && point.y === shiftedPoint.y);
                })) {
                    return false;
                }
            }
        }
        return true;
    });
    return filteredGrids;
};

const summarizeGrids = (grids) => {
    let scores = [[{}, {}, {}, {}, {}],[{}, {}, {}, {}, {}],[{}, {}, {}, {}, {}],[{}, {}, {}, {}, {}],[{}, {}, {}, {}, {}]];
    grids.forEach(grid => {
        let emptyCells = [[true, true, true, true, true],[true, true, true, true, true],[true, true, true, true, true],[true, true, true, true, true],[true, true, true, true, true]];
        for (const animal in grid) {
            const points = animalInfo.animals[animal].points;
            const dx = grid[animal].x;
            const dy = grid[animal].y;
            for (let i = 0; i < points.length; i++) {
                if (scores[points[i].y + dy][points[i].x + dx].hasOwnProperty(animal)) {
                    scores[points[i].y + dy][points[i].x + dx][animal] += 1;
                } else {
                    scores[points[i].y + dy][points[i].x + dx][animal] = 1;
                }
                emptyCells[points[i].y + dy][points[i].x + dx] = false;
            }
        }
        emptyCells.forEach((row, y) => {
            row.forEach((empty, x) => {
                if (empty) {
                    if (scores[y][x].hasOwnProperty("Empty")) {
                        scores[y][x].Empty += 1;
                    } else {
                        scores[y][x].Empty = 1;
                    }
                }
            });
        });
    });
    return scores;
};

const getColor = (value) => {
    if (!(value >= 0 && value <= 1)) {
        value = 0;
    }
    return "hsl(" + ((1-value)*120).toString(10) + ",100%,50%)";
};

const getAnimalInvertConstant = (summarizedGrids) => {
    let maxValues = {};
    let minValues = {}
    summarizedGrids.forEach(row => {
        row.forEach(square => {
            for (let a in square) {
                if (!(minValues[a] < square[a])) {
                    minValues[a] = square[a];
                }
                if (!(maxValues[a] > square[a])) {
                    maxValues[a] = square[a];
                }
            }
        });
    });
    let result = {};
    for (let a in maxValues) {
        result[a] = maxValues[a] * minValues[a];
    }
    return result;
}

const getSquareScore = (square, scoreFunction, animalInvertConstant) => {
    let thisScore = 0;
    for (const [a, v] of Object.entries(square)) {
        if (scoreFunction[a] < 0) {
            thisScore += (animalInvertConstant[a] * -scoreFunction[a]) / v;
        } else {
            thisScore += scoreFunction[a] * v;
        }
    }
    return thisScore;
}

const getRemainingTiles = (animals, knownTiles) => {
    let result = {};
    for (const a in animals) {
        result[a] = animalInfo.animals[a].points.length;
    }
    for (const t in knownTiles) {
        if (t !== "Empty") {
            result[t] = result[t] - knownTiles[t].length;
        }
    }
    return result;
}

const DiscoZoo = () => {
    let [animals, setAnimals] = useState({});
    let [dropDown, setDropDown] = useState(-1);
    let [knownTiles, setKnownTiles] = useState({});
    let [useTurns, setUseTurns] = useState(true);

    let possibleGrids;
    if (Object.getOwnPropertyNames(animals).length === 0) {
        possibleGrids = getPossibleGrids(["Empty"]);
    } else {
        possibleGrids = getPossibleGrids(Object.getOwnPropertyNames(animals));
    }
    possibleGrids = reducePossibleGrids(possibleGrids, knownTiles);
    const gridNumber = Math.max(1, possibleGrids.length);
    const summarizedGrids = summarizeGrids(possibleGrids, animals);
    const invalidCombination = summarizedGrids.some(row => row.some(square => Object.getOwnPropertyNames(square).length === 0));
    const animalWeights = {...animals}
    const animalInvertConstant = getAnimalInvertConstant(summarizedGrids);
    animalWeights["Empty"] = 0.000000001;
    if (useTurns) {
        const remainingTiles =  getRemainingTiles(animals, knownTiles);
        let remainingTurns = 10;
        for (const t in knownTiles) {
            remainingTurns -= knownTiles[t].length;
        }
        for (const a in remainingTiles) {
            if (remainingTiles[a] > remainingTurns) {
                animalWeights[a] = 0;
            } else if (remainingTiles[a] === remainingTurns) {
                animalWeights[a] = -animalWeights[a];
            }
        }
    }

    const knownSquares = [].concat(...Object.values(knownTiles));
    
    const maxScore = summarizedGrids.reduce((previousMax, row, y) => {
        const rowMax = row.reduce((previousMaxRow, square, x) => {
            if (knownSquares.some(t => t.x === x && t.y === y)) {
                return Math.max(0, previousMaxRow);
            } else {
                return Math.max(getSquareScore(square, animalWeights, animalInvertConstant), previousMaxRow);
            }
        }, 0);
        return Math.max(previousMax, rowMax);
    }, 0);

    const minScore = summarizedGrids.reduce((previousMax, row, y) => {
        const rowMax = row.reduce((previousMaxRow, square, x) => {
            if (knownSquares.some(t => t.x === x && t.y === y)) {
                return Math.max(Number.MAX_SAFE_INTEGER, previousMaxRow);
            } else {
                return Math.min(getSquareScore(square, animalWeights, animalInvertConstant), previousMaxRow);
            }
        }, Number.MAX_SAFE_INTEGER);
        return Math.min(previousMax, rowMax);
    }, Number.MAX_SAFE_INTEGER);

    const toggleDropDown = (i) => {
        setDropDown(old => {
            if (old === i) return -1;
            return i;
        });
        setKnownTiles({});
        setAnimals({});
    }

    const addAnimal = (animal) => {
        setKnownTiles({});
        setAnimals(currentAnimals => {
            let current = {...currentAnimals};
            if (!(animal in current)) {
                current[animal] = animalInfo.animals[animal].rarity;
            }
            return current;
        });
    };

    const removeAnimal = (animal) => {
        setKnownTiles({});
        setAnimals(currentAnimals => {
            let current = {...currentAnimals};
            delete current[animal];
            return current;
        });
    };

    const updateAnimal = (animal, value) => {
        let newValue = parseInt(value);;
        if (isNaN(newValue)) {
            newValue = 0;
        }
        setAnimals(currentAnimals => {
            let current = {...currentAnimals};
            current[animal] = newValue;
            return current;
        });
    };

    const updateKnownTiles = (animal, pos) => {
        setKnownTiles(old => {
            let newKnown = {...old};
            if (animal in newKnown) {
                if (newKnown[animal].some(p => p.x === pos.x && p.y === pos.y)) {
                    newKnown[animal] = newKnown[animal].filter(p => !(p.x === pos.x && p.y === pos.y));
                } else {
                    newKnown[animal] = [pos, ...newKnown[animal]]
                }
            } else {
                newKnown[animal] = [pos];
            }
            return newKnown;
        });
    };

    const getPossibleTiles = (e, x, y) => {
        const possibleTiles = Object.keys(summarizedGrids[y][x]).sort();
         if (possibleTiles.length === 1) {
            updateKnownTiles(possibleTiles[0], {x: x, y: y})
        } else {
            const tileMenu = document.createElement("div");
            tileMenu.className = "discoZooTileMenu";
            const imageWidth = document.getElementsByClassName("discoSquare")[0].clientWidth * 0.75;
            tileMenu.style.left = Math.min(e.pageX, window.innerWidth - imageWidth * possibleTiles.length - 30) + "px";
            tileMenu.style.top = e.pageY + "px";
            possibleTiles.forEach(animal => {
                const i = document.createElement("img");
                i.className = "discoZooAnimal"
                i.src = require("./imgs/" + animal + ".png").default;
                i.alt = animal;
                i.width = imageWidth;
                i.onclick = () => {updateKnownTiles(animal, {x: x, y: y})};
                tileMenu.appendChild(i);
            });
            document.body.appendChild(tileMenu);
            let removable = false;
            const handleClick = () => {
                if (removable) {
                    console.log("Gone");
                    tileMenu.remove();
                    document.removeEventListener("click", handleClick);
                }
            };
            console.log("adding");
            document.addEventListener("click", handleClick);
            setTimeout(() => {removable = true}, 10);
        }
    }

    return <div className="discoZoo">
        <p>
            This is my disco zoo solver. Click an animal to add it to the grid and adjust the weight of each animal.<br />
            For an explanation on how it works and the full code goto the <Link to="/projects/5">explanation</Link><br />
        </p><br />
        <div className="discoGrid">
            {summarizedGrids.map((row, y) => {
                return <div key={y} className="discoRow">
                    {row.map((square, x) => {
                    if (invalidCombination) {
                        return <div key={x} style={{filter: "hue-rotate(300deg)"}} className="discoSquare">
                            <img src={empty} alt="Empty" />
                        </div>
                    }
                    const squareScore = getSquareScore(square, animalWeights, animalInvertConstant);
                    const squareKnown = Object.values(knownTiles).some(animalPoints => animalPoints.some(p => p.x === x && p.y === y));
                    return <div key={x} onClick={(e) => {getPossibleTiles(e, x, y)}} style={{filter: "brightness(" + (squareKnown ? "1" : "0.5") + ")"}} className="discoSquare">
                        {Object.keys(square).sort((a, b) => square[b] - square[a] || a.localeCompare(b)).map(animal => {
                            return <img key={animal} style={{width: 100 * square[animal] / gridNumber + "%"}} alt={animal} src={require("./imgs/" + animal + ".png").default} />
                        })}
                        {!squareKnown && <div className="discoZooCentered"><b style={{color: getColor((squareScore - minScore) / (maxScore - minScore))}}>{Math.round(squareScore)}</b></div>}
                    </div>
                })}
                </div>
            })}
            {invalidCombination && <div className="discoZooCentered"><b style={{color: "mediumspringgreen"}}>Invalid animal combination</b></div>}
        </div><br />
        <div className="discoToggle">
            <label className="switch">
                <input type="checkbox" checked={useTurns} onChange={(e) => {setUseTurns(e.target.checked)}} />
                <span className="slider round"></span>
            </label>
            Take remaining turns into account
        </div>
        <div className="discoAnimalSelection">
            {Object.keys(animalInfo.area).map((area, i) => {
                return (dropDown === i || dropDown === -1) && <div key={i}>
                    <h1 onClick={() => toggleDropDown(i)}>{area}</h1>
                    {dropDown === i && <div>
                        {animalInfo.area[area].map((animal, key) => {
                            return <div className="discoAnimalC" key={key}>
                                <img alt={animal} src={require("./imgs/" + animal + ".png").default} onClick={() => {addAnimal(animal)}} style={{cursor: Object.getOwnPropertyNames(animals).includes(animal) ? "" : "pointer"}} />
                                {Object.getOwnPropertyNames(animals).includes(animal) && <div className="discoSelectedSplit">
                                    <input className="discoInput" value={animals[animal]} onChange={(e) => {updateAnimal(animal, e.target.value)}} type="number" min="0" max="50"/>
                                    <br />
                                    <span onClick={() => removeAnimal(animal)}>Remove</span>
                                </div>}
                            </div>
                        })}
                    </div>}
                </div>
            })}
        </div>
    </div>
}

export default DiscoZoo;
