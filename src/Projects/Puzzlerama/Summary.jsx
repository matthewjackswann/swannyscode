import photo from "./puzzlerama.png"

function Pipes() {

    return (<div>
        <img className="mx-auto w-full max-h-96 object-cover rounded-lg" alt="rotating pipe game" src={photo}/>
        <h2 className="text-2xl">Puzzlerama - Pipes</h2>
        <p>
            Recently I have found myself on lots of trains going to and from university.
            To pass the time I have spent too much time on apps such as Puzzlerama where you solve a variety of
            puzzles and naturally also thought of different algorithms to solve these a lot faster then I can.
        </p>
    </div>)
}

export default Pipes;