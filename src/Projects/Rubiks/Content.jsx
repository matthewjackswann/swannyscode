import InPageLink from "../../Components/InPageLink";
import Latex from "react-latex-next";
import fsm from "./Media/fsm.png";
import fsmDFS from "./Media/fsmDfs.gif";
import solveProgression from "./Media/solve-progression.png"
import solveProgressionDark from "./Media/solve-progression-dark.png"
import cubeGenerator from "./Media/cube-generator.png";
import cubeGeneratorDark from "./Media/cube-generator-dark.png";
import generatorGraph from "./Media/generator_graph.png";
import generatorGraphDark from "./Media/generator_graph_dark.png";
import { TransformCode } from "./Media/code";
import CodeSnippet from "../../Components/CodeSnippet";

function Rubiks() {

    return (<div>
        <h1 className="text-5xl">Rubik's Cube Solver</h1>

        <p className="pb-4">September 16, 2023</p>

        <p className="pb-2">
            Part of a Rubik's cube solver I've been working on. It uses a meet in the middle style to solving the cube in the minimal number of moves.
        </p>

        <p>
            Making a Rubik's cube solver was one of the first larger programming projects I worked on before starting university. My original implementation always provided a solution but it wasn't always great.
        </p>

        <p className="pb-4">
            Both implementations use a database to cubes a few moves away from being solved, making it easy to solve a cube once it's within 6 turns of a solution. This project is greatly improved, making it more time and space efficient than the original. 
        </p>

        <p className="pb-2">
            The original motivation to create this implementation in Go, was for the easy to implement multi-threading. The plan was to implement several different solving algorithms and run them all in parallel, picking only the algorithm with the shortest number moves. Midway through development I started using a meet in the middle style solving method with is very slow but always produces a optimal solution. I plan on adding other solving methods (CFOP, Petrus, ZZ, Roux) in the future, but the work done so far is more than enough for a write up. This has made the parallel parts of the code pretty useless (as it's limited by the database) so I should have just skipped them entirely.
        </p>

        <p className="pb-2">
            The full code is available on github <span className="text-[red]">todo link</span>. It's still work in progress as none of the usual (by hand) algorithms are implemented, but I'm planning on adding them in the future.
        </p>

        <p className="pb-2">
            A lot of the transforms and graphs were calculated by hand in a <span className="text-[red]">google sheets</span>.
        </p>

        <ul className="list-disc pl-8">
            {[
                ["Motivation to pre-solve cubes", "presolve"],
                ["Representation of cubes", "cubes"],
                ["Generating the cubes", "generation"],
                ["Meet in the middle solving", "middle"],
                ["Webapp", "webapp"],
                ["Conclusion", "conclusion"]
            ].map(([label, l]) => <li key={l}>
                <InPageLink className="tc underline hover:text-primary dark:hover:text-primary-dark cursor-pointer" to={l}>{label}</InPageLink>
            </li>)}
        </ul>

        <br /><br /><br />

        <h2 className="text-4xl" id="presolve">Motivation to pre-solve cubes</h2>
        <br />
        <p>
            When solving a Rubik's cube it is easy to tell when it's solved. Each face is made up entirely of the same colour. It's also fairly easy to see when the cube is one or even two turns away from being solved. By saving cubes and their solutions in some form of lookup table, given a cube <span className="text-[red]">n</span> moves away from being solved, we can jump straight to the most efficient solution.
        </p>
        <p className="pt-3">
            Standard Rubik's cube solving algorithms work by reducing the number of turns the cube is away from being solved <b>on average</b>. By pre-solving cubes, we can treat cubes <b>n</b> moves away from being solved as effectively solved (since we can just look up the solution very fast). This could potentially lead to a large reduction in the number of turns required.
        </p>

        <img className="mx-auto w-full max-w-3xl p-4 rounded-md dark:hidden" src={solveProgression} alt="graph of solve distance against solve progression"/>
        <img className="mx-auto w-full max-w-3xl p-4 rounded-md hidden dark:block" src={solveProgressionDark} alt="graph of solve distance against solve progression"/>

        <br />

        <h2 className="text-4xl" id="cubes">Representation of cubes</h2>
        <br />

        <p className="pb-2">
            Cubes are stored as a vector of colours, with each position in the vector representing a specific face on the cube. Transforms are then represented as a mapping between the positions in the vector to a new vector. These mappings I calculated by hand in excel and are represented as a large static map internally.
        </p>

        <p className="pb-4">
            Applying a transform is as easy as looking up the colour stored at a specific index, for each index in the transformed cube. Each transform ("F", "L", "B", "R", "U", "D") represents rotating a specific face clockwise 90°. Their lower case versions represent rotating the face 90° in the anti-clockwise direction. The transforms "X", "Y", "Z" (and their lowercase counter parts) represent rotating the entire cube around the given axis. This changes the face that each of the base transforms act on as well.
        </p>

        <CodeSnippet className="my-4" code={TransformCode} />

        <h4 className="text-2xl font-bold pb-2">Representing colours</h4>
        <p>
            As we want to be able to solve cubes of different colours, each colour is represented by a single number 0-5. This allows any cube to be easily encoded in this form (as long as the colour {"->"} number mapping is consistent).
        </p>

        <h4 className="text-3xl pb-2 pt-6">Cube Ids</h4>
        <p>
            When saving cubes to the database, we want to store the cube in as little space as possible, allowing more cubes to be stored, and cubes to be solved faster.
        </p>

        <h4 className="text-2xl font-bold pb-2 pt-4">Orientation independence</h4>
        <p>
            Orientation is important to capture as it's crucial for solving the cube correctly. When looking up cubes in the database however, we want it to be abstracted so that all orientations have the same representation. This massively reduces the number of cubes described by a single cube id, with only 1 of them containing the information to solve all 24.
        </p>
        <p className="pt-2">
            This is done by considering all 24 orientations of a single cube and picking the one with the smallest vector (sorted by index). The cube colours need mapping again to prevent the same cube having different IDs based on how you labeled you colours. This is done by mapping the center of the first face to 0, the second face to 1 etc.
        </p>

        <h4 className="text-2xl font-bold pb-2 pt-4">Compression</h4>
        <p>
            It would be inefficient to save this list of 54 numbers as is, so they are compressed into a smaller 128-bit number.
        </p>
        <p>
            Due to how we colour each face, we no longer need the colour of each center face. This means we only need to encode the list of 48 numbers. This is done by treating the list as a 48 character long base 6 number.
        </p>

        <Latex>{`
            $$\\log_{2}{6^{48}} = 48\\log_{2}{6} = 48\\log_{2}{3 \\cdot 2} $$
            $$48(\\log_{2}{2} + \\log_{2}{3}) = 48 + 48\\log_{2}{3} \\approx 124.07 \\lt 128 $$
        `}</Latex>

        <p>
            Not all of the state space is used, so it's possible to compress the representation even further. As we require {"<"} 128 bits it was good enough for me and compressing even more is likely to make little difference due to byte alignment.
        </p>

        <br />

        <h2 className="text-4xl" id="generation">Generating the cubes</h2>
        <br />
        <p>
            Cubes are generated by transforming a solved cube, calculating the mapping to its rotation, and then reversing the resultant transform. This is then saved to the database along with the ID. If an ID is in the database then the solution is saved and can be directly applied to solve a cube. The transforms 
        </p>
        <img className="mx-auto w-full max-w-3xl p-4 rounded-md dark:hidden" alt="img of cubes being transformed into id state for saving to the database" src={cubeGenerator}/>
        <img className="mx-auto w-full max-w-3xl p-4 rounded-md hidden dark:block" alt="img of cubes being transformed into id state for saving to the database" src={cubeGeneratorDark}/>
        <p>
            When pre-solving cubes we want to skip over cubes who's IDs are already in the database. This is the largest improvement I've made in comparison to my old version. By only sending cubes which we know are likely not in the table already we save a lot of time during generation (6 million cubes can be generated in {/* todo record approx time */} rather then taking a day <span className="text-sm">(though this isn't the only optimisation)</span>).
        </p>
        <p>
            A set of transforms are reducible if they can be replaced with another smaller or equal set of transforms, and when applied to a cube result in the same ID. We want to reduce the number of reducible transforms considered as much as possible. They take time to process and are guaranteed to generate an ID which is already in the database.
        </p>
        <p className="pt-3">
            Originally, I generated the transforms to apply to a solved cube by encoding numbers (base 12 with each digit representing a different transform). This allows the next transform to be generated by simply adding 1 to the transform number. I then checked these against a regex which checked there were not reductions that could be made (<b>FfR</b> can be simplified to <b>R</b>). This worked well but could lead to long periods of time where the transforms were all reducible. (<b>Ff</b>RlUdRlUd is reducible and the next valid transform is <Latex>{`$\\approx 13^{8}$`}</Latex> transforms away). The regex I used was also missing some key simple cases which reduce the number of valid cubes further.
        </p>


        <h4 className="text-xl font-bold pb-2 pt-4">Better regex</h4> 
        <p>The original regex checked for the following:</p>
        <ul className="list-disc pl-8">
            <li>Transforms next to their inverse e.g. <Latex>{`$\\text{Ff} = \\text{I}$`}</Latex></li>
            <li>Three or more identical transforms next to each other e.g. <Latex>{`$\\text{FFF} = \\text{f}$`}</Latex></li>
        </ul>
        <p className="pt-4">
                I then expanded to to also cover the following cases. They can't be reduced, but they can be represented in the same number of transforms a different way (so only one needs to be covered):
        </p>
        <ul className="list-disc pl-8">
            <li>Independent transforms being ordered differently e.g. <Latex>{`$\\text{LR} = \\text{RL}$`}</Latex></li>
            <li>Multiple anti-clockwise transforms e.g. <Latex>{`$\\text{ff} = \\text{FF}$`}</Latex></li>
            <li>The first transform not being <Latex>{`$\\text{F}$`}</Latex> or <Latex>{`$\\text{f}$`}</Latex>. Orientation is removed so <Latex>{`$\\text{FU}$`}</Latex> and <Latex>{`$\\text{UB}$`}</Latex> will produce the same cube id.</li>
        </ul>


        <h4 className="text-xl font-bold pb-2 pt-6">Generating from regex</h4>
        <p>
            Rather then using the regex to check if a transform is valid we can use the regex itself to generate the valid transforms. For every regex there is a finite state machine which describes the same language. Using this we can then run iterative DFS to extract all strings which match the regex.
        </p>

        <p className="pt-2">
            A finite state machine (FSM) is a collection of states with transitions between them. It starts in some initial state (with an arrow with no source), and on each input the state changes based on the transition. These can be easily represented as a graph.
        </p>

        <img className="w-full max-w-xl my-4 mx-auto dark:invert" src={fsm} alt="graph of a fsm"/>
        <p className="pt-4">
            In this diagram a string is accepted if there is a valid transition which can be followed. This FSM accepts the words ["", "a", "ad", "b", "bc", "bcd", "be"] and rejects the words ["aa", "ac", "ae", "cd", "ade", "xyz", etc...]
        </p>

        <p className="pt-4">
            Rather then following edges given a string to check, we can follow the edges to generate strings which would be accepted. As they are accepted by the FMS, they must be accepted by the regex, and such must be a valid transform.
        </p>

        <p>
            We want the strings generated to slowly increase, such that the first lists of transforms are of length 1 then 2 etc. To do this we explore the FSM graph with Iterative Depth First Search (IDFM). This is a depth-limited version of depth-first search which is run repeatedly with an increasing depth limit. By increasing the depth when only the entire depth is explored, we ensure that all transforms of length <Latex>{`$n$`}</Latex> are considered before any transforms of length <Latex>{`$n+1$`}</Latex>.
        </p>

        <img className="w-full max-w-3xl my-4 mx-auto dark:invert" src={fsmDFS} alt="graph of a fsm"/>

        <p>
            Due to the nature of the regex I'm using, strings can be infinity extended. This means that walks in the graph can be infinity extended as well and IDFS will never reach a dead end. Below is the graph used to generate the transforms:
        </p>

        <img className="mx-auto w-full max-w-5xl p-4 rounded-md dark:hidden" src={generatorGraph} alt="graph of solve distance against solve progression"/>
        <img className="mx-auto w-full max-w-5xl p-4 rounded-md hidden dark:block" src={generatorGraphDark} alt="graph of solve distance against solve progression"/>

        <br />

        <h2 className="text-4xl" id="middle">Meet in the middle solving</h2>
        <br />
        <p>
            Part way through this project I learnt about meet in the middle attacks used in cryptography. I decided to use this trick to solve the cube fully in the smallest number of transforms required. This can be pretty slow, but it ensures the generated solution cannot be any smaller.
        </p>
        <p>
            {/* todo meet in the middle explanation */}
        </p>
        {/* todo cube solution transform graph cube -> id -> transform -> id -> lookup -> transform... */}

        <br />

        <h2 className="text-4xl" id="webapp">Webapp</h2>
        <br />
        <p>
            I created a react frontend which can be used to apply transforms and solve the cube minimally. Requests are sent from the frontend describing the cube and the required operation, these are then fulfilled and the resultant cube is sent back.
        </p>

        {/* todo video of frontend + solve */}

        <br />

        <h2 className="text-4xl" id="conclusion">Conclusion</h2>
        <br />

        <p className="pb-3">
            I'm very happy with this implementation and how much it's improved on the original version. It's one of my first projects I've done test-driven and it made it so much easier. With all the weird transformation maps, rotations and hardcoded value it would have been almost impossible to debug without the tests.
        </p>

        <ul className="list-disc pl-8">
            <li>    
                I can generate all cubes <span className="text-[red]">n</span> moves away from being solved in <span className="text-[red]">n</span> seconds.
            </li>
            <li>
                In a 1TB hard drive, I can store <span className="text-[red]">n</span> different cube IDs (generated from <span className="text-[red]">n</span> proposed transforms) and <span className="text-[red]">n</span> lookups can be performed per second.
            </li>
            <li>
                A cube with an optimal solution of size 20 (the largest possible according to gods number) takes <span className="text-[red]">n</span> to solve.
            </li>
        </ul>

        <p className="pt-4">There are a few things I'd like to change but don't really have the motivation to:</p>
        <ul className="list-disc pl-8">
            <li>    
                A lot of the multithreading stuff doesn't actually make the program any faster due to being slowed by the database access. Ideally I would replace it with a simpler, single threaded implementation but it's not broke so I'm not going to fix it.
            </li>
            <li>    
                It would be fun to try different databases to see if they were any more performant. Once all the cubes are pre-processed you could convert it to readonly and after a long restructure have a much faster lookup time (maybe).
            </li>
        </ul>

        <p className="pt-3">
            In the future I would like to make a rubik's cube solving robot. As the solve times with this implementation can be very long, I would have to implement some faster, non-optimal algorithms. I would add this to the same code base and still use the cube ID database but that would be another small project in itself.
        </p>
    </div>)
}

export default Rubiks;