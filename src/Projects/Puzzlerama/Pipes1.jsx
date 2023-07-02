import pipeGameExample from "./Media/examplePipes1.png";
import fixingPipes from "./Media/examplePipes2.png";
import fourWayPipe from "./Media/examplePipes3.png";
import algorithmExample from "./Media/example1.png";
import algorithmExampleUnfixed from "./Media/example1unfixed.png";
import InPageLink from "../../Components/InPageLink";
import ImageSwapper from "../../Components/ImageSwapper";

function Pipes1() {
    return (<div>
        <h1 className="text-5xl">Pipes solver</h1>
        <br />

        <div className="md:flex justify-center">
            <div>
                <p className="pb-2">
                    The pipes puzzle is a puzzle where a grid of pipes must be rearranged so that the Taps/Sources are
                    connected to the Sinks of the same colour. Only the connecting pipes can be rotated and all must be
                    used for the puzzle to be solved.
                </p>
                <p className="pb-2">
                    Currently the program will take a screen capture, solve the problem, and then click on the correct 
                    pipes to rotate them into a solution.
                </p>
                <p className="pb-2">
                    I will go into detail on specific parts of the program but skip over other <i>not so interesting </i>
                    parts. Because of this I have split the explanation down into different sections:
                </p>
                <ul className="list-disc pl-6">
                    {[
                        ["The Algorithm", "pipes1Algorithm"],
                        ["Processing the grid", "pipes1Processing"],
                        ["How the grid works", "pipes1Grid"],
                        ["Entering the correct answer", "pipes1Instructions"]
                    ].map(([label, l]) => <li key={l}>
                        <InPageLink className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark cursor-pointer" to={l}>{label}</InPageLink>
                    </li>)}
                </ul>                    
            </div>
            <img className="m-auto p-3" src={pipeGameExample} alt="pipe game" />
        </div>
        <br />

        <h2 className="text-4xl" id="pipes1Algorithm">The Algorithm</h2>
        <br />

        <p className="pb-2">
            For the algorithm I decided to use a brute force approach with pruning. As all pipes must be connected for a grid to be solved, a lot of pipes can have their rotation set and are not considered when trying all combinations.
        </p>

        <img src={fixingPipes} className="w-full p-5" alt="a section of a grid of pipes to show how the first part of the algorithm could be applied" />

        <p className="pb-2">
            In the above image, out of the two possible rotations pipe <b>A</b> can be in, only one is valid. In the other rotation, the pipe will point off the grid and be invalid. As there is the only possible rotation it can be treated as immovable. This allows us to deduce that <b>B</b> can only have one valid rotation as otherwise <b>B</b> will point into the side of <b>A</b> making it invalid. This can be continued throughout the shown section until every pipe is in the correct rotation, even without being able to see any Taps or Sinks.
        </p>

        <p className="pb-2">
            We use this logic in the first part of the algorithm, which fixes pipes by ensuring they are properly connected to any surrounding fixed pipes. This can only be done if there is only one valid rotation for the pipe. The algorithm requires a view of the grid and a list of unfixed pipes. Each recursive call it removes pipes from the unfixed pipes list.
        </p>

        <br />todo code<br /><br />

        <div className="md:flex justify-center">
            <img className="m-auto p-3" src={fourWayPipe} alt="pipe game" />
            <p className="md:my-auto pb-2">
                This works really well for earlier puzzles where there are no pipes which can have multiple valid rotations. However, when the pipe can have multiple valid rotations it is effectively ignored by the algorithm and is unlikely to already be in the correct orientation.
                To fix this I used a brute force approach where a rotation is assumed to be correct. When the unFixed list is empty it returns if the grid is solved or not. This means that after the assumption is made if the recursive call returns true then the assumption is correct. If not then the next assumption is tested.
                When rotating pipes after a wrong assumption their state doesn't need to be reset as their current rotation has no effect on the final picked rotation.
            </p>
        </div>

        <br />todo code<br /><br />

        <p className="pb-2">
            To try and better show the algorithm I've made a simple example image to show how the algorithm would try and solve this made up puzzle.
        </p>

        <ImageSwapper className="w-full max-w-4xl mx-auto" srcs={[algorithmExample, algorithmExampleUnfixed]} alt="flowchart of how the algorithm works" />
        <br />

        <h2 className="text-4xl" id="pipes1Processing">Processing The Grid</h2>
        <br />

        <p className="pb-2">
            This section is about how to program takes a screenshot and turns it into a grid of pipes which can then be solved. This is done in a few steps, each time removing redundant data until only the required information is left. This is then used to create the grid object which can be solved using the above algorithm.
        </p>

        <p className="pb-2">
            Initially a <i>RestrictedRobot</i> object is passes into the <i>PipeProcessor</i> to get the state of the current grid. The <i>RestrictedRobot</i> is a proxy class of <i>Robot</i> where only a small section of the screen can be viewed / controlled. This is used to take a screen capture of the grid which is passed on for processing.

            The capture is passed into a function <i>reduceImage()</i> which applies a filter to the capture. It also crops the image so that only the pipes are shown and also calculates the bounds of the new reduced image.
        </p>

        <br />todo image<br /><br />

        <p className="pb-2">
            The image returned from this is then put into two functions, <i>getSplits()</i> and <i>getSquares()</i>. The result of this is two lists, one for the x direction, one for the y direction. Each list is made up of a pair, the first being the coordinate and the second being the length of that square in that direction. By doing the cartesian product between the two lists allows all the squares in the grid to be found. These are iterated through to get the sub-images of each pipe.
        </p>
        
    </div>);
}

export default Pipes1;