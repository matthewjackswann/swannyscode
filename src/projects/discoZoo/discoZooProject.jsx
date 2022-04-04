import {Link} from "react-scroll";
import image1 from "./example1.png";
import image2 from "./example2.png";
import image3 from "./example3.png";
import { MathComponent } from 'mathjax-react';

const Component = () => {
    return (
        <div>
            <h1>Disco Zoo Solver</h1>
            <p>January 15, 2022</p><br />
            <p>
                Disco Zoo is an app where the aim is to collect animals to grow your zoo. You do this by visiting
                each group of animals habitat and find them in the grid. Each animals has its own unique shape
                which can be used to help find it. When you arrive at a habitat you are told the animals currently
                there and it's up to you to uncover their shape before you run out of turns.
            </p>
            <p>
                It's quite easy to make educated guesses if you can remember the pattern of each animal but with 
                multiple animals it can be hard to keep track of the possible places each should be in.
            </p><br />
            <p>I've split the explanation into the following sections:</p>
            <ul>
                <li><Link to="rules" spy={true} smooth={true}>Rules of Disco Zoo</Link></li>
                <li><Link to="squareExpectancy" spy={true} smooth={true}>Calculating square expectancy</Link></li>
                <li><Link to="maxScore" spy={true} smooth={true}>Maximizing total score</Link></li>
            </ul><br />
            <h2 id="rules">Rules of Disco Zoo</h2>
            <p>When visiting a habitat you are show the following:</p>
            <img src={image1} alt="filler"/>
            <p>
                To collect an animal you must pick all the squares that animal is on before you run out of turns.
                Each animal has a unique shape which is the same throughout the game.
            </p>
            <p>
                Below is a view of a grid once some animals have been found. //todo get one animal and not another    
            </p>
            <img src={image2} alt="filler"/>
            <p>
                It is always better value to get an animal if you can however if it's impossible to get any more
                animals then it's best to aim for empty spaces as these sometimes have coins on them (very few coins
                so theres no point in aiming for them unless turns {'<'} animal squares remaining).
            </p><br />
            <p>
                Different animals have different rarities with higher and lower value animals. The aim of the game
                it to collect the maximum number of each animal to make you zoo as big as possible.
            </p>
            <p>Now the basic rules are covered I can explain how the value of each square is calculated.</p><br />
            <h2 id="squareExpectancy">Calculating square expectancy</h2>
            <p>
                Because we know the animals present in the grid and each of their shape we can calculate how likely it
                is for any square to contain any animal.
            </p>
            <p>
                First a list of all the possible grids are considered. This is reduced into a grid of key value pairs.
                (e.g. If square 1 has a cow in 10 of the possible grids and a sheep in 5 of the possible grids, then 
                square 1 will have the key value pairs {'{cow: 10, sheep, 5}'})
            </p><br />
            <p>
                To generate the list of all grids a recursive algorithm is used, adding a new animal in each
                recursion.
            </p><br />
            <p>
                If only one animal is given then it's possible positions are calculated using that animals
                width and height. This list of possible grids is then returned.
            </p>
            <p>
                If more then one animal is given then the possible positions of the last n-1 animals are calculated.
                For each of these possible grids, any place the first animal fits is added to the list of possible 
                grids. This list is then returned.
            </p>
            <p>
                We can quickly prove by induction that this returns a list of all possible grids.
                First to prove it creates a list of valid grids
            </p><br />
            <MathComponent tex={String.raw`
\begin{eqnarray}
&Let\; Grids(A)\; be\; the\; list\; of\; possible\; grids\; given\; a\; list\; of\; animals\; A\\
&Let\; A\; be\; a\; list\; of\; n\; animals\; such\; that\; A = \{a_{1}, a_{2}, ..., a_{n}\} \\
&Let\; Add(G, a)\; be\; the\; list\; of\; grids\; with\; a\; added\; to\; g\; in\; G\; where\; each\; grid\; is\; valid \\ \\
&Base\; case:\; n = 0 \\
&Trivial\; as\; this\; is\; a\; list\; with\; a\; single,\; empty\; grid\; element \\
&Assuming\; true\; for\; n = k - 1, consider\; n = k \\
&Let\; G' = Grids(A[1:]) = Grids(\{a_{2}, ..., a_{n}\}) \\
&By\; the\; induction\; hypothesis\; G'\; is\; a\; valid\; set\; of\; grids \\
&G = Add(G', a_{1})\; is\; a\; list\; of\; valid\; grids\; by\; definition\; of\; Add(G, a) \\
&Therefore\; G\; is\; a\; set\; of\; valid\; grids\;
\end{eqnarray}`} />
        <p>And to prove that all possible grids are contained within the output of the function</p>
        <MathComponent tex={String.raw`
\begin{eqnarray}
&Assume\; there\; is\; a\; valid\; grid\; g\; not\; in\; the\; output\; set\; G \\
&g\; is\; made\; up\; by\; a\; combination\; of\; animals\; A = \{a_{1}, a_{2}, ..., a_{n}\} \\
&If\; each\; animals\; is\; removed\; from\; the\; start\; of\; the\; list\; considering\; the\; following: \\
&g_{1}\; with\; animals\; A_{1} = \{a_{2}, ..., a_{n}\} \\
&g_{2}\; with\; animals\; A_{2} = \{a_{3}, ..., a_{n}\} \\
&... \\
&g_{n-1}\; with\; animals\; A_{n-1} = \{a_{n}\} \\
&It's\; clear\; to\; see\; that\; g_{n-1} \in Grids(A_{n-1}) \\
&This\; can\; be\; continued\; until\; g \in Grids(A) \\
&Therefore\; our\; assumption\; is\; incorrect\; and\; by\; contradiction\; g \ni G \\
&So\; there\; are\; no\; valid\; grids\; g \notin G \Rightarrow G\; is\; the\; set\; of\; all\; possible\; grids
\end{eqnarray}`} />
            <p>Below is the code used to generate this list</p>
            <pre className="code"><code><span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>const</span><span style={{color: 'rgb(56, 58, 66)'}}> getPossibleGrids </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>animals</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>=&gt;</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>if</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>animals</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(228, 86, 73)'}}>length</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>===</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>return</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>[</span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span><span style={{color: 'rgb(56, 58, 66)'}}>]</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>const</span><span style={{color: 'rgb(56, 58, 66)'}}> animalMaxX </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> gridSize </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>1</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>-</span><span style={{color: 'rgb(56, 58, 66)'}}> animalInfo</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(228, 86, 73)'}}>animals</span><span style={{color: 'rgb(56, 58, 66)'}}>[</span><span style={{color: 'rgb(56, 58, 66)'}}>animals</span><span style={{color: 'rgb(56, 58, 66)'}}>[</span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>]</span><span style={{color: 'rgb(56, 58, 66)'}}>]</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(228, 86, 73)'}}>width</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>const</span><span style={{color: 'rgb(56, 58, 66)'}}> animalMaxY </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> gridSize </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>1</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>-</span><span style={{color: 'rgb(56, 58, 66)'}}> animalInfo</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(228, 86, 73)'}}>animals</span><span style={{color: 'rgb(56, 58, 66)'}}>[</span><span style={{color: 'rgb(56, 58, 66)'}}>animals</span><span style={{color: 'rgb(56, 58, 66)'}}>[</span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>]</span><span style={{color: 'rgb(56, 58, 66)'}}>]</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(228, 86, 73)'}}>height</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>let</span><span style={{color: 'rgb(56, 58, 66)'}}> newGrids </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>[</span><span style={{color: 'rgb(56, 58, 66)'}}>]</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>let</span><span style={{color: 'rgb(56, 58, 66)'}}> partialGrids </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(64, 120, 242)'}}>getPossibleGrids</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>animals</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>slice</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(183, 107, 1)'}}>1</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} list of grids with the next n-1 animals</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>partialGrids</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>forEach</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>grid</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>=&gt;</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(166, 38, 164)'}}>let</span><span style={{color: 'rgb(56, 58, 66)'}}> topX </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> topX </span><span style={{color: 'rgb(166, 38, 164)'}}>&lt;</span><span style={{color: 'rgb(56, 58, 66)'}}> animalMaxX</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> topX</span><span style={{color: 'rgb(166, 38, 164)'}}>++</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(166, 38, 164)'}}>let</span><span style={{color: 'rgb(56, 58, 66)'}}> topY </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> topY </span><span style={{color: 'rgb(166, 38, 164)'}}>&lt;</span><span style={{color: 'rgb(56, 58, 66)'}}> animalMaxY</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span><span style={{color: 'rgb(56, 58, 66)'}}> topY</span><span style={{color: 'rgb(166, 38, 164)'}}>++</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(166, 38, 164)'}}>let</span><span style={{color: 'rgb(56, 58, 66)'}}> g </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span><span style={{color: 'rgb(166, 38, 164)'}}>...</span><span style={{color: 'rgb(56, 58, 66)'}}>grid</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>g</span><span style={{color: 'rgb(56, 58, 66)'}}>[</span><span style={{color: 'rgb(56, 58, 66)'}}>animals</span><span style={{color: 'rgb(56, 58, 66)'}}>[</span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>]</span><span style={{color: 'rgb(56, 58, 66)'}}>]</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span><span style={{color: 'rgb(228, 86, 73)'}}>x</span><span style={{color: 'rgb(166, 38, 164)'}}>:</span><span style={{color: 'rgb(56, 58, 66)'}}> topX</span><span style={{color: 'rgb(56, 58, 66)'}}>,</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(228, 86, 73)'}}>y</span><span style={{color: 'rgb(166, 38, 164)'}}>:</span><span style={{color: 'rgb(56, 58, 66)'}}> topY</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(166, 38, 164)'}}>if</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(64, 120, 242)'}}>checkGrid</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>g</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(56, 58, 66)'}}>{"{"}</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}>{"//"} checks if the grid is valid</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>newGrids</span><span style={{color: 'rgb(56, 58, 66)'}}>.</span><span style={{color: 'rgb(64, 120, 242)'}}>push</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>g</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"                "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span><span style={{color: 'rgb(56, 58, 66)'}}>)</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>return</span><span style={{color: 'rgb(56, 58, 66)'}}> newGrids</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"}"}</span><span style={{color: 'rgb(56, 58, 66)'}}>;</span>
            </span></code></pre>
            <p>
                This is then reduced into a 5x5 grid of key value pairs with the frequency of each animal.
                The score of each square is then calculated using the following simple formula:
            </p>
            <MathComponent tex={String.raw`
\begin{eqnarray}
&Let\; V_{a} = users\; set\; value\; of\; animal\; a \\
&Let\; S_{a} = frequency\; of\; animal\; a\; in\; the\; given\; square\; \\
&Let\; A = list\; of\; animals \\
&Score = \sum_{a \in A} V_{a} * S_{a}
\end{eqnarray}`} />
            <p>
                This allows me to rank the squares in order of expected returns, with larger numbers
                meaning higher chance of higher value animals. You could use this to inform your square choice
                alone, however it's not an optimal strategy for reasons I'll cover next.
            </p><br />
            <h2 id="maxScore">Maximizing total score</h2>
            <p>
                With an infinite number of turns, picking the squares with the greatest expectancy is an efficient way
                to find all the animals. We are however limited to only 10 turns, meaning it can be advantageous to
                pick squares with lower expectancy.
            </p><br />
            <p>
                For example, given the following grid with darkened squares being hidden and each squares expectancy shown.
                If we only have 4 turns left we can't afford to miss a single square as we won't get all the sheep squares
                and so won't be able to get the animal. This means it's actually better to go for the squares with lower
                expectancy as we can either guarantee getting the sheep or have the most remaining turns to maximize profit
                from blank squares.
            </p>
            <img src={image3} alt="filler"/>
            <p>To account for this I have summarized the scoring of each animal to the following:</p>
            <ul>
                <li>
                    If turns {">"} remaining animal squares use expectancy contribution as normal
                </li>
                <li>
                    If turns = remaining animal squares then expectancy is divided by the frequency of the given
                    square. This means that the more probable squares will have a lower expectancy contribution
                </li>
                <li>
                    If turns {"<"} remaining animal squares then expectancy contribution is zero. Knowing a square is 
                    an animal can give additional info which aids other animal finding but it's not prioritized in any way.
                </li>
                <li>
                    If turns {"<"} remaining animal squares for all animals then expectancy contribution for all animals
                    is -1. This means that blank squares are prioritized as they are the only way of making money.
                </li>
            </ul>
            <p>
                This isn't necessarily the optimal way but it's the best I can come up with
            </p><br />
            <p>
                In the end I'm very happy with how it works algorithmically however the graphics still leave a lot
                to be desired. I might fix this in the future but it's just CSS and not really a priority to me; I'd
                rather work on some new different projects.
            </p>
        </div>
    );
}
 
export default Component;