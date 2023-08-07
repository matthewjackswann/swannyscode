import pipeGameExample from "./Media/examplePipes1.png";
import fixingPipes from "./Media/examplePipes2.png";
import fourWayPipe from "./Media/examplePipes3.png";
import algorithmExample from "./Media/example1.png";
import algorithmExampleUnfixed from "./Media/example1unfixed.png";
import reduceImagePhoto from "./Media/reduceImageExample.png";
import pipeProcessorFlowchart from "./Media/pipeProcessorFlowchart.png";
import pipeStateExample from "./Media/pipeStateExample.png";
import rotationMapImage from "./Media/rotationMaps.png";
import animation1 from "./Media/animation1.gif";
import animation2 from "./Media/animation2.gif";
import animation3 from "./Media/animation3.gif";
import animation4 from "./Media/animation4.gif";
import InPageLink from "../../Components/InPageLink";
import ImageSwapper from "../../Components/ImageSwapper";
import CodeSnippet from "../../Components/CodeSnippet";
import { PuzzleramaSol1Code, PuzzleramaSol2Code, PuzzleramaSubmitCode } from "./Media/Code";

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
                <ul className="list-disc pl-8">
                    {[
                        ["The Algorithm", "pipes1Algorithm"],
                        ["Preprocessing the grid", "pipes1Processing"],
                        ["The Grid", "pipes1Grid"],
                        ["Simulating Flow", "pipes1Simulation"],
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

        <CodeSnippet className="my-2" code={PuzzleramaSol1Code} />

        <div className="md:flex justify-center">
            <img className="m-auto p-3" src={fourWayPipe} alt="pipe game" />
            <p className="md:my-auto pb-2">
                This works really well for earlier puzzles where there are no pipes which can have multiple valid rotations. However, when the pipe can have multiple valid rotations it is effectively ignored by the algorithm and is unlikely to already be in the correct orientation.
                To fix this I used a brute force approach where a rotation is assumed to be correct. When the unFixed list is empty it returns if the grid is solved or not. This means that after the assumption is made if the recursive call returns true then the assumption is correct. If not then the next assumption is tested.
                When rotating pipes after a wrong assumption their state doesn't need to be reset as their current rotation has no effect on the final picked rotation.
            </p>
        </div>

        <CodeSnippet className="my-2" code={PuzzleramaSol2Code} />

        <p className="pb-2">
            To try and better show the algorithm I've made a simple example image to show how the algorithm would try and solve this made up puzzle.
        </p>

        <ImageSwapper className="w-full max-w-4xl mx-auto" srcs={[algorithmExample, algorithmExampleUnfixed]} alt="flowchart of how the algorithm works" />
        <br />

        <h2 className="text-4xl" id="pipes1Processing">Preprocessing The Grid</h2>
        <br />

        <p className="pb-2">
            This section is about how to program takes a screenshot and turns it into a grid of pipes which can then be solved. This is done in a few steps, each time removing redundant data until only the required information is left. This is then used to create the grid object which can be solved using the above algorithm.
        </p>

        <p className="pb-2">
            Initially a <i>RestrictedRobot</i> object is passes into the <i>PipeProcessor</i> to get the state of the current grid. The <i>RestrictedRobot</i> is a proxy class of <i>Robot</i> where only a small section of the screen can be viewed / controlled. This is used to take a screen capture of the grid which is passed on for processing.

            The capture is passed into a function <i>reduceImage()</i> which applies a filter to the capture. It also crops the image so that only the pipes are shown and also calculates the bounds of the new reduced image.
        </p>

        <img src={reduceImagePhoto} className="border-solid border-2 border-accent dark:border-accent-dark cc" alt="Example of how the screen capture is modified by the reduceImage() function" />

        <p className="pb-2">
            The image returned from this is then put into two functions, <i>getSplits()</i> and <i>getSquares()</i>.
        </p>
        <p>
            <i>getSplits()</i> creates two lists, one for the x direction, one for the y direction. Each list is made up of a pair, the first being the coordinate and the second being the length of that square in that direction.
        </p>
        <p className="pb-2">
            <i>getSquares()</i> then calculates the cartesian product between the two lists. This allows all the squares in the grid to be found which are iterated through to get the sub-images of each pipe.
        </p>

        <br />

        <p>
            The list of pipe images are converted into pipe objects by sampling the image at specific points. The middle of each edge is sampled to test for the number of connections and which direction they are facing.
        </p>

        <ul className="list-disc pl-8">
            <li>
                If there is only one connection then the percentage of the pipe which is the background colour is calculated. If this is greater then 35% then the pipe is a sink, otherwise it must be a tap. The colour is calculated by picking the pixel in the centre and matching it to the closes predefined pipe colour.
            </li>
            <li>
                If there are two or three connections then a standard connector object is created. By including the directions the type and orientation of the pipe is unambiguous.
            </li>
            <li>
                If there are four connections then the pipe is either a cross or the double-bend pipe. The center of the pipe is checked to determine if the pipe is a cross, if not then only the rotation of the double-bend needs to be worked out. This is done by splitting the pipe into quarters and counting the number of background pixels in each segment. The two most populated quarters should be opposite each other and correspond to the rotation of the pipe.
            </li>
        </ul>

        <p>
            These objects are then combined with the sub-image center so that after solving the <i>RestrictedRobot</i> can enter the solution into the puzzle
        </p>
        
        <p className="pb-2">
            Here is a flowchart of the sub-image identification proccess
        </p>

        <img src={pipeProcessorFlowchart} className="mx-auto border-2 boarder-solid cc border-accent dark:border-accent-dark" alt="flowchart of how the pipe preprocessor distinguishes pipes"/>
        <br />

        <h2 className="text-4xl" id="pipes1Grid">The Grid</h2>
        <br />

        <p>
            To understand how the grid works it's first important to understand the pipes which make up the grid. There are three types of pipe (<i>connector</i>, <i>tap</i> and <i>sink</i>) which each have their own class but are children of the abstract <i>pipe</i> class. Each also utilises a class called <i>PipeState</i> which keeps track of the colour of each pipe.
        </p>

        <br />

        <h4 className="text-2xl font-bold pb-2">Pipe State</h4>

        <p className="pb-2">
            The <i>PipeState</i> is used to keep track of the colour of each pipe and is very basic. It stores a <i>PipeColour</i> called state, a default state it should be at the start of a simulation, and a list of <i>PipeDirections</i> called connecting, which are the directions that the segment of pipe is connected to. When the <i>reset()</i> method is called the state is set to the default state and when the <i>update(PipeColour colour)</i> is called the state is set to the combination of the state colour and the new colour. It doesn't seem very important but is used massively when simulating the grid.
        </p>

        <img src={pipeStateExample} className="w-full pb-6" alt="a example of how pipe states are used within pipes"/>

        <h4 className="text-2xl font-bold pb-2">Abstract Pipe</h4>

        <p>
            The abstract class <i>Pipe</i> contains functions that all other pipes must implement in some way. These are:
        </p>

        <ul className="list-disc pl-8">
            <li>
                <span className="font-semibold">center</span> - the location of the pipe in the screen capture. This is used by the robot to move the mouse in order to rotate the pipe.
            </li>
            <li>
                <span className="font-semibold">adjacentPipes</span> - this is a map of <i>PipeDirection</i> to <i>Pipe</i>, so that a pipe can call methods on it's surrounding pipes.
            </li>
            <li>
                <span className="font-semibold">maxRotation</span> - this is the maximum number of times a pipe can rotate before returning to its initial state.
            </li>
            <li>
                <span className="font-semibold">setRotation(int x)</span> - this is used to set the rotation of a pipe.
            </li>
            <li>
                <span className="font-semibold">getValidRotations(List{"<Pipe>"} unFixed)</span> - this takes a list of unFixed pipes and returns a list of rotations where it is correctly connected to fixed adjacent pipes.
            </li>
            <li>
                <span className="font-semibold">update(PipeDirection d, PipeColour colour)</span> - updates the pipe as if connected to another pipe of colour <i>colour</i> in direction <i>d</i>. I'll talk about how this works for each pipe later in the Simulating The Grid section.
            </li>
            <li>
                <span className="font-semibold">reset()</span> - used before a simulation and ensures a pipe is not effected by the colours from a previous simulation.
            </li>
            <li>
                <span className="font-semibold">isSatisfied()</span> - used to ensure the pipe is included when checking if solved. e.g <i>Sinks</i> should be their target colour and <i>Connectors</i> shouldn't be clear.
            </li>
            <li>
                <span className="font-semibold">getConnections()</span> - returns the list of directions the pipe is connected to. This is used to check if two neighboring pipes share the same connection (both pipes connected or both pipes disconnected).
            </li>
        </ul>

        <br />

        <h4 className="text-2xl font-bold pb-2">Connector Pipe</h4>

        <p className="pb-2">
            The <i>Connector</i> is the most complicated out of the pipes as it is the only one able to rotate. It has a <i>PipeState</i> for each separate segment of pipe within the pipe (two for the Double-Bend, one for the rest) and a <i>rotationMaps</i> for keeping track of the pipes rotation.
        </p>

        <p className="pb-4">
            Instead of changing all the directions stored in the object each time it is rotated, they are all kept constant and a bidirectional map is used to keep track of rotations.
        </p>

        <img src={rotationMapImage} className="w-full max-w-4xl mx-auto border-solid border-2 border-accent dark:border-accent-dark cc" alt="a example of how the rotation maps keep track of rotation"/>

        <p className="pt-4 pb-2">
            When the pipes <i>rotate()</i> method is called, it's current rotation is increased by one (modulo maxRotation) and the <i>rotationMap</i> is updated to reflect the changes. Once done, all other functions work exactly the same and the pipe is rotated, despite the central <i>PipeStates</i> of the pipe not being changed at all.
        </p>

        <p className="pb-6">
            The pipes <i>reset()</i> method just resets all associated <i>PipeStates</i> and it's <i>isSatisfied()</i> method checks that all <i>PipeStates</i> are not clear and not invalid. Finally the <i>getConnections()</i> method takes the connections of the <i>PipeStates</i> and puts them through the <i>rotationMap</i> to get the list of directions the pipe (in its current rotation) is connected to.
        </p>

        <h4 className="text-2xl font-bold pb-2">Sink Pipe</h4>

        <p className="pb-4">
            The sink pipe is a lot simpler as it doesn't have to rotate. It has a single <i>PipeState</i>, a target colour and is only connected in one direction. For its <i>isSatisfied()</i> method checks if the colour of the pipe state is the same as the target colour.
        </p>

        <h4 className="text-2xl font-bold pb-2">Tap/Source Pipe</h4>

        <p className="pb-2">
            The sink pipe is a lot simpler as it doesn't have to rotate. It has a single <i>PipeState</i>, a target colour and is only connected in one direction. For its <i>isSatisfied()</i> method checks if the colour of the pipe state is the same as the target colour.
        </p>

        <h4 className="text-2xl font-bold pb-2">Null Pipe</h4>

        <p className="pb-4">
            The null pipe is a default pipe all other pipes are connected to before they are placed in the grid. It represents the borders of the grid and any blank squares within the grid. Its <i>isSatisfied()</i> method always returns true and has no connections.
        </p>

        <h3 className="text-3xl pb-2">Constructing The Grid</h3>

        <p>
            The grid is constructed using the list of pipes and arranging them into a 2D array. Each pipe also has its <i>adjacentPipes</i> updated. This leaves pipes on the edge of the grid with one or more <i>adjacentPipes</i> being the null pipe and prevents pipes pointing out of the grid as a valid solution. While it does this it also puts any source/tap pipes into the <i>sources</i> list. This is used when the grid has to be simulated.
        </p>

        <br /><br />

        <h2 className="text-4xl" id="pipes1Simulation">Simulating The Grid</h2>
        <br />

        <p>
            The grid has a method called <i>simulate()</i>. When called this returns true or false depending on whether or not the pipes allow the water to flow correctly between them and sinks are not the wrong colour. To start the simulation the <i>update()</i> method is called on all of the sources. This starts a chain reaction of updating the neighboring pipes until one returns false or all simulate correctly, returning true.
        </p>

        <ul className="list-disc pl-8">
            <li>
                <b>Connectors</b>
                <ul className="list-sublist pl-8">
                    <li>
                        When a connector is updated if first checks the direction it is being updated from is valid, false is returned if it is not, ending the simulation.
                    </li>
                    <li>
                        If it is valid then it checks if the pipes state is already the colour it is trying to be updated to, this prevents infinite loops but isn't an issue so true is returned.
                    </li>
                    <li>
                        If not then the state is updated with the new colour. This is done by adding the states current colour to the new one. This allows colours to be mixed which is used in the later levels. If the combination of colours is invalid then false is returned.
                    </li>
                    <li>
                        Once the connectors state has updated successfully, it goes on to update all pipes which are associated with the updated pipe state. If any of these return false, then later on down the pipe there is an issue, so the connector also returns false, else everything is fine and true is returned.
                    </li>
                </ul>
            </li>
            <li>
                <b>Taps/Sources</b>
                <p>
                    As taps are what start the update chain they don't have much functionality at all. When updated they always return true. Though it seems surprising that they could be updated more then once it can happen for multiple reasons:
                </p>
                <ul className="list-sublist pl-8">
                    <li>
                        The connector directly next to the tap updates all surrounding pipes when it is updated. This includes the tap pipe.
                    </li>
                    <li>
                        If another tap has been updated before this tap then its chain of updates could easily lead to this tap.
                    </li>
                    <li>
                        If a mix of colours has happened then all the pipes in a chain will update, leading back to the tap.
                    </li>
                </ul>
            </li>
            <li>
                <b>Sinks</b>
                <p>
                    When the sinks are updated only the colour and direction needs to be checked.
                </p>
                <ul className="list-sublist pl-8">
                    <li>
                        If the direction is not the <i>inDirection</i> then false is returned. This is for the case when a pipe is pointing into the wrong side of a sink.
                    </li>
                    <li>
                        If it's connected correctly direction then the colour is checked to see if it is a component colour of its target colour. For example, if the target colour is orange then if the sink is updated with the colour red it must return true. Though this isn't it's target colour it may later be updated with the colour green, which combines to make the pipe orange, satisfying the condition.
                    </li>
                </ul>
            </li>
        </ul>

        <p className="py-3">
            To better illustrate this I have made some gifs showing how the call updates all the connected pipes.
        </p>

        <div className="block sm:flex w-2/3 mx-auto" style={{"background":"#445563"}}>
            <img className="w-full sm:w-1/2" src={animation1} alt="a example of how the simulate function works"/>
            <img className="w-full sm:w-1/2" src={animation2} alt="a example of how the simulate function works"/>
        </div>
        <div className="block sm:flex w-2/3 mx-auto" style={{"background":"#445563"}}>
            <img className="w-full sm:w-1/2" src={animation3} alt="a example of how the simulate function works"/>
            <img className="w-full sm:w-1/2" src={animation4} alt="a example of how the simulate function works"/>
        </div>

        <p className="pt-4">
            Finally, the grid has one more important method called <i>solved()</i>. This first simulates the grid to ensure all connections are working fine and then checks every pipe is satisfied. If these are both true then the grid is solved.
        </p>

        <br />

        <h2 className="text-4xl" id="pipes1Instructions">Entering The Correct Answer</h2>
        <br />

        <p className="pb-3">
            When solving the puzzles the limiting factor in terms of time isn't actually solving it but entering the solution afterwards. This is because when a pipe is rotated, an animation is played and no more inputs can be taken. This means that each puzzle is time bound by the minimum number of rotations needed in order to solve it. In order to reduce the time taken it's important to start inputting the solution as soon as possible and not waiting till after the grid is fully solved. (In these puzzles it doesn't really make much difference but in larger or more complicated ones it might be more noticeable. I could have skipped this realistically but it was interesting to do anyway).
        </p>

        <p className="pb-3">
            To do this the program uses multithreading. A second thread is started and in charge of entering the correct answer. Instructions are passed to it from the main thread while the grid is still being solved. Each instruction is made up of three parts: a pipe which is to be rotated, a target rotation, and an <i>AtomicBoolean</i> flag which indicates if the instruction is valid or not.
        </p>

        <p className="pb-3">
            The reason for this valid flag is because when solving with the algorithm wrong assumptions are often made. We want the move to be made if it is correct but we don't know until later on if it is correct or not. To avoid unnecessary rotations each assumption is given a valid flag and if the assumption is found to be incorrect then the flag is changed and the instruction is discarded.
        </p>

        <p className="pb-3">
            The controller also keeps track of each pipes rotation so if an invalid instruction is processed then the next instruction given for that pipe will take the previous one into account.
        </p>

        <p>
            This second thread continues to run until it receives a null instruction (with the target pipe being the null pipe). This happens when the grid has been fully solved as the first thread puts the termination instruction into the queue and waits for the second thread to finish processing.
        </p>

        <br />

        <p>The following code has been reduced slightly for simplicity</p>

        <CodeSnippet className="my-2" code={PuzzleramaSubmitCode} />
        
        <br />

        <p>
            That concludes everything I'm going to write about on Pipes 1.<br />Thanks for reading!
        </p>

    </div>);
}

export default Pipes1;