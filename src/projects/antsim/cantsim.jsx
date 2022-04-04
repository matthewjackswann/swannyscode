import {Link} from "react-scroll";
import { MathComponent } from 'mathjax-react';
import { useState } from "react";
import basicAnt from "./basicAnt.png";
import wallAnt from "./wallAnt.png";
import transparency from "./transparency.png";
import blur1 from "./blur1.png";
import blur2 from "./blur2.png";
import gif1 from "./gif1.gif";
import gif2 from "./gif2.gif";
import gif3 from "./gif3.gif";
import DropDown from "../../DropDown";

const Component = () => {
    const [antImageStyles, setAntImageStyles] = useState([{}, {display: "none"}]);
    const toggleImage = () => setAntImageStyles(old => [old[1], old[0]]);
    return (
        <div id="cantsim">
            <h1>C Ant Food Gathering Simulation</h1>
            <p>October 2, 2021</p><br />
            <p>
                For this ant simulation I decided to use very basic logic to control the behavior of each ant where they
                have minimal view / knowledge of the map but working together can gather food and expand the size of the
                colony.
            </p>
            <p>
                To achieve this each ant leaves pheromones which alters the behavior of nearby ants allowing them to
                communicate their own state to other ants in the colony.
            </p><br />
            <p>
                The overall goal of the simulation is that all food on the map is found and brought back to
                the home of the ants, spawning new ants till all the food is eaten.
            </p>
            <p>
                Sadly this doesn't really work with the ants moving almost randomly. I've added a
                section  to address these issues. I might revisit this later,
                maybe in C but likely in an object oriented programming language instead. This is also why constants
                in the source code can't be changed by command line arguments (there is no point implementing it)
            </p><br />
            <p>
                This project was still fun however and I want to document how it works so when I revisit it I don't have 
                to relearn everything. It also meant I successfully brushed up on my C programming.
            </p><br />            
            <p>I've split the description of the code into the following sections:</p>
            <ul>
                <li><Link to="simulationSetup" spy={true} smooth={true}>Simulation Setup</Link></li>
                <li><Link to="antBehavior" spy={true} smooth={true}>Ant Behavior</Link></li>
                <li><Link to="pheromoneDiffusing" spy={true} smooth={true}>Pheromone Diffusing</Link></li>
                <li><Link to="criticisms" spy={true} smooth={true}>Criticisms</Link></li>
            </ul><br />
            <h2 id="simulationSetup">Simulation Setup</h2>
            <p>The simulation is made up of a few components:</p><br />
                <h4>The background</h4>
                <p>
                    The background is the initial bitmap loaded into the program. It contains the simulation walls,
                    the ants home and the food source. The food source is replaced by the background when an ant picks 
                    collects it, otherwise this map is left unchanged. The walls cannot be passed by the 
                    ants and act as barriers.
                </p><br />
                <h4>The pheromone map</h4>
                <p>
                    The pheromone map contains the concentration of pheromones in each pixel of the simulation. It 
                    is split into 3 different channels (RGB) with one for each pheromone having it's own channel 
                    (leaving one empty / unused). When viewing the simulation, each channel is calculated using the 
                    equation:
                </p>
                <MathComponent tex={String.raw`transparency = \frac{pheromone}{255}`} />
                <MathComponent tex={String.raw`result = 255 * transparency + background (1 - transparency)`} />
                <p>
                    This describes the background colour with a transparent colour over the 
                    top. The transparency of this is calculated using the concentration of each pheromone in that pixel.
                </p><br />
                <img src={transparency} alt="different values and there colours"/>
                <h4>The directions</h4>
                <p>
                    There are 8 possible directions that an ant could ever travel in with each being represented by a 
                    direction d (mod 8). All direction calculations are calculated in modulo 8 so that turning left can 
                    be calculated using:
                </p>
                <MathComponent tex={String.raw`d' = d + 7 \bmod\;8`} />
                <p>Turning right can be calculated using: </p>
                <MathComponent tex={String.raw`d' = d + 1 \bmod\;8`} />
                <p>To get the opposite direction:</p>
                <MathComponent tex={String.raw`d' = d + 4 \bmod\;8`} />
                <br />
                <h4>The ants</h4>
                <p>
                    Each simulation has a number of ants, represented by structs, in a array. Each tick of the simulation
                    every ant is updated with a new position and any new ants are added. When an ant retrieves some 
                    food a new ant is added to the list if the maximum capacity is not already reached.
                </p>

            <br /><br />
            <h2 id="antBehavior">Ant Behavior</h2>
            <p>Each ant follows a very simple set of rules as to what they can do each tick of the simulation</p>
            <p>They must:</p>
            <ul>
                <li>Move in a direction</li>
                <li>Leave behind a pheromone (either the with food or without food pheromone)</li>
                <li>If they are on food pick it up</li>
                <li>If they are at a home with food drop it off, creating a new ant</li>
            </ul><br />
            <p>
                If their movement is random then the overall simulation will take ages and have no coordination
                between the ants. Because of this the direction they move in is selected using a weighted random
                selection using the surrounding pheromones as weights.
            </p><br />
            <h3>Pheromone Behavior</h3>
            <p>
                Each ant leaves behind a pheromone when they move depending on their current state. If they have food 
                then they leave behind the with food pheromone (red channel). If they don't have food then 
                they leave behind the without food pheromone (green channel).
            </p>
            <p>
                Ants weight their movement based on the state they want to be in. If an ant has no food then it wants 
                food and will be more likely to move onto squares with high levels of the with food pheromone. If an ant 
                has food it wants to drop it off at the home and will be more likely to move onto squares with high 
                levels of the without food pheromone.
            </p>
            <p>
                Each ant can only move in upto 3 different directions each turn. Either in the direction it is 
                currently moving, one turn left, or one turn right. If any of these directions are blocked by a 
                wall then the ant can instead go in the opposite direction turning around. If both of these
                directions are blocked then the weight given to this direction is 0, so the ant can't move in that
                direction.
            </p>
            <p>The weight of each direction is calculated using the equation:</p>
            <MathComponent tex={String.raw`weight = baseWeight + level\; of\; specific\; pheromone`} />
            <p>
                Each direction and the weights are put into a weighted random number generator which decides
                the direction the ant will move in. This updates the ants current direction and
                its <i>x</i> and <i>y</i> coordinates are updated accordingly
            </p>
            <div className="split" style={{backgroundColor: "rgb(176,135,107"}}>
            <img src={basicAnt} alt="where the ant can go from the 0 direction"/>
            <img src={wallAnt} alt="where the ant can go when it reaches a wall"/>
            </div><br />
            <DropDown>
                <h5>Proof ants won't get trapped <i className="arrow down" style={{float: "right", marginRight: "10px"}} /></h5>
                <p>
                    If an ant cannot move in any direction then a error will occur and the simulation will exit early.
                    This means that it's important that the ant's cant get trapped. As the ant can never turn 
                    left two direction or right two directions if these are the only valid spaces the ant will become
                    trapped. As there is a configuration where an ant can become trapped we must prove that this 
                    configuration will never happen during the simulation and only when the prerequisite that the 
                    home is un-trapped is broken.
                </p><br />
                <p>This is an informal proof so don't scrutinize it too much.</p>
                <ul>
                <li>For an initial simulation state to be valid the home must be un-trapped</li>
                <li>Therefore ants at tick t = 0 are un-trapped</li>
                <li>Therefore ants can move onto tick t = 1</li>
                <li>
                    If an ant reaches a configuration where it is trapped at tick t = k, then it must have been un-trapped
                    in its previous configuration t = k - 1
                </li>
                <li>
                    Each ants movement allows it to turn around 180º so an ant at tick t = k can always revert to 
                    the same position it was in at t = k - 1, just facing the opposite direction
                </li>
                <li>
                    This is a contradiction as it can't be trapped at t = k as it can still move.
                    Therefore from any un-trapped configuration an ant cannot become trapped.
                    </li><br />
                </ul>
                <p>
                    It's important to note that ant's can be in the same space at the same time so do not block the
                    movement of other ants. If this was not the case it would be possible for ants to become trapped.
                </p>
            </DropDown><br />
            <h2 id="pheromoneDiffusing">Pheromone Diffusing</h2>
            <p>
                After each step in the simulation the pheromones are diffused and have their values reduced.
                This is to try and simulate how the pheromones would diffused in real life. To achieve this 
                the pheromone map is blurred using a simple box blur. The values are then divided by a constant 
                (e.g. 1.1) to reduce the total number of pheromones in the simulation, without which would lead to the 
                entire pheromone map having the max value after an extended amount of time.
            </p><br />
            <h4>Box Blur Algorithm</h4>
            <p>A box blur is where the value of a given pixel is set to the average of the surrounding colours.</p>
            <p>
                A naïve implementation would simply create a new grid for the blurred image to be stored in, for each
                pixel in the original photo sum the surrounding pixels and set the value in the new image to the average.
                This can a long runtime however as each pixel is sampled multiple times. For example, a <b>m x n</b> image
                blurred with radius <b>r</b>, the number of accesses are in:
            </p>
            <MathComponent tex={String.raw`\mathcal{O}(m*n*(2*r+1)^2) = \mathcal{O}(m*n*r^2)`} />
            <p>
                To reduce the number of times a pixel is sampled the blur is run twice, once in the horizontal direction
                and once in the vertical.
            </p>
            <img src={blur1} alt="example of blurring" onClick={toggleImage} style={antImageStyles[0]}/>
            <img src={blur2} alt="algebra of blurring" onClick={toggleImage} style={antImageStyles[1]}/>
            <p>This reduces the number of times the array is accessed so that it's in:</p>
            <MathComponent tex={String.raw`\mathcal{O}(2*m*n*(2*r+1)) = \mathcal{O}(m*n*r)`} />
            <p>
                If you don't understand big-O notation it's a way of expressing how well the programs runtime scales
                as <b>m</b>, <b>n</b> and <b>r</b> increase. Doing two passes results in a faster calculation and
                will struggle less with larger values of <b>r</b>. It can be further optimized using an accumulator but
                it was running fast enough that I didn't bother.
            </p><br />
            <p>
                Below is the code for blurring an image in only one channel <b>c</b>. In the actual code only
                channels <b>0</b> and <b>1</b> are blurred as the third channel <b>2</b> is unused so
                is wasted computation.
            </p>
            <pre className="code"><code><span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} stores the data once blured in the horizontal direction</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(1, 132, 188)'}}>guchar</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}>hBlur </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(64, 120, 242)'}}>malloc</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>width</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}> s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>height</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>3</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>sizeof</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>guchar</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(1, 132, 188)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> y </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> y </span><span style={{color: 'rgb(166, 38, 164)'}}>&lt;</span><span style={{color: 'rgb(56, 58, 66)'}}> s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>height</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> y</span><span style={{color: 'rgb(166, 38, 164)'}}>++</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} blurs in the horizontal direction</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(1, 132, 188)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> x </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> x </span><span style={{color: 'rgb(166, 38, 164)'}}>&lt;</span><span style={{color: 'rgb(56, 58, 66)'}}> s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>width</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> x</span><span style={{color: 'rgb(166, 38, 164)'}}>++</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(1, 132, 188)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> total </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(1, 132, 188)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> dx </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>-</span><span style={{color: 'rgb(56, 58, 66)'}}>r</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> dx </span><span style={{color: 'rgb(166, 38, 164)'}}>&lt;=</span><span style={{color: 'rgb(56, 58, 66)'}}> r</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> dx</span><span style={{color: 'rgb(166, 38, 164)'}}>++</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(1, 132, 188)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> xpos </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>x </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> dx </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>width</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>%</span><span style={{color: 'rgb(56, 58, 66)'}}> s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>width</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(56, 58, 66)'}}>total </span><span style={{color: 'rgb(166, 38, 164)'}}>+=</span><span style={{color: 'rgb(56, 58, 66)'}}> s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>data</span><span style={{color: 'rgb(56, 58, 66)'}}>[</span><span style={{color: 'rgb(183, 107, 1)'}}>3</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>y</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}>s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>width</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}>xpos</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}>c</span><span style={{color: 'rgb(56, 58, 66)'}}>]</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>hBlur</span><span style={{color: 'rgb(56, 58, 66)'}}>[</span><span style={{color: 'rgb(183, 107, 1)'}}>3</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>y</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}>s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>width</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}>x</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}>c</span><span style={{color: 'rgb(56, 58, 66)'}}>]</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> total </span><span style={{color: 'rgb(166, 38, 164)'}}>/</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(183, 107, 1)'}}>2</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}>r</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(183, 107, 1)'}}>1</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(1, 132, 188)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> x </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> x </span><span style={{color: 'rgb(166, 38, 164)'}}>&lt;</span><span style={{color: 'rgb(56, 58, 66)'}}> s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>width</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> x</span><span style={{color: 'rgb(166, 38, 164)'}}>++</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} blurs in the vertical direction</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(1, 132, 188)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> y </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> y </span><span style={{color: 'rgb(166, 38, 164)'}}>&lt;</span><span style={{color: 'rgb(56, 58, 66)'}}> s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>height</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> y</span><span style={{color: 'rgb(166, 38, 164)'}}>++</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(1, 132, 188)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> total </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(1, 132, 188)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> dy </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>-</span><span style={{color: 'rgb(56, 58, 66)'}}>r</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> dy </span><span style={{color: 'rgb(166, 38, 164)'}}>&lt;=</span><span style={{color: 'rgb(56, 58, 66)'}}> r</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> dy</span><span style={{color: 'rgb(166, 38, 164)'}}>++</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(1, 132, 188)'}}>int</span><span style={{color: 'rgb(56, 58, 66)'}}> ypos </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>y </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> dy </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>height</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>%</span><span style={{color: 'rgb(56, 58, 66)'}}> s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>height</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(56, 58, 66)'}}>total </span><span style={{color: 'rgb(166, 38, 164)'}}>+=</span><span style={{color: 'rgb(56, 58, 66)'}}> hBlur</span><span style={{color: 'rgb(56, 58, 66)'}}>[</span><span style={{color: 'rgb(183, 107, 1)'}}>3</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>ypos</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}>s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>width</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}>x</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}>c</span><span style={{color: 'rgb(56, 58, 66)'}}>]</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>data</span><span style={{color: 'rgb(56, 58, 66)'}}>[</span><span style={{color: 'rgb(183, 107, 1)'}}>3</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>y</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}>s</span><span style={{color: 'rgb(166, 38, 164)'}}>-&gt;</span><span style={{color: 'rgb(228, 86, 73)'}}>width</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}>x</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}>c</span><span style={{color: 'rgb(56, 58, 66)'}}>]</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> total </span><span style={{color: 'rgb(166, 38, 164)'}}>/</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(183, 107, 1)'}}>2</span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}>r</span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(183, 107, 1)'}}>1</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>*</span><span style={{color: 'rgb(56, 58, 66)'}}> blurReductionFactor</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span>
            </span></code></pre>
            <br />
            <h2 id="criticisms">Criticisms</h2>
            <p>
                Sadly this project doesn't really work.<br />The ants move around almost randomly and don't collect
                the food as I would have liked. They instead fill the map with pheromones and don't achieve anything.
                I've added multiple elements to the simulation to try and improve it but none of them helped.
            </p>
            <ul>
                <li>Added a blur frequency so that the pheromones don't get blurred every tick</li>
                <li>Added a weight so that ants are biased to move in the direction they are currently traveling</li>
                <li>Added a view radius to the ants so that they can see move then one square ahead of them</li>
            </ul>
            <p>
                None of these have made much difference. I think this is because the issue is with how the pheromones
                are implemented. They don't actually direct the ants because they end up everywhere and become
                concentrated in a large area around the home, leading to ants moving randomly once they are close to the
                home.
            </p>
            <p>Below are some examples where the ant doesn't follow the desired behavior (shown first).</p>
            <div className="tripleSplit" style={{backgroundColor: "rgb(176,135,107"}}>
                <img src={gif1} alt="ant walks correctly"/>
                <img src={gif2} alt="ant follows collecting ant lost"/>
                <img src={gif3} alt="ant gets lost"/>
            </div>
            <p>
                I'd love to come back to this project and fix this issue but I need to do some more research
                and re-write most of the code. Because of this I'm going to leave it for the time being.
            </p>
        </div>
    );
}
 
export default Component;