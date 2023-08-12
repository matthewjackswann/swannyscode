import instructions from "../../Media/CTF/insaneBoltInstructions.png";
import maze from "../../Media/CTF/insaneBoltMaze.png";
import Collapsible from "../../../Components/Collapsible";
import CodeSnippet from "../../../Components/CodeSnippet";
import { InsaneBoltSolCode } from "../../Media/CTFCode";

function InsaneBolt() {

    return (<div>
        <p>
            This is one of the miscellaneous challenges from the HTB Uni CTF Qualifiers 2021.
        </p>

        <p className="pt-4">
            We are only given an ip address, a port number and the following description:
        </p>

        <p className="text-center mt-2 p-2 rounded-md tc bg-background-faded dark:bg-background-faded-dark">
            This insane scientist wants to craft the most powerful android in the world! Help him collect many 🔩 to achieve his goal. Also, he needs many 💎 to make it even more strong and powerful than any other android. Good luck adventurer!
        </p>

        <p className="pt-4">
            After connecting to the server using <b>netcat</b> we get the following text:
        </p>

        <img src={instructions} className="w-full" alt="instructions describing the puzzle. You must give the solution to the maze for the robot to reach the diamond" />
        <img src={maze} className="w-full" alt="a simple maze, bolts represent where the robot can move through and the diamond is the end destination"/>

        <p className="pt-2">
            When entering the path of the maze, if you take too long or are incorrect then the connection is closed. It therefore makes sense that the challenge is to write a program that can solve a number of mazes until enough diamonds and bolts have been collected.
        </p>

        <p className="py-2">
            I first wrote a python script that connects to the port and reads off the first maze. I then turns turns the maze   into a 2d array which can be searched to solve the maze.
        </p>

        <p>
            To solve the maze I used breadth-first search, where from the starting point we look at all of its neighbours. We then looks at all of their neighbours that haven't already been considered. This continues until the end is found. If the end is not connected to the start the maze is impossible and the program exits.
        </p>

        <p className="py-2">
            To find the path, we save the previous cell for each cell in the grid. To find a path to the start we can simply follow this chain of previous cells until we reach the start. This is then turned into instructions and sent to the server over the socket.
        </p>

        <p>
            We don't need to check for when we have solved all grid as we print the output after each step. When the server sends the flag the program will print it and throw an error (while trying to convert it into a grid. {"[it's not clean but it works :]"})
        </p>

        <p className="pt-6 pb-4">
            Full code below:
        </p>

        <Collapsible className="tc mb-4 p-2 bg-background-faded dark:bg-background-faded-dark rounded-md" header={<div className="text-lg font-bold">Responder.py</div>}>
            <CodeSnippet code={InsaneBoltSolCode}/>
        </Collapsible>

    </div>);
}

export default InsaneBolt;