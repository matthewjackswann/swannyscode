import photo from "./Media/swannyscode.png";

function Summary() {
    return (<div>
        <img className="mx-auto w-full max-h-96 object-cover rounded-lg" alt="rotating pipe game" src={photo}/>
        <h2 className="text-2xl">Mayo Signatures security proof (Dissertation)</h2>
        <p>
            My Dissertation, proving a bound on the security of Mayo Signatures, a post quantum signature scheme looking to be standardised by NIST.
            This proof disproves the existing proof and re-proves it with a tighter bound, showing security in the random oracle model against classical (non-quantum attacks).
        </p>
    </div>);
}

export default Summary;