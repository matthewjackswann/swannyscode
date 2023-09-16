import InPageLink from "../../Components/InPageLink";
import Latex from "react-latex-next";

// todo section on transforms meaning F vs f etc.

function DiscoZoo() {

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
            The full code is available on github <span className="text-[red]">todo link</span>. It's still work in progress as none of the usual (by hand) algorithms are implemented, but I'm planning on adding them in the future.
        </p>

        <p>
            {/* todo original plan multithreaded algorithms and using meet in the middle*/}
        </p>

        <ul className="list-disc pl-8">
            {[
                ["Motivation to pre-solve cubes", "presolve"],
                ["Representation of cubes", "cubes"],
                ["Generating the cubes", "generation"],
                ["Meet in the middle solving", "middle"],
                ["Webapp", "webapp"]
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
            Standard Rubik's cube solving algorithms work by reducing the number of turns the cube is away from being solved <b>on average</b>. By pre-solving cubes it makes the point where an algorithm classes the cube as solved a lot sooner, and could potentially lead to a large reduction in the number of turns required.
        </p>

        {/* todo add img / graph here */}

        <br />

        <h2 className="text-4xl" id="cubes">Representation of cubes</h2>
        <br />

        <p className="pb-2">
            Cubes are stored as a vector of colours, with each position in the vector representing a specific face on the cube. Transforms are then represented as a mapping between the positions in the vector to a new vector. These mappings I calculated by hand in excel and are represented as a large static map internally.
        </p>

        <p className="pb-4">
            Applying a transform is as easy as looking up the colour stored at a specific index, for each index in the transformed cube.
        </p>

        {/* todo add code here */}

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
            This is done by considering all 24 orientations of a single cube and picking the one with the smallest vector. {/* todo by what comparison */} The cube colours need mapping again to prevent the same cube having different ids based on how you labeled you colours. This is done by mapping the center of the first face to 0, the second face to 1 etc.
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
            {/* todo section on how generated cubes are solved + then back to solution */}
        </p>
        <p>
            When pre-solving cubes we want to skip over cubes who's ids are already in the database. This is the largest improvement I've made in comparison to my old version. By only sending cubes which we know are likely not in the table already we save a lot of time during generation (6 million cubes can be generated in {/* todo record approx time */} rather then taking a day <span className="text-sm">(though this isn't the only optimisation)</span>).
        </p>
        <p>
            {/* todo section about reducible transforms */}
        </p>
        <p className="pt-3">
            Originally I generated the transforms to apply to a solved cube an encoding of numbers, allowing the next transform to be generated by simply adding 1 to the transform number. I then checked these against a regex which checked there were not reductions that could be made (<b>FfR</b> can be simplified to <b>R</b>). This worked well but could lead to long periods of time where the transforms were all reducible. (<b>Ff</b>RlUdRlUd is reducible and the next valid transform is <Latex>{`$\\approx 13^{8}$`}</Latex> transforms away). The regex I used was also missing some key simple cases which reduce the number of valid cubes further.
        </p>


        <h4 className="text-xl font-bold pb-2 pt-4">Better regex</h4> 
        <p>The original regex checked for the following:</p>
        <ul className="list-disc pl-8">
            <li>Transforms next to their inverse e.g. <Latex>{`$\\text{Ff} -> \\text{I}$`}</Latex></li>{/* todo arrow /  */}
            <li>Three or more identical transforms next to each other e.g. <Latex>{`$\\text{FFF} -> \\text{f}$`}</Latex></li>{/* todo arrow /  */}
        </ul>
        <p className="pt-4">
                I then expanded to to also cover the following cases. They can't be reduced, but they can be represented in the same number of transforms a different way (so only one needs to be covered):
        </p>
        <ul className="list-disc pl-8">
            <li>Independent transforms being ordered differently e.g. <Latex>{`$\\text{LR} = \\text{RL}$`}</Latex></li>
            <li>Multiple anti-clockwise transforms e.g. <Latex>{`$\\text{ff} = \\text{FF}$`}</Latex></li>
            <li>The first transform not being <Latex>{`$\\text{F}$`}</Latex> or <Latex>{`$\\text{f}$`}</Latex>. As orientation is removed <Latex>{`$\\text{FU}$`}</Latex> and <Latex>{`$\\text{UB}$`}</Latex> will produce the same cube id.</li>
        </ul>


        <h4 className="text-xl font-bold pb-2 pt-6">Generating from regex</h4>
        <p>
            Rather then using the regex to check if a transform is valid we can use the regex itself to generate the valid transforms. For every regex there is a finite state machine which describes the same language. Using this we can then run iterative DFS to extract all strings which match the regex.
        </p>

        <p className="pt-2">
            A finite state machine (FSM) is a collection of states with transitions between them. It starts in some initial state, and on each input the state changes based on the transition. These can be easily represented as a graph. 
        </p>

        {/* todo as FSM graph here */}
        <p className="pt-4">
            In this diagram a string is accepted if there is a valid transition which can be followed. This FSM accepts the words {/* todo */} and rejects the words {/* todo */}
        </p>

        <p className="pt-4">
            Rather then following edges given a string to check, we can follow the edges to generate strings which would be accepted. As they are accepted by the FMS, they must be accepted by the regex, and such must be a valid transform.
        </p>

        <p>
            We want the strings generated to slowly increase, such that the first lists of transforms are of length 1 then 2 etc. To do this we explore the FSM graph with iterative DFS. This will follow the left most path (up to a set distance) and keep backtracking {/* todo copy from somewhere */}. By increasing the depth when only the entire depth is explored, we ensure that all transforms of length <Latex>{`$n$`}</Latex> are considered before any transforms of length <Latex>{`$n+1$`}</Latex>.
        </p>

        {/* todo iterative dfs graph animation */}


        <br />

        <h2 className="text-4xl" id="middle">Meet in the middle solving</h2>
        <br />
        <p>
            Part way through this project I learnt about meet in the middle attacks used in cryptography. I decided to use this trick to solve the cube fully in the smallest number of transforms required. This can be pretty slow, but it ensures the generated solution cannot be any smaller.
        </p>
        <p>
            {/* meet in the middle explanation */}
        </p>
        {/* cube solution transform graph cube -> id -> transform -> id -> lookup -> transform... */}

        <br />

        <h2 className="text-4xl" id="webapp">Webapp</h2>
        <br />
        <p>
            I created a react frontend which can be used to apply transforms and solve the cube minimally. Requests are sent from the frontend describing the cube and the required operation, these are then fulfilled and the resultant cube is sent back.
        </p>

        {/* todo video of frontend + solve */}

        {/* reflections + next steps + testing + stats */}
    </div>)
}

export default DiscoZoo;