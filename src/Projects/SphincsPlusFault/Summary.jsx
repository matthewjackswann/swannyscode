import photo from "./Media/treeGraftSmall.svg";

function Summary() {
    return (<div>
        <h2 className="text-2xl">SPHINCS+ Simulated Fault Injection</h2>
        <img className="mx-auto w-full max-h-96 object-cover rounded-lg dark:invert p-4 bg-slate-500 bg-opacity-10" alt="SPHINCS fault injection" src={photo}/>
        <p>
            SPHINCS+ is a quantum resistant signature scheme. In "Practical Fault Injection Attacks on SPHINCS" Genêt, <span className="whitespace-nowrap">J. Kannwischer</span>, Pelletier, and McLauchlan outlined a fault injection attack on SPHINCS (which was the precursor to SPHINCS+). They outlined how the attack could be adapted to work for SPHINCS+, and as part of my Advanced Cryptography module, I implemented the attack.
        </p>
    </div>);
}

export default Summary;