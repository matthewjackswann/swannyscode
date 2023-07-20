import photo from "./Media/example2.png"

function Summary() {
    return (<div>
        <img className="mx-auto w-full max-h-96 object-cover rounded-lg" alt="rotating pipe game" src={photo}/>
        <h2 className="text-2xl">Wordle Solver</h2>
        <p>
            Over Christmas my mum played a lot of wordle so I tried to make a program that could beat her.
        </p>
    </div>);
}

export default Summary;