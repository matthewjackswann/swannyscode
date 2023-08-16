import Pipes1 from "./Pipes1";

function Puzzlerama() {
    return (<div>
        <h1 className="text-5xl">Puzzlerama</h1>

        <p className="pb-4">August 7, 2021</p>

        <p className="pb-2">
            Recently I have found myself on lots of trains going to and from university. To pass the time I have spent too much time on apps such as Puzzlerama where you solve a variety of puzzles and <i>naturally</i> also thought of different algorithms to solve these a lot faster then I can.
        </p>
        <p className="pb-2">
            Currently I only have a solver for pipes 1 but I might come back and create some more when I run out of other projects to work on (though this isn't that likely)
        </p>
        <p className="pb-2">
            All the source code is linked on <a className="tc underline hover:text-primary dark:hover:text-primary-dark" href="https://github.com/matthewjackswann/puzzlerama">github</a>
        </p>

        <br /><hr /><br />

        <Pipes1 />

    </div>)
}

export default Puzzlerama;