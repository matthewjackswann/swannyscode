import cubeImg from "./Media/cube.png"

function Summary() {

    return (<div>
        <img className="mx-auto w-full max-h-96 object-cover rounded-lg" alt="a rubik's cube" src={cubeImg}/>
        <h2 className="text-2xl">Rubik's Cube Solver</h2>
        <p>
            Part of a Rubik's cube solver I've been working on. It uses a meet in the middle style to solving the cube in the minimal number of moves.
        </p>
    </div>);
}

export default Summary;