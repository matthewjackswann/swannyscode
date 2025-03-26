import diss from "./Media/Mayo_Proof_MS_Final.pdf"

function Content() {
    return (<div>
        <h1 className="text-5xl">Mayo Signatures security proof</h1>

        <p className="pb-4">todo date</p>

        <p className="pb-4">
            My Dissertation, proving a bound on the security of Mayo Signatures, a post quantum signature scheme looking to be standardised by NIST.
            This proof disproves the existing proof and re-proves it with a tighter bound, showing security in the random oracle model against classical (non-quantum attacks).
        </p>

        <h2 className="text-3xl">TLDR</h2>
        <ul className="list-disc pl-8">
            <li>
                Explains the threat quantum computers have on current cryptography and the motivation to develop post-quantum cryptography.
            </li>
            <li>
                Describes how Mayo Signatures work and why they are thought to be quantum resistant.
            </li>
            <li>
                Proves that the optional randomisation value TODO has no effect on the security bound in the random oracle model, simplifying further proofs.
            </li>
            <li>
                Disproves the current EUF-CMA to EUF-KOA reduction and fixes it while proving a considerably tighter bound. This is done by making a series of small changes to a program, showing they're indistinguishable except with small probability until the chosen message is fully removed (The CM from EUF-CMA)
            </li>
            <li>
                Describes the EUF-KOA proof from the Mayo team and presents it as a series of programs.
            </li>
            <li>
                Outlines a proof for SUF-CMA security. This introduces a new hardness assumption, which is proven to be required for Mayo to ever achieve SUF-CMA security.
            </li>
        </ul>
        
        <embed src={diss} type="application/pdf" className="pt-8 mx-auto aspect-square h-full w-full" width= "1080" height= "1080" />


    </div>);
}

export default Content;