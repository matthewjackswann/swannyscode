import Latex from "react-latex-next";
import Gif from "../Media/janestreet_baseball.gif";

function JaneStreetBaseball() {
    return (<div>
        <p className="pb-4">
            My solution to the <a className="tc underline hover:text-primary dark:hover:text-primary-dark" href="https://www.janestreet.com/puzzles/robot-baseball-index/">Jane Street Robot Baseball puzzle.</a> In my infinite wisdom I submitted the wrong number so I'm not listed on the official leaderboard, but my solution is still valid! I hope I won't make the same mistake again...
        </p>

        <h2 className="text-3xl pt-4" id="rules">The Puzzle</h2>

        <p className="py-4">
            I'd recommend reading the puzzle first, but I will attempt to summarise it here:
        </p>

        <p>
            There are two robots playing baseball against each other. One batter and one pitcher. Both are trying to win (obviously) and have perfect strategy. Each pitch, the pitcher can choose to throw either a ball or a strike, while the batter can choose to wait or swing. The outcome of each pitch is determined by the combination of these choices:
        </p>

        <ul className="list-disc pl-8">
            <li>If the pitcher throws a ball and the batter waits, the count of balls is incremented by 1.</li>
            <li>If the pitcher throws a strike and the batter waits, the count of strikes is incremented by 1.</li>
            <li>If the pitcher throws a ball and the batter swings, the count of strikes is incremented by 1.</li>
            <li>If the pitcher throws a strike and the batter swings, with probability <Latex>{`$p$`}</Latex> the batter hits a home run and with probability <Latex>{`$1-p$`}</Latex> the count of strikes is incremented by 1.</li>
        </ul>

        <p className="pt-3">
            Each series of pitches (an "at-bat") continues until one of the following conditions is met:
        </p>

        <ul className="list-disc pl-8">
            <li>The count of balls reaches 4, in which case the batter receives 1 point.</li>
            <li>The count of strikes reaches 3, in which case the batter receives 0 points.</li>
            <li>The batter hits a home run, in which case the batter receives 4 points.</li>
        </ul>

        <p className="pt-3">
            The goal of the puzzle is to find the maximum probability that an at-bat will reach a full count (3 balls and 2 strikes) where <Latex>{`$p$`}</Latex> is picked to maximise this probability. We call the probability of reaching a full count <Latex>{`$q$`}</Latex>.
        </p>

        <h2 className="text-3xl pt-8" id="rules">My solution</h2>

        <p>
            My idea to solve this problem is first to create a function which given a probability <Latex>{`$p$`}</Latex>, computes <Latex>{`$q$`}</Latex>. Hopefully this will result in a smooth curve which we can then optimise over <Latex>{`$p$`}</Latex> to find the maximum value of <Latex>{`$q$`}</Latex>.
        </p>

        <h3 className="text-2xl pt-8 font-bold" id="rules">Calculating the probability of a strike</h3>

        <p className="pt-4">
            First let's create a table of the possible outcomes of an at-bat (we do this from the batter's perspective):
        </p>

        <div className="text-xl overflow-auto">
            <Latex>
                {`\\[
                \\begin{array}{c|cc}
                & \\textbf{Ball} & \\textbf{Strike} \\\\
                \\hline
                \\textbf{Wait} & \\text{Balls} + 1 & \\text{Strikes} + 1 \\\\
                    \\textbf{Swing} & \\text{Strikes} + 1 & 
                \\begin{array}{ll}
                    \\text{Points} + 4 \\; (\\text{prob. } p) \\\\
                    \\text{Strikes} + 1 \\; (\\text{prob. } 1 - p)
                \\end{array} \\\\
                \\end{array}
                \\]`}
            </Latex>
        </div>

        <p>
            Admittedly this isn't very helpful as we don't know the relative value of each outcome. The batter is trying to maximise the number of points, but how many points is increasing the balls or strikes worth?
        </p>

        <p className="pt-2">
            Lets represent the increase in points from a game starting with <Latex>{`$b$`}</Latex> balls and <Latex>{`$s$`}</Latex> strikes as <Latex>{`$X_{b,s}$`}</Latex>. We can express the expected number of points earned from this game state as <Latex>{`$E_{b,s}[X]$`}</Latex>. This allows us to rewrite the table above in terms of expected points:
        </p>

        <div className="text-xl overflow-auto">
            <Latex>
                {`\\[
                \\begin{array}{c|cc}
                & \\textbf{Ball} & \\textbf{Strike} \\\\
                \\hline
                \\textbf{Wait} & \\mathbb{E}_{b+1,s}[X] & \\mathbb{E}_{b,s+1}[X] \\\\
                \\textbf{Swing} & \\mathbb{E}_{b,s+1}[X] & 4p + (1 - p) \\cdot \\mathbb{E}_{b,s+1}[X] \\\\
                \\end{array}
                \\]`}
            </Latex>
        </div>

        <p>
            This now gives us a way to calculate <Latex>{`$E_{b,s}[X]$`}</Latex> using the table. The probability of each outcome is also parametrised by the number of balls and strikes, as the strategy might change depending on the game state. Therefore we can express <Latex>{`$E_{b,s}[X]$`}</Latex> as:
        </p>

        <div className="text-xl overflow-auto">
            <Latex>
                {`$$\\text{Pr}_{b,s}[\\text{wait}] \\cdot \\text{Pr}_{b,s}[\\text{ball}] \\cdot \\mathbb{E}_{b+1,s}[X] + \\text{Pr}_{b,s}[\\text{wait}] \\cdot \\text{Pr}_{b,s}[\\text{strike}] \\cdot \\mathbb{E}_{b,s+1}[X] + \\dots$$`}
            </Latex>
        </div>

        <p>
            Now we can calculate the probability of each outcome occurring. First we work out the expected points given the batter given that the pitcher throws a ball or a strike:
        </p>

        <div className="text-xl overflow-auto">
            <Latex>
                {`$$
                \\begin{align*}
                \\mathbb{E}_{b,s}[X \\mid \\text{wait}] 
                &= \\text{Pr}_{b,s}[\\text{ball}] \\cdot \\mathbb{E}_{b+1,s}[X] 
                + \\text{Pr}_{b,s}[\\text{strike}] \\cdot \\mathbb{E}_{b,s+1}[X] \\\\
                \\mathbb{E}_{b,s}[X \\mid \\text{swing}] 
                &= \\text{Pr}_{b,s}[\\text{ball}] \\cdot \\mathbb{E}_{b,s+1}[X] \\\\
                &\\quad + \\text{Pr}_{b,s}[\\text{strike}] \\cdot 4p \\\\
                &\\quad + \\text{Pr}_{b,s}[\\text{strike}] \\cdot (1 - p) \\cdot \\mathbb{E}_{b,s+1}[X]
                \\end{align*}
                $$`}
            </Latex>
        </div>

        <p>
            From the perspective of the batter, they will want to maximise the expected points from either outcome. Therefore we can conclude that
            <Latex>{`$\\; \\mathbb{E}_{b,s}[X \\mid \\text{wait}]  = \\mathbb{E}_{b,s}[X \\mid \\text{swing}]$`}</Latex>. As <Latex>{`$\\text{Pr}_{b,s}[\\text{ball}] = \\text{Pr}_{b,s}[\\text{strike}]$`}</Latex> we can derive an expression for the probability of a strike being thrown. This is fairly easy but a little tedious so I'll skip the algebra here and just present the final result:
        </p>

        <div className="text-xl overflow-auto">
            <Latex>
                {`$$
                \\text{Pr}_{b,s}[\\text{strike}] =
                \\frac{\\mathbb{E}_{b,s+1}[X] - \\mathbb{E}_{b+1,s}[X]}
                {2 \\cdot \\mathbb{E}_{b,s+1}[X] - \\mathbb{E}_{b+1,s}[X] - 4 p - (1 - p) \\cdot \\mathbb{E}_{b,s+1}[X]}
                $$`}
            </Latex>
        </div>
        
        <p>
            This isn't the most helpful as we don't know the value of <Latex>{`$\\mathbb{E}_{b,s}[X]$`}</Latex>. Luckily, we can also derive this expression:
        </p>

        <div className="text-xl overflow-auto">
            <Latex>
                {`$$
                \\begin{align*}
                \\mathbb{E}_{b,s}[X] 
                &= \\mathbb{E}_{b,s}[X \\mid \\text{swing}]\\text{Pr}_{b,s}[\\text{swing}] 
                + \\mathbb{E}_{b,s}[X \\mid \\text{wait}]\\text{Pr}_{b,s}[\\text{wait}] \\\\
                &= \\mathbb{E}_{b,s}[X \\mid \\text{wait}]\\big(\\text{Pr}_{b,s}[\\text{swing}] + \\text{Pr}_{b,s}[\\text{wait}]\\big) \\\\
                &= \\mathbb{E}_{b,s}[X \\mid \\text{wait}] \\\\[0.5em]
                \\mathbb{E}_{b,s}[X \\mid \\text{wait}] 
                &= \\text{Pr}_{b,s}[\\text{ball}] \\cdot \\mathbb{E}_{b+1,s}[X] 
                + \\text{Pr}_{b,s}[\\text{strike}] \\cdot \\mathbb{E}_{b,s+1}[X] \\\\
                \\mathbb{E}_{b,s}[X]
                &= (1 - \\text{Pr}_{b,s}[\\text{strike}]) \\cdot \\mathbb{E}_{b+1,s}[X] 
                + \\text{Pr}_{b,s}[\\text{strike}] \\cdot \\mathbb{E}_{b,s+1}[X] \\\\
                \\mathbb{E}_{b,s}[X]
                &= \\mathbb{E}_{b+1,s}[X] 
                + \\text{Pr}_{b,s}[\\text{strike}] \\cdot \\big(\\mathbb{E}_{b,s+1}[X] - \\mathbb{E}_{b+1,s}[X]\\big)
                \\end{align*}
                $$`}
            </Latex>
        </div>

        <p>
            As the at-bat ends when <Latex>{`$b = 4$`}</Latex> or <Latex>{`$s = 3$`}</Latex> we have two base cases:
        </p>

        <div className="text-xl overflow-auto">
            <Latex>
                {`$$\\mathbb{E}_{4,s}[X] = 1 \\quad \\text{and} \\quad \\mathbb{E}_{b,3}[X] = 0$$`}
            </Latex>
        </div>

        <p>
            This is great, as we can calculate <Latex>{`$\\text{Pr}_{b,s}[\\text{strike}]$`}</Latex> for any <Latex>{`$(b,s)$`}</Latex> pair, as our equations only depend on states with higher balls or strikes. We can use it to calculate the probability of reaching a full count. Using the same logic we can derive <Latex>{`$\\text{Pr}_{b,s}[\\text{swing}]$`}</Latex> which by symmetry is equal to <Latex>{`$\\text{Pr}_{b,s}[\\text{strike}]$`}</Latex>.
        </p>

        <h3 className="text-2xl pt-8 font-bold" id="rules">Calculating the probability of a full count at-bat</h3>

        <p className="py-4">
            Previously we recursively calculated the value of <Latex>{`$\\mathbb{E}_{b,s}[X]$`}</Latex> by evaluating <Latex>{`$\\mathbb{E}_{b+1,s}[X]$`}</Latex> and <Latex>{`$\\mathbb{E}_{b,s+1}[X]$`}</Latex>, until we hit one of our base cases which has a known payoff. To find the probability of an at-bat reaching a full count we can do the same just in the opposite direction.
        </p>

        <p>
            Let <Latex>{`$\\text{Pr}_{b,s}[Y]$`}</Latex> denote the probability of an at-bat reaching a state with <Latex>{`$b$`}</Latex> balls and <Latex>{`$s$`}</Latex> strikes. Let <Latex>{`$m_{b,s}$`}</Latex> be the probability of the number of balls increasing and <Latex>{`$n_{b,s}$`}</Latex> be the probability of the number of strikes increasing when in a state with <Latex>{`$b$`}</Latex> balls and <Latex>{`$s$`}</Latex> strikes.
        </p>

        <div className="text-xl overflow-auto">
            <Latex>
                {`$$\\text{Pr}_{b,s}[Y] = 
                \\left\\{
    \\begin{array}{ll}
      1,& \\text{for } b = s = 0 \\\\
      m_{b-1,0} \\cdot \\text{Pr}_{b-1,0}[Y],& \\text{for } b > 0 \\text{ and } s = 0 \\\\
      n_{0,s-1} \\cdot \\text{Pr}_{0,s-1}[Y],& \\text{for } b = 0 \\text{ and } s > 0 \\\\
      m_{b-1,s} \\cdot \\text{Pr}_{b-1,s}[Y] + n_{b,s-1} \\cdot \\text{Pr}_{b,s-1}[Y],& \\text{for } b > 0 \\text{ and } s > 0
    \\end{array}
    \\right\\}
    $$`}
            </Latex>
        </div>

        <p>
            Notice <Latex>{`$\\text{Pr}_{0,0}[Y]$`}</Latex> is the start of the at-bat so has probability 1 of being reached.
        </p>

        <p>
            Using the table from before, it's quite easy to calculate <Latex>{`$m_{b,s}$`}</Latex> and <Latex>{`$n_{b,s}$`}</Latex>:
        </p>

        <div className="text-xl overflow-auto">
            <Latex>
                {`$$
                \\begin{array}{c|cc}
                & \\textbf{Ball} & \\textbf{Strike} \\\\
                \\hline
                \\textbf{Wait} & \\text{Balls} + 1 & \\text{Strikes} + 1 \\\\
                    \\textbf{Swing} & \\text{Strikes} + 1 & 
                \\begin{array}{ll}
                    \\text{Points} + 4 \\; (\\text{prob. } p) \\\\
                    \\text{Strikes} + 1 \\; (\\text{prob. } 1 - p)
                \\end{array} \\\\
                \\end{array}
                $$`}
            </Latex>
        </div>

        <div className="text-xl overflow-auto">
            <Latex>
                {`$$
                \\begin{align*}
                m_{b,s} &= \\text{Pr}_{b,s}[\\text{wait}] \\cdot \\text{Pr}_{b,s}[\\text{ball}] \\\\[0.5em]
                n_{b,s} &= \\text{Pr}_{b,s}[\\text{wait}] \\cdot \\text{Pr}_{b,s}[\\text{strike}] + \\text{Pr}_{b,s}[\\text{swing}] \\cdot \\big(\\text{Pr}_{b,s}[\\text{ball}] + (1-p) \\cdot \\text{Pr}_{b,s}[\\text{strike}]\\big)
                \\end{align*}
                $$`}
            </Latex>
        </div>

        <p>
            Now we just need to compute <Latex>{`$\\text{Pr}_{0,0}[Y]$`}</Latex> using the equations above to find the probability of reaching a full count at-bat for a given <Latex>{`$p$`}</Latex>. This would be a lot of work to do by hand, but I just used python so it was easy. Now we just need a way to find the value of <Latex>{`$p$`}</Latex> which maximises this probability.
        </p>

        <p className="pt-4">
            First I plotted the curve to see what it looks like. As it's a smooth curve with one obvious peak we can use simple algorithm to find the maximum value of <Latex>{`$q$`}</Latex>. First we pick two points at the start and end of the range of possible <Latex>{`$p$`}</Latex> values (0 and 1). We then evaluate the function at <Latex>{`$1/3$`}</Latex> and <Latex>{`$2/3$`}</Latex> along the difference between the start and end values. Depending on which side has a higher value, we discard the other range and update the corresponding bound. We repeat this process until the difference between the start and end points is sufficiently small.
        </p>

        <img className="mx-auto max-w-2xl dark:invert py-4" src={Gif} alt="a graph of Q against P" />

        <p>
            This results in our answer:
        </p>

        <div className="text-xl overflow-auto">
            <Latex>
                {`$$
                \\begin{align*}
                p &\\approx 0.22697323113157 \\\\
                q &\\approx 0.29596799337427
                \\end{align*}
                $$`}
            </Latex>
        </div>

        <p>
            Which matches the answer given in the puzzle! If only I had submitted <Latex>{`$q$`}</Latex> instead of <Latex>{`$p$`}</Latex>.
        </p>

        <h3 className="text-xl pt-16" id="rules">Some notes on the code to compute this function</h3>

        <ul className="list-disc pl-8">
            <li>As all of these equations rely heavily on recursion I used caching to speed up computation. It would be easy to use dynamic programming to make it even more efficient, but it was fast enough for me to not bother.</li>
            <li>To prevent rounding errors accumulating from multiple floating point operations I used the python Fractions package. This saves the exact values as fractions instead of floating point numbers, and then convert to a float once at the end, saving a lot of precision.</li>
        </ul>

        <p className="py-2">
            The full code is available on <a className="tc underline hover:text-primary dark:hover:text-primary-dark" href="https://github.com/matthewjackswann/janestreet-puzzles#">my github.</a>
        </p>

    </div>);
}

export default JaneStreetBaseball;