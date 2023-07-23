import diff1 from "./Media/ArtHack2023/diff1.png";
import diff2 from "./Media/ArtHack2023/diff2.png";
import diff3 from "./Media/ArtHack2023/diff3.png";
import diff4 from "./Media/ArtHack2023/diff4.png";
import piano from "./Media/ArtHack2023/piano.mp4";

function ArtHack() {

    return (<div>
        <p>
            As 2nd term was very busy this year, we set out to create a simple interactive piano. Using a projector and a camera, we tracked when keys were pressed and played the correct note. We ended up winning the "Most Interactive" category in the competition.
        </p>

        <p className="pt-2">
            By taking photos at a regular interval we compared the change since the previous. By thresholding and applying filters we could reduce these to a single point of interaction. This point was then mapped onto the correct note of the piano (using open cv to identify each region of the image each not occupied) and the key was played out loud.
        </p>

        <p className="py-4">
            Here is a selection of photos created when testing the change in image function:
        </p>

        <img className="inline p-2 rounded-md w-full sm:w-1/2" src={diff1} alt="difference between two images" />
        <img className="inline p-2 rounded-md w-full sm:w-1/2" src={diff2} alt="difference between two images" />
        <img className="inline p-2 rounded-md w-full sm:w-1/2" src={diff3} alt="difference between two images" />
        <img className="inline p-2 rounded-md w-full sm:w-1/2" src={diff4} alt="difference between two images" />

        <p className="py-4">
            Videos of the piano:
        </p>

        <video src={piano} className="mx-auto" controls />
    </div>);
}

export default ArtHack;