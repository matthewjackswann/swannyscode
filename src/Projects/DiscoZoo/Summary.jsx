import photo from "./Media/summary.png";

function Summary() {

    return (<div>
        <img className="mx-auto w-full max-h-96 object-cover rounded-lg" alt="rotating pipe game" src={photo}/>
        <h2 className="text-2xl">Disco Zoo</h2>
        <p>
            When my internet went down I decided to revisit an old project that I never finished, to find a way of maximizing the money made in the Disco Zoo game.
        </p>
    </div>);
}

export default Summary;