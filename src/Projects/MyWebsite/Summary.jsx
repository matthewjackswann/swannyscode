import photo from "./Media/swannyscode.png";

function Summary() {
    return (<div>
        <img className="mx-auto w-full max-h-96 object-cover rounded-lg" alt="rotating pipe game" src={photo}/>
        <h2 className="text-2xl">My Website</h2>
        <p>
            Creating my website so that I can upload projects that I'm currently working on.
        </p>
    </div>);
}

export default Summary;