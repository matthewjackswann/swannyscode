import image1 from "./examplePipes1.png";
import image2 from "./examplePipes2.png";
import image3 from "./examplePipes3.png";
import example from "./example1.png";
import exampleUnfixed from "./example1unfixed.png";
import reduceImagePhoto from "./reduceImageExample.png";
import pipeProcessorFlowchart from "./pipeProcessorFlowchart.png";
import rotationMapImage from "./rotationMaps.png";
import pipeStateExample from "./pipeStateExample.png";
import animation1 from "./animation1.gif";
import animation2 from "./animation2.gif";
import animation3 from "./animation3.gif";
import animation4 from "./animation4.gif";
import {Link} from "react-scroll";
import { useState } from "react";

const Component = () => {
    const [pipeImageStyles, setPipeImageStyles] = useState([{}, {display: "none"}]);
    const toggleImage = () => setPipeImageStyles(old => [old[1], old[0]]);
    return (
        <div id="pipes1">
            <h1>Pipes 1 Solver</h1>
            <p>August 7, 2021</p><br />
            <div className="split">
                <div className="text">
                    <p>
                        The pipes puzzle is a puzzle where a grid of pipes must be rearranged so that the Taps/Sources are
                        connected to the Sinks of the same colour. Only the connecting pipes can be rotated and all must be
                        used for the puzzle to be solved.
                    </p>
                    <p>
                        Currently the program will take a screen capture, solve the problem, and then click on the correct 
                        pipes to rotate them into a solution.
                    </p><br />
                    <p>
                        I will go into detail on specific parts of the program but skip over other <i>not so interesting </i>
                        parts. Because of this I have split the explanation down into different sections.
                    </p>
                    <ul>
                        <li><Link to="pipes1Algorithm" spy={true} smooth={true}>The Algorithm</Link></li>
                        <li><Link to="pipes1Processing" spy={true} smooth={true}>Processing the grid</Link></li>
                        <li><Link to="pipes1Grid" spy={true} smooth={true}>How the grid works</Link></li>
                        <li><Link to="pipes1Instructions" spy={true} smooth={true}>Entering the correct answer</Link></li>
                    </ul>                    
                </div>
                <img src={image1} alt="example of the pipes puzzle" />
            </div><br />
            {/* <p>For a video showing the program solve all but the first level of Pipes 1 visit: //todo link</p> */}
            <br />
            <h2 id="pipes1Algorithm">The Algorithm</h2><br />
            <p>
                For the algorithm I decided to use a brute force approach with option elimination. 
                As all pipes must be connected for a grid to be solved a lot of pipes can have their 
                rotation set and are not considered when brute forcing.
            </p>
            <img src={image2} alt="a section of a grid of pipes to show how the first part of the algorithm could be applied" />
            <p>
                In the above image, out of the two possible rotations pipe <b>A</b> can be in, only one is valid
                because otherwise the pipe will point off the grid and be invalid.
                As this is the only possible rotation it can not be treated as immovable. This allows us to
                deduce that <b>B</b> can only have one valid rotation as otherwise <b>B</b> will point into
                the side of <b>A</b> making it invalid. This can be continued throughout the shown section 
                until every pipe is in the correct rotation, even without being able to see any Taps or Sinks.
            </p>
            <p>
                We use this logic in the first part of the algorithm, which fixes pipes by ensuring they
                are properly connected to any surrounding fixed pipes. This can only be done however if 
                there is only one valid rotation for the pipe. For its input it takes a list of all pipes which 
                can be rotated and have a rotational symmetry less then four.
            </p>
            <pre className="code"><code><span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>private</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>boolean</span><span style={{color: 'rgb(56, 58, 66)'}}> solve</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(166, 38, 164)'}}>List</span><span style={{color: 'rgb(56, 58, 66)'}}>&lt;</span><span style={{color: 'rgb(166, 38, 164)'}}>Point2D</span><span style={{color: 'rgb(56, 58, 66)'}}>&gt;</span><span style={{color: 'rgb(56, 58, 66)'}}> unFixed</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>if</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>unFixed</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>isEmpty</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>return</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(64, 120, 242)'}}>solved</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} used for recursive call, if everything is fixed return if it is solved</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>boolean</span><span style={{color: 'rgb(56, 58, 66)'}}> partFixed </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>true</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>while</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>partFixed</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} while at least one pipe was fixed the previous iteration</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>partFixed </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>false</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>List</span><span style={{color: 'rgb(56, 58, 66)'}}>&lt;</span><span style={{color: 'rgb(166, 38, 164)'}}>Pipe</span><span style={{color: 'rgb(56, 58, 66)'}}>&gt;</span><span style={{color: 'rgb(56, 58, 66)'}}> toFix </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>new</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>ArrayList</span><span style={{color: 'rgb(56, 58, 66)'}}>&lt;</span><span style={{color: 'rgb(56, 58, 66)'}}>&gt;</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(166, 38, 164)'}}>Pipe</span><span style={{color: 'rgb(56, 58, 66)'}}> pipe : unFixed</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(166, 38, 164)'}}>List</span><span style={{color: 'rgb(56, 58, 66)'}}>&lt;</span><span style={{color: 'rgb(166, 38, 164)'}}>Integer</span><span style={{color: 'rgb(56, 58, 66)'}}>&gt;</span><span style={{color: 'rgb(56, 58, 66)'}}> validRotations </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> pipe</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>getValidRotations</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>unFixed</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(166, 38, 164)'}}>if</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>validRotations</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>size</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>==</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>1</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} if there is only one valid rotation</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>pipe</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>setRotation</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>validRotations</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>get</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} set it's rotation to that</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>partFixed </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>true</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>toFix</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>add</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>pipe</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} fix the pipe</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>unFixed</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>removeIf</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>toFix</span><span style={{color: 'rgb(166, 38, 164)'}}>::</span><span style={{color: 'rgb(64, 120, 242)'}}>contains</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} remove the fixed pipes from the unfixed list</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>if</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>unFixed</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>isEmpty</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>return</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(64, 120, 242)'}}>solved</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} continues to part two of the algorithm</span>
            </span></code></pre>
            <div className="split">
                <img src={image3} alt="an example of a pipe with multiple valid rotations" />
                <div className="text">
                    <p>
                        This works really well for earlier puzzles where there are no pipes which can have multiple 
                        valid rotations. However, when the pipe can have multiple valid rotations it is effectively 
                        ignored by the algorithm and is unlikely to already be in the correct orientation.
                        <br />
                        To fix this I used a brute force approach where a rotation is assumed to be correct.
                        When the unFixed list is empty it returns if the grid is solved or not. This means that
                        after the assumption is made if the recursive call returns true then the assumption is correct.
                        If not then the next assumption is tested.
                    </p>
                </div>
            </div>
            <pre className="code"><code><span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} otherwise makes assumption</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(203, 119, 1)'}}>Pipe</span><span style={{color: 'rgb(56, 58, 66)'}}> newFixedPipe </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> unFixed</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>get</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} selects the first unfixed pipe</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>unFixed</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>remove</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>newFixedPipe</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} removes it from the unfixed list</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(203, 119, 1)'}}>List</span><span style={{color: 'rgb(56, 58, 66)'}}>&lt;</span><span style={{color: 'rgb(203, 119, 1)'}}>Integer</span><span style={{color: 'rgb(56, 58, 66)'}}>&gt;</span><span style={{color: 'rgb(56, 58, 66)'}}> validRotations </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> newFixedPipe</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>getValidRotations</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>unFixed</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(203, 119, 1)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> rotation: validRotations</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>newFixedPipe</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>setRotation</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>rotation</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} presumes that this rotation is the correct one</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>if</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(64, 120, 242)'}}>solve</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(166, 38, 164)'}}>new</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(203, 119, 1)'}}>ArrayList</span><span style={{color: 'rgb(56, 58, 66)'}}>&lt;</span><span style={{color: 'rgb(56, 58, 66)'}}>&gt;</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>unFixed</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} if the grid can be solved then the presumption is correct</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(166, 38, 164)'}}>return</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>true</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} if the grid can't be solved the grid is incorrect and moves onto the next valid rotation</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} if all valid rotations are invalid then a previous assumption must be wrong so false is returned</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} this will move the assumption on to another one</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>return</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>false</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span>
            </span></code></pre>
            <p>
                To try and better show the algorithm I've made a simple example image to show how the algorithm 
                would try and solve this made up puzzle. 
            </p>
            <img src={example} alt="flowchart of how the algorithm works" onClick={toggleImage} style={pipeImageStyles[0]}/>
            <img src={exampleUnfixed} alt="flowchart of how the algorithm works with unfixed pipes highlighted" onClick={toggleImage} style={pipeImageStyles[1]}/>
            <p>
                That pretty must summarises the algorithm and leads onto the next section:
            </p><br />
            <h2 id="pipes1Processing">Processing The Grid</h2><br />
            <p>
                Processing the grid is about how to program takes a picture of a screen and turns it into 
                a grid of pipes which can then be solved. This is done in a few steps, each time removing 
                redundant data until only the required information is left. This is then used to create 
                the grid which can be solved using the grids <i>.solve()</i> method.
            </p><br />
            <p>
                Initially a <i>RestrictedRobot</i> object is passes into the <i>PipeProcessor</i> to get the state 
                of the current grid. <i>The RestrictedRobot</i> is a proxy class of <i>Robot</i> where only a 
                smaller section of the screen can be viewed / controlled. 
                This is used to take a screen capture of the grid which is passed on for processing.
            </p>
            <p>
                The capture is passed into a function <i>reduceImage()</i> which applies a filter
                to the capture. It also crops the image so that only the pipes are shown and also 
                calculates the bounds of the new reduced image.
            </p>
            <img src={reduceImagePhoto} alt="Example of how the screen capture is modified by the reduceImage() function" />
            <p>
                The image returned from this is then put into two functions, <i>getSplits()</i> and 
                <i>getSquares()</i>. The result of this is two lists, one for the <b>x</b> direction,
                one for the <b>y</b> direction. Each list is made up of a pair, the first being the coordinate 
                and the second being the length of that square in that direction. By doing the cartesian 
                product between the two lists allows all the squares in the grid to be found. These are iterated 
                through to get the sub-images of each pipe.
            </p><br />
            <p>
                The list of pipe images are converted into pipe objects by sampling the image at specific points. 
                The middle of each edge is sampled to test for the number of connections and which 
                direction they are facing.
            </p>
            <ul>
                <li>
                    If there is only one connection then the percentage of the pipe which is the background colour is 
                    calculated. If this is greater then 35% then the pipe is a sink, otherwise it must be a tap. The 
                    colour is calculated by picking the pixel in the centre and matching it to the closes predefined 
                    pipe colour.
                </li>
                <li>
                    If there are two or three connections then a standard connector object is created. By including 
                    the directions the type and orientation of the pipe is unambiguous.
                </li>
                <li>
                    If there are four connections then the pipe is either a cross or the double-bend pipe. The 
                    center of the pipe is checked to determine if the pipe is a cross, if not then only the rotation of 
                    the double-bend needs to be worked out. This is done by splitting the pipe into quarters and 
                    counting the number of background pixels in each segment. The two most populated quarters should be 
                    opposite each other and correspond to the rotation of the pipe.
                </li>
            </ul><br />
            <p>
                This information is combined with the bounds from before to give each pipe a center value which 
                is used by the <i>RestrictedRobot</i> to click on the pipe when it needs to be rotated.
            </p><br />
            <p>To try and simplify this I attempted to make another flowchart on how the pipes are identified.</p>
            <img src={pipeProcessorFlowchart} alt="flowchart of how the pipe processor distinguishes pipes"/>
            <p>All this information is then used to construct the grid and is passed in as a list of pipes.</p>
            <br />
            <h2 id="pipes1Grid">How The Grid Works</h2><br />
            <p>
                To understand how the grid works it's first important to understand the pipes which make up 
                the grid. There are three types of pipe (<i>connector</i>, <i>tap</i> and <i>sink</i>) which each 
                have their own class but are children of the abstract <i>pipe</i> class. Each also utilises a 
                class called <i>PipeState</i> which keeps track of the colour of each pipe.
            </p><br />
            <h4>PipeState</h4>
            <p>
                The <i>PipeState</i> is used to keep track of the colour of each pipe and is very basic.
                It stores a <i>PipeColour</i> called state, a default state it should be at the start of a 
                simulation, and a list of <i>PipeDirections</i> called connecting, which are the directions 
                that the segment of pipe is connected to. When the <i>reset()</i> method is called the state 
                is set to the default state and when the <i>update(PipeColour colour)</i> is called the state 
                is set to the combination of the state colour and the new colour. It doesn't seem very 
                important but is used massively when simulating the grid.
            </p>
            <img src={pipeStateExample} alt="a example of how pipe states are used within pipes"/>
            <br />
            <h4>Abstract Pipe</h4>
            <p>
                The abstract class <i>Pipe</i> contains functions that all other pipe use or must implement 
                in some way. These are:
            </p>
            <ul>
                <li>
                    center - the location of the pipe in the screen capture. This is used by the robot to 
                    move the mouse in order to rotate the pipe.
                </li>
                <li>
                    adjacentPipes - this is a map of <i>PipeDirection</i> to <i>Pipe</i>, so that a pipe 
                    can call methods on it's surrounding pipes.
                </li>
                <li>
                    maxRotation - this is the maximum number of times a pipe can rotate before returning
                    to its initial state.
                </li>
                <li>
                    setRotation(int x) - this is used to set the rotation of a pipe.
                </li>
                <li>
                    {`getValidRotations(List<Pipe> unFixed) - this takes a list of unFixed pipes and returns
                    a list of rotations where it is correctly connected to fixed adjacent pipes.`}
                </li>
                <li>
                    update(PipeDirection d, PipeColour colour) - updates the pipe as if connected to another 
                    pipe of colour <i>colour</i> in direction <i>d</i>. I'll talk about how this works for 
                    each pipe later in the Simulating The Grid section.
                </li>
                <li>
                    reset() - used before a simulation and ensures a pipe is not effected by the colours from 
                    a previous simulation.
                </li>
                <li>
                    isSatisfied() - used to ensure the pipe is included when checking if solved. e.g <i>Sink</i>s 
                    should be their target colour and <i>Connector</i>s shouldn't be clear.
                </li>
                <li>
                    getConnections() - returns the list of directions the pipe is connected to. This is used 
                    to check if two neighboring pipes share the same connection (both pipes connected or both 
                    pipes disconnected).
                </li>
            </ul>
            <br />
            <h4>Connector Pipe</h4>
            <p>
                The <i>Connector</i> is the most complicated out of the pipes as it is the only one able 
                to rotate. It has a <i>PipeState</i> for each separate segment of pipe within the pipe 
                (two for the Double-Bend, one for the rest) and a <i>rotationMap</i>s for keeping track 
                of the pipes rotation.
            </p>
            <p>
                Rather then changing all the directions stored in the object each time it is rotated, they are 
                all kept constant and a bidirectional map is used to keep track of rotations.
            </p>
            <img src={rotationMapImage} alt="a example of how the rotation maps keep track of rotation"/>
            <p>
                When the pipes <i>rotate()</i> method is called, it's current rotation is increased by one 
                (modulo maxRotation) and the <i>rotationMap</i> is updated to reflect the changes. Once 
                done, all other functions work exactly the same and the pipe is rotated, despite the 
                central <i>PipeState</i>s of the pipe not being changed at all.
            </p>
            <p>
                The pipes <i>reset()</i> method just resets all associated <i>PipeState</i>s and
                it's <i>isSatisfied()</i> method checks that all <i>PipeState</i>s are not clear and not 
                invalid. Finally the <i>getConnections()</i> method takes the connections of the 
                <i>PipeState</i>s and puts them through the <i>rotationMap</i> to get the list 
                of directions the pipe (in its current rotation) is connected to.
            </p><br />
            <h4>Sink Pipe</h4>
            <p>
                The sink pipe is a lot simpler as it doesn't have to rotate. It has a single <i>PipeState</i>, 
                a target colour and is only connected in one direction. For its <i>isSatisfied()</i> method 
                checks if the colour of the pipe state is the same as the target colour.
            </p><br />
            <h4>Tap/Source Pipe</h4>
            <p>
                The tap pipe is very similar to the sink pipe in the sense that it cannot rotate and 
                only has one connection. It has no <i>PipeState</i>s as its colour can't be changed.
            </p><br />
            <h4>Null Pipe</h4>
            <p>
                The null pipe is a default pipe all other pipes are connected to before they are placed in the 
                grid. It represents the borders of the grid and any blank squares within the grid.
                Its <i>isSatisfied()</i> method always returns true and has no connections.
            </p><br/>
            <h3>Constructing The Grid</h3>
            <p>
                The grid is constructed using a list of pipes and puts them into a 2D array of pipes. 
                It then goes through and updates all the pipes <i>adjacentPipes</i>. This leaves pipes 
                on the edge of the grid with one or more adjacentPipes being the null pipe and prevents 
                pipes pointing out of the grid as a valid solution. While it does this it also puts 
                any source/tap pipes into the <i>sources</i> list. This is used when the grid has to be 
                simulated.
            </p><br />
            <h3>Simulating The Grid</h3>
            <p>
                The grid has a method called <i>simulate()</i>. When called this returns true or false 
                depending on whether or not the pipes allow the water to flow correctly between them and 
                sinks are not the wrong colour. To start the simulation the <i>update()</i> method is called 
                on all of the sources. This starts a chain reaction of updating the neighboring pipes until 
                one returns false or all simulate correctly, returning true.
            </p>
            <ul>
                <li>
                    <h5>Connectors</h5>
                    <p>
                When a connector is updated if first checks the direction it is being updated from is valid, 
                false is returned if it is not, ending the simulation.<br />If it is valid then it checks if the pipes 
                state is already the colour it is trying to be updated to, this prevents infinite loops but
                isn't an issue so true is returned. If nothing has been returned yet then the state is updated 
                with the new colour. This is done by adding the states current colour to the new one. This allows 
                colours to be mixed which is used in the later levels. If the combination of colours is invalid then 
                false is returned.<br />Otherwise the connector has updated successfully and goes on to update all pipes 
                which are associated with the updated pipe state. If any of these return false then later on down the 
                pipe there is an issue so the connector also returns false, else everything is fine and true is 
                returned.
                    </p>
                </li>
                <li>
                    <h5>Taps/Sources</h5>
                    <p>
                        As taps are what start the update chain they don't have much functionality at all. When 
                        updated they always return true. Though it seems surprising that they could be updated 
                        more then once it can happen for multiple reasons.
                    </p>
                    <ul>
                        <li>
                            The connector directly next to the tap updates all surrounding pipes when
                            it is updated. This includes the tap pipe.
                        </li>
                        <li>
                            If another tap has been updated before this tap then its chain of updates could 
                            easily lead to this tap.
                        </li>
                        <li>
                            If a mix of colours has happened then all the pipes in a chain will update, leading
                            back to the tap.
                        </li>
                    </ul>
                </li>
                <li>
                    <h5>Sinks</h5>
                    <p>
                        When the sinks are updated only the colour and direction needs to be checked. If the direction 
                        is not the <i>inDirection</i> then false is returned. This is for the case when a pipe is 
                        pointing into the wrong side of a sink.<br />If it's connected in the right direction then the 
                        colour is checked to see if it is a component colour of its target colour. For example, if 
                        the target colour is orange then if the sink is updated with the colour red it must return true.
                        Though this isn't it's target colour it may later be updated with the colour green, which 
                        combines to make the pipe orange, satisfying the sink.
                    </p>
                </li>
            </ul>
            <p>To better illustrate this I have made some gifs showing how the algorithm works.</p>
            <div className="split" style={{"background":"#445563"}}>
                <img src={animation1} alt="a example of how the simulate function works"/>
                <img src={animation2} alt="a example of how the simulate function works"/>
            </div>
            <div className="split" style={{"background":"#445563"}}>
                <img src={animation3} alt="a example of how the simulate function works"/>
                <img src={animation4} alt="a example of how the simulate function works"/>
            </div>
            <p>
                The grid has one more important method called <i>solved()</i>. This first simulated the grid to 
                ensure all connections are working fine and then checks every pipe is satisfied. If these are both 
                true then the grid is solved.
            </p>
            <h2 id="pipes1Instructions">Entering The Correct Answer</h2>
            <p>
                When solving the puzzles the limiting factor in terms of time isn't actually solving it but entering 
                the solution afterwards. This is because when a pipe is rotated an animation is played and no more 
                inputs can be taken. This means that each puzzle is time bound by the minimum number of rotations 
                needed in order to solve it. In order to reduce the time taken it's important to start inputting the 
                solution as soon as possible and not waiting till after the grid is solved. (In these puzzles it 
                doesn't really make much difference but in larger or more complicated ones it might be more 
                noticeable).<br /><br />
                To do this the program uses multithreading. It starts a second thread in charge of 
                entering the correct answer and passes instructions to it while the grid is still being solved. Each 
                instruction is made up of three parts: a pipe which is to be rotated, a target rotation, and an 
                <i>AtomicBoolean</i> flag which indicates if the instruction is valid or not.<br /><br />
                The reason for this valid flag is because when solving with the algorithm wrong assumptions are often made.
                We want the move to be made if it is correct but we don't know until later on if it is correct or 
                not. To avoid unnecessary rotations each assumption is given a valid flag and if the assumption is found to be 
                incorrect then the flag is changed and the instruction is discarded.<br /><br />
                The controller also keeps track of each pipes rotation so if an invalid instruction is processed then 
                the next instruction given for that pipe will take the previous one into account.<br /><br />
                This second thread continues to run until it receives a null instruction (with the target pipe 
                being the null pipe). This happens when the grid has been fully solved as the first thread 
                puts the termination instruction into the queue and waits for the second thread to finish processing.   
            </p><br /><br />
            <p>The following code has been reduced slightly for simplicity</p>
            <pre className="code"><code><span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>public</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(203, 119, 1)'}}>void</span><span style={{color: 'rgb(56, 58, 66)'}}> run</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(203, 119, 1)'}}>boolean</span><span style={{color: 'rgb(56, 58, 66)'}}> running </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>true</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>while</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>running</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(203, 119, 1)'}}>Tuple3</span><span style={{color: 'rgb(56, 58, 66)'}}>&lt;</span><span style={{color: 'rgb(203, 119, 1)'}}>AtomicBoolean</span><span style={{color: 'rgb(56, 58, 66)'}}>,</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(203, 119, 1)'}}>Pipe</span><span style={{color: 'rgb(56, 58, 66)'}}>,</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(203, 119, 1)'}}>Integer</span><span style={{color: 'rgb(56, 58, 66)'}}>&gt;</span><span style={{color: 'rgb(56, 58, 66)'}}> instruction </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> instructions</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>take</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>if</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(203, 119, 1)'}}>Pipe</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(56, 58, 66)'}}>nullPipe</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>equals</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>instruction</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>getSecond</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> running </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>false</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} if terminating instruction stop</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>else</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>if</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>instruction</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>getFirst</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>get</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} process instruction as it's valid</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(203, 119, 1)'}}>Pipe</span><span style={{color: 'rgb(56, 58, 66)'}}> pipe </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> instruction</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>getSecond</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(203, 119, 1)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> targetRotation </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> instruction</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>getThird</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(166, 38, 164)'}}>if</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>targetRotation </span><span style={{color: 'rgb(166, 38, 164)'}}>&gt;=</span><span style={{color: 'rgb(56, 58, 66)'}}> pipe</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>getMaxRotation</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>throw</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>new</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(203, 119, 1)'}}>RuntimeException</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(80, 161, 79)'}}>"Can't rotate that much"</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(203, 119, 1)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> currentRotation </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> currentRotations</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>getOrDefault</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>pipe</span><span style={{color: 'rgb(56, 58, 66)'}}>,</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(166, 38, 164)'}}>if</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>currentRotation </span><span style={{color: 'rgb(166, 38, 164)'}}>!=</span><span style={{color: 'rgb(56, 58, 66)'}}> targetRotation</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(166, 38, 164)'}}>while</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>currentRotation </span><span style={{color: 'rgb(166, 38, 164)'}}>!=</span><span style={{color: 'rgb(56, 58, 66)'}}> targetRotation</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} while target != current, rotates the pipe</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                    "}</span><span style={{color: 'rgb(64, 120, 242)'}}>click</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>pipe</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>getCenter</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>currentRotation </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>currentRotation </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>1</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>%</span><span style={{color: 'rgb(56, 58, 66)'}}> pipe</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>getMaxRotation</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                    "}</span><span style={{color: 'rgb(203, 119, 1)'}}>TimeUnit</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(183, 107, 1)'}}>MILLISECONDS</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>sleep</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>delay</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} waits for animation to finish</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>currentRotations</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>put</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>pipe</span><span style={{color: 'rgb(56, 58, 66)'}}>,</span><span style={{color: 'rgb(56, 58, 66)'}}> currentRotation</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span>
            </span></code></pre>
            <br />
            <p>
                That concludes everything I'm going to write about on Pipes 1. Please contact me if you have any 
                questions I have not covered or want more detail on.<br />
                Thanks for reading!
            </p>
        </div>  
    );
}
 
export default Component;