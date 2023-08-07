import InPageLink from "../../Components/InPageLink";
import Latex from 'react-latex-next';
import transparency from "./Media/transparency.png";
import basicAnt from "./Media/basicAnt.png";
import wallAnt from "./Media/wallAnt.png";
import blur1 from "./Media/blur1.png";
import blur2 from "./Media/blur2.png";
import gif1 from "./Media/gif1.gif";
import gif2 from "./Media/gif2.gif";
import gif3 from "./Media/gif3.gif";
import Collapsible from "../../Components/Collapsible";
import ImageSwapper from "../../Components/ImageSwapper";
import CodeSnippet from "../../Components/CodeSnippet";
import { AntSimBlur } from "./Media/Code";

function Content() {
    return (<div>
        <h1 className="text-5xl">Ant Simulation</h1>

        <p className="pb-4">October 2, 2021</p>

        <p className="pb-2">
            After seeing so many of ant colony simulations on youtube I decided to practice my C programming and make a simple food gathering simulation.
        </p>

        <p className="pb-2">
            Initially this project was started with the focus on re-sharpening my C programming skills and doing some coding that was interesting but wouldn't take me too long (how I was wrong). I quickly found out that using the GTK library to simply display the view of the simulation was easier said then done but still interesting none the less.
        </p>

        <p>
            For all the source code as well as instructions on how to run this code visit the <a className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark" href="https://github.com/matthewjackswann/AntSim/tree/master">github</a>
        </p>
        <p className="pb-4">It has been built and tested on Linux Ubuntu 20.04.3 with GTK 3.24.20</p>

        <p className="pb-2">
            For this ant simulation I decided to use very basic logic to control the behavior of each ant where they have minimal view / knowledge of the map but working together can gather food and expand the size of the colony. To achieve this each ant leaves pheromones which alters the behavior of nearby ants allowing them to communicate their own state to other ants in the colony. The overall goal of the simulation is that all food on the map is found and brought back to the home of the ants, spawning new ants till all the food is eaten. Sadly this doesn't really work with the ants moving almost randomly. I've added a section to address these issues. I might revisit this later, maybe in C but likely in an object oriented programming language instead.
        </p>

        <p>
            This project was still fun however and I want to document how it works so when I revisit it I don't have to relearn everything. It also meant I successfully brushed up on my C programming.
        </p>

        <p className="pt-4">
            I've split the description of the code into the following sections:
        </p>

        <ul className="list-disc pl-8">
            {[
                ["Simulation Setup", "simSetup"],
                ["Ant Behaviour", "behaviour"],
                ["Pheromone Diffusing", "diffusing"],
                ["Criticisms", "criticisms"],
            ].map(([label, l]) => <li key={l}>
                <InPageLink className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark cursor-pointer" to={l}>{label}</InPageLink>
            </li>)}
        </ul>

        <br />

        <h2 className="text-4xl" id="simSetup">Simulation Setup</h2>
        <br />

        <p>The simulation is made up of a few components:</p>

        <h4 className="text-xl font-bold pb-1">The background</h4>
        <p className="pb-4">
            The background is the initial bitmap loaded into the program. It contains the simulation walls, the ants home and the food source. The food source is replaced by the background when an ant picks collects it, otherwise this map is left unchanged. The walls cannot be passed by the ants and act as barriers.
        </p>

        <h4 className="text-xl font-bold pb-1">The pheromone map</h4>
        <p>
            The pheromone map contains the concentration of pheromones in each pixel of the simulation. It is split into 3 different channels (RGB) with one for each pheromone having it's own channel (leaving one empty / unused). When viewing the simulation, each channel is calculated using the equation:
        </p>

        <div className="text-xl overflow-auto">
            <Latex>{`$$transparency = \\frac{pheromone}{255}$$`}</Latex>
            <Latex>{`$$result = 255 * transparency + background (1 - transparency)$$`}</Latex>
        </div>

        <p className="py-2">
            This describes the background colour with a transparent colour over the top. The transparency of this is calculated using the concentration of each pheromone in that pixel.
        </p>

        <img src={transparency} alt="different values and there colours"/>

        <h4 className="text-xl font-bold pt-4">The directions</h4>
        <p>
            There are 8 possible directions that an ant could ever travel in with each being represented by a direction d (mod 8). All direction calculations are calculated in modulo 8.
        </p>
        <div className="flex py-4 flex-col md:justify-around md:flex-row">
            <div className="text-center m-2 p-2 border-accent dark:border-accent-dark border-solid border-2 tc">
                <Latex>{`$d' = d + 7 \\bmod\\;8$`}</Latex>
                <p>Turn Left</p>
            </div>
            <div className="text-center m-2 p-2 border-accent dark:border-accent-dark border-solid border-2 tc">
                <Latex>{`$d' = d + 4 \\bmod\\;8$`}</Latex>
                <p>Turn 180</p>
            </div>
            <div className="text-center m-2 p-2 border-accent dark:border-accent-dark border-solid border-2 tc">
                <Latex>{`$d' = d + 1 \\bmod\\;8$`}</Latex>
                <p>Turn Right</p>
            </div>
        </div>

        <h4 className="text-xl font-bold pt-4">The Ants</h4>
        <p>
            Each simulation has a number of ants, represented by structs, in a array. Each tick of the simulation every ant is updated with a new position and any new ants are added. When an ant retrieves some food a new ant is added to the list if the maximum capacity is not already reached.
        </p>

        <br />

        <h2 className="text-4xl" id="behaviour">Ant Behaviour</h2>
        <br />

        <p>
            Each ant follows a very simple set of rules as to what they can do each tick of the simulation.
        </p>
        <p>They must:</p>

        <ul className="list-disc pl-8">
            <li>Move in a direction</li>
            <li>Leave behind a pheromone (either the with food or without food pheromone)</li>
            <li>If they are on food pick it up</li>
            <li>If they are at a home with food, drop it off, creating a new ant</li>
        </ul>

        <p className="py-2">
            If their movement is entirely random then the overall simulation will take ages and have no coordination between the ants. Because of this the direction they move in is selected using a weighted random selection using the surrounding pheromones as weights.
        </p>

        <h4 className="text-xl font-bold pt-4">Pheromone Behavior</h4>

        <p>
            Each ant leaves behind a pheromone when they move depending on their current state. If they have food then they leave behind the with food pheromone (red channel). If they don't have food then they leave behind the without food pheromone (green channel).
        </p>

        <p className="pt-2">
            Ants weight their movement based on the state they want to be in. If an ant has no food then it wants food, and will be more likely to move onto squares with high levels of the with food pheromone. If an ant has food to drop it off at the home, and will be more likely to move onto squares with high levels of the without food pheromone.
        </p>

        <p className="pt-2">
            Each ant can only move in upto 3 different directions each turn. Either in the direction it is currently moving, one turn left, or one turn right. If any of these directions are blocked by a wall, then the ant can instead go in the opposite direction, turning around. If both of forwards and backwards are blocked then the weight given to this direction is 0, so the ant can't move in that direction.
        </p>

        <p className="py-2">
            The ants next direction is picked randomly from the set of possible options. They are weighted by adding a base weight value to the concentration of the target pheromone. This happens once every update and each ant's direction and x, y position are updated accordingly.
        </p>

        <div className="sm:flex sm:justify-evenly">
            <img className="mx-auto w-full max-w-md sm:w-1/2 p-2" src={basicAnt} alt="where the ant can go from the 0 direction"/>
            <img className="mx-auto w-full max-w-md sm:w-1/2 p-2" src={wallAnt} alt="where the ant can go when it reaches a wall"/>
        </div>

        <div className="cc mt-2 p-2 bg-background-faded dark:bg-background-faded-dark rounded-md">
            <Collapsible header={<div className="text-lg font-bold">Proof ants don't get trapped</div>}>
                <p>
                    If an ant cannot move in any direction then a error will occur and the simulation will exit early. This means that it's important that the ant's cant get trapped. As the ant can never turn left two direction or right two directions if these are the only valid spaces the ant will become trapped. As there is a configuration where an ant can become trapped we must prove that this configuration will never happen during the simulation and only when the prerequisite that the home is un-trapped is broken.
                </p>
                <p className="pt-2">This is a very informal proof so don't scrutinize it too much.</p>

                <ul className="list-disc pl-8 pt-4">
                    <li>For an initial simulation state to be valid the home must be un-trapped</li>
                    <li>Therefore ants at tick t = 0 are un-trapped</li>
                    <li>Therefore ants can move onto tick t = 1</li>
                    <li>If an ant reaches a configuration where it is trapped at tick t = k, then it must have been un-trapped in its previous configuration t = k - 1</li>
                    <li>Each ants movement allows it to turn around 180º so an ant at tick t = k can always revert to the same position it was in at t = k - 1, just facing the opposite direction</li>
                    <li>This is a contradiction as it can't be trapped at t = k as it can still move. Therefore from any un-trapped configuration an ant cannot become trapped.</li>
                </ul>

                <p className="pt-4">
                    It's important to note that ant's can be in the same space at the same time so do not block the movement of other ants. If this was not the case it would be possible for ants to become trapped.
                </p>
            </Collapsible>
        </div>

        <br />

        <h2 className="text-4xl" id="diffusing">Pheromone Diffusing</h2>
        <br />

        <p>
            After each step in the simulation the pheromones are diffused and have their values reduced. This is to try and simulate how the pheromones would diffused in real life. To achieve this the pheromone map is blurred using a simple box blur. The values are then divided by a constant (e.g. 1.1) to reduce the total number of pheromones in the simulation, without which would lead to the entire pheromone map having the max value after an extended amount of time.
        </p>

        <h4 className="text-xl font-bold pt-4">Box Blur Algorithm</h4>

        <p>
            A box blur is where the value of a given pixel is set to the average of the surrounding pixels.
        </p>

        <p>
            A naïve implementation would simply create a new grid for the blurred image to be stored in, for each pixel in the original photo sum the surrounding pixels and set the value in the new image to the average. This can a long runtime however as each pixel is sampled multiple times. For example, a <b>m</b> x <b>n</b> image blurred with radius <b>r</b>, has number of accesses are in the order of:
        </p>

        <div className="text-xl overflow-auto">
            <Latex>{`$$\\mathcal{O}(m*n*(2*r+1)^2) = \\mathcal{O}(m*n*r^2)$$`}</Latex>
        </div>

        <p>
            To reduce the number of times a pixel is sampled the blur is run twice, once in the horizontal direction and once in the vertical.
        </p>

        <ImageSwapper srcs={[blur1, blur2]} alt="example of bluring a simple image"/>
        
        <p>This reduces the number of times the array is accessed so that it's in the order of:</p>

        <div className="text-xl overflow-auto">
            <Latex>{`$$\\mathcal{O}(2*m*n*(2*r+1)) = \\mathcal{O}(m*n*r)$$`}</Latex>
        </div>

        <p>
            This can be further optimized using an accumulator but it was running fast enough that I didn't bother.
        </p>

        <p className="py-3">
            Below is the code for blurring an image in only one channel <b>c</b>. In the actual code only channels <b>0</b> and <b>1</b> are blurred as the third channel <b>2</b> is unused so is wasted computation.
        </p>

        <CodeSnippet code={AntSimBlur} />

        <br />

        <h2 className="text-4xl" id="criticisms">Criticisms</h2>
        <br />

        <p>Sadly this project doesn't really work.</p>
        <p>
            The ants move around almost randomly and don't collect the food as I would have liked. They instead fill the map with pheromones and don't achieve anything. I've added multiple elements to the simulation to try and improve it but none of them helped.
        </p>

        <ul className="list-disc pl-8">
            <li>A blur frequency so that the pheromones don't get blurred every tick</li>
            <li>A weight so that ants are biased to move in the direction they are currently traveling</li>
            <li>A view radius to the ants so that they can see move then one square ahead of them</li>
        </ul>

        <p className="pt-4">
            None of these have made much difference. I think this is because the issue is with how the pheromones are implemented. They don't actually direct the ants because they end up everywhere and become concentrated in a large area around the home, leading to ants moving randomly once they are close to the home.
        </p>
        
        <p className="pt-2">
            They also don't direct ants when there is a clear path as they have no direction. This leads to the ants not folling the paths so they never get renforced enough to correctly renforce behaviour.
        </p>

        <div className="md:flex">
            <img className="p-2 md:w-1/3" src={gif1} alt="ant walks correctly"/>
            <img className="p-2 md:w-1/3" src={gif2} alt="ant follows collecting ant lost"/>
            <img className="p-2 md:w-1/3" src={gif3} alt="ant gets lost"/>
        </div>

    </div>);
}

export default Content;