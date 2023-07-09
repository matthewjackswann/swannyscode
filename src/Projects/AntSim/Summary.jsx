import photo from "./Media/basicAnt.png"

function Summary() {
    return (<div>
        <img className="mx-auto w-full max-h-96 object-cover rounded-lg" alt="rotating pipe game" src={photo}/>
        <h2 className="text-2xl">Ant Simulation</h2>
        <p>
            After seeing so many of ant colony simulations on youtube I decided to practice my C programming and make a simple food gathering simulation.
        </p>
    </div>);
}

export default Summary;