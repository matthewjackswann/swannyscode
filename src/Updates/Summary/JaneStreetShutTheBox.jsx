import ExternalLink from "../../MainComponents/ExternalLink";
import gif from "../Media/shut_the_box.gif";

function Update1() {
    return <div>
        <p>
            I managed to solve the Shut the Box puzzle from Jane Street, and also managed to submit the correct number this time! The puzzle can be found <ExternalLink href="https://www.janestreet.com/puzzles/shut-the-box-index/">here</ExternalLink>.
        </p>

        <p>
            The puzzle consists of following a set of rules to find the net of a cuboid from a grid. This can then be folded up to get the answer to the puzzle. The main tricks are to eliminate tiles next to arrow tiles which aren't being pointed to, and to ensure that the net is fully connected. There are also some tiles which may or may not be part of the net, which I removed when they were in the way during folding.
        </p>

        <p>
            I wrote a net folding webapp to help me with the final step, you can find it on <ExternalLink href="https://github.com/matthewjackswann/janestreet-puzzles">my Github</ExternalLink>
        </p>

        <img src={gif} className="mx-auto w-full max-w-xl invert dark:invert-0" alt="Jane Street Shut the Box folding demo" />
    </div>;
}

export default Update1;