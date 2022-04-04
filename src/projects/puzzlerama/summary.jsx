// import {Link} from "react-scroll";

const Component = () => {
    return (
        <div id="summary">
            <p>I want to focus on the algorithms used to solve these problems so the supporting code can be
                questionable at times. It doesn't always follow best practices as it was put together to allow the
                algorithms to work and is not 100% reliable.
            </p><br />
            <p>
                Currently I only have solvers for pipes1. I intend to add more puzzles in the future when I come up with
                a <i>good</i> algorithm to implement.
            </p><br />
            {/* <p>I have automatic solvers for the following puzzles:</p>
            <ul>
                <li><Link to="pipes1" spy={true} smooth={true}>Pipes 1</Link></li>
            </ul> */}
            <p>For all the source code as well as instructions on how to run this code visit the <a href="https://github.com/matthewjackswann/puzzlerama">github</a></p>
        </div>
    );
}
 
export default Component;