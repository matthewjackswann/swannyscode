import { PhotoProvider, PhotoView } from "react-photo-view";
import diss from "./Media/Mayo_Proof_MS_Final.pdf";
import poster from "./Media/mayo_poster.png";
import Latex from "react-latex-next";

function Content() {
    return (<div>
        <h1 className="text-5xl">Mayo Signatures security proof</h1>

        <p className="pb-4">Match 31, 2025 (Completed May 9, 2024, but I was slow updating)</p>

        <p className="pb-4">
            My Dissertation, proving a bound on the security of Mayo Signatures, a post quantum signature scheme looking to be standardised by NIST.
            This proof disproves the existing proof and re-proves it with a tighter bound, showing security in the random oracle model against classical (non-quantum attacks). This project was recognised with the Best MEng Project award with an overall mark of 88.
            Initially the project's aim was to formally prove (hence the bow-tie in the poster) the security in the (not so easy) EasyCrypt proof assistant. However due to ambiguity in the existing proof and my lack of EasyCrypt experience, the project was changed to focus on more clearly defining the proof. Hopefully this will be a stepping stone for future work for someone with experience of EasyCrypt.
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
                Proves that the optional randomisation value <Latex>{`$R$`}</Latex> has no effect on the security bound in the random oracle model, simplifying further proofs.
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

        <div className="m-8">
            <PhotoProvider maskOpacity={0.95} bannerVisible={false}>
                <PhotoView src={poster} >
                    <img alt="poster day poster" src={poster} />
                </PhotoView>
            </PhotoProvider>
        </div>
    </div>);
}

export default Content;