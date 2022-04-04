import image1 from "./example1.png";
import image2 from "./example2.png";
import stats1 from "./img1.png";
import stats2 from "./img2.png";
import stats3 from "./img3.png";
import { useState } from "react";

const Component = () => {

    const [imgSelected, setImgSelected] = useState(0);

    return (
        <div>
            <h1>Wordle Solver</h1>
            <p>February 12, 2022</p><br />
            <p>
                The aim of wordle is to guess the word in as few turns as possible. The approach I took was to pick the
                most probable word and use the results of that to reduce the number of possible words.<br />
                I also split my decisions into two parts, the first to try and gain more information and the 
                second to try and find the correct word.
            </p><br />
            <p>
                I used a word list I found online on <a href="https://github.com/charlesreid1/five-letter-words/blob/master/sgb-words.txt">github</a>
            </p>
            <br />
            <h2>Scoring Words</h2>
            <p>
                I decided to score each word by maximizing the most common characters in the most common position. To
                do this the total number of each character in each position is calculated and this is used to score
                each word. The word with the largest score is then calculated.
            </p>
            <pre className="code"><code><span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># scores a word given the frequency of each letter in each position</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>def</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(64, 120, 242)'}}>scoreWord</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>word</span><span style={{color: 'rgb(56, 58, 66)'}}>, </span><span style={{color: 'rgb(56, 58, 66)'}}>counts</span><span style={{color: 'rgb(56, 58, 66)'}}>):</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>score </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> i, c </span><span style={{color: 'rgb(166, 38, 164)'}}>in</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(1, 132, 188)'}}>enumerate</span><span style={{color: 'rgb(56, 58, 66)'}}>(word):</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>score </span><span style={{color: 'rgb(166, 38, 164)'}}>+=</span><span style={{color: 'rgb(56, 58, 66)'}}> counts[i][c]</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>return</span><span style={{color: 'rgb(56, 58, 66)'}}> score</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># counts the frequency of each letter in each position</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># and returns the word corresponding to the highest score</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>def</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(64, 120, 242)'}}>wordle</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>wordList</span><span style={{color: 'rgb(56, 58, 66)'}}>):</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>counts </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> [{"{"}{"}"}, {"{"}{"}"}, {"{"}{"}"}, {"{"}{"}"}, {"{"}{"}"}]</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> word </span><span style={{color: 'rgb(166, 38, 164)'}}>in</span><span style={{color: 'rgb(56, 58, 66)'}}> wordList:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> i, c </span><span style={{color: 'rgb(166, 38, 164)'}}>in</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(1, 132, 188)'}}>enumerate</span><span style={{color: 'rgb(56, 58, 66)'}}>(word): </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># character c in position i</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(56, 58, 66)'}}>counts[i][c] </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> counts[i].</span><span style={{color: 'rgb(64, 120, 242)'}}>get</span><span style={{color: 'rgb(56, 58, 66)'}}>(c, </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>) </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>1</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># increased the count by 1</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>return</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(1, 132, 188)'}}>max</span><span style={{color: 'rgb(56, 58, 66)'}}>(wordList, </span><span style={{color: 'rgb(56, 58, 66)'}}>key</span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(166, 38, 164)'}}>lambda</span><span style={{color: 'rgb(56, 58, 66)'}}> word: </span><span style={{color: 'rgb(64, 120, 242)'}}>scoreWord</span><span style={{color: 'rgb(56, 58, 66)'}}>(word, counts))</span>
            </span></code></pre>
            <p>
                This works quite well but for the word list I'm using the suggested word is: <b><i>SORES</i></b><br />
                Sadly this is not optimal as the character <b><i>S</i></b> is repeated twice so information is only
                found out about 4 characters instead of 5. While this seems to have little impact, if we know the 5th
                character is not in the word then the word list can have all words with that character in it removed,
                massively reducing the remaining possible options
            </p><br />
            <p>
                To prevent this I created a second wordle function called wordle ignore. This penalizes words with
                duplicate characters by scoring them as <b>(score / count)</b>.
            </p>
            <p>
                Additionally, it also takes a list of characters which information is already known about. These have
                their scores set to 0 so that other characters are much more likely to be chosen.
            </p>
            <pre className="code"><code><span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># scores a word given the frequency of each letter in each position.</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># decreases score on repeated letters to get larger coverage of letters</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>def</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(64, 120, 242)'}}>scoreWordIgnore</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>word</span><span style={{color: 'rgb(56, 58, 66)'}}>, </span><span style={{color: 'rgb(56, 58, 66)'}}>counts</span><span style={{color: 'rgb(56, 58, 66)'}}>):</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>score </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> i, c </span><span style={{color: 'rgb(166, 38, 164)'}}>in</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(1, 132, 188)'}}>enumerate</span><span style={{color: 'rgb(56, 58, 66)'}}>(word):</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(56, 58, 66)'}}>score </span><span style={{color: 'rgb(166, 38, 164)'}}>+=</span><span style={{color: 'rgb(56, 58, 66)'}}> counts[i][c] </span><span style={{color: 'rgb(166, 38, 164)'}}>{"//"}</span><span style={{color: 'rgb(56, 58, 66)'}}> (word.</span><span style={{color: 'rgb(64, 120, 242)'}}>count</span><span style={{color: 'rgb(56, 58, 66)'}}>(c))</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>return</span><span style={{color: 'rgb(56, 58, 66)'}}> score</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}> </span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># counts the frequency of each letter in each position ignoring the set of letters</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(160, 161, 167)', fontStyle: 'italic'}}># information is already known about and returns the highest scoring word</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(166, 38, 164)'}}>def</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(64, 120, 242)'}}>wordleIgnore</span><span style={{color: 'rgb(56, 58, 66)'}}>(</span><span style={{color: 'rgb(56, 58, 66)'}}>wordList</span><span style={{color: 'rgb(56, 58, 66)'}}>, </span><span style={{color: 'rgb(56, 58, 66)'}}>ignore</span><span style={{color: 'rgb(56, 58, 66)'}}>):</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(56, 58, 66)'}}>counts </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> [{"{"}{"}"}, {"{"}{"}"}, {"{"}{"}"}, {"{"}{"}"}, {"{"}{"}"}]</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> word </span><span style={{color: 'rgb(166, 38, 164)'}}>in</span><span style={{color: 'rgb(56, 58, 66)'}}> wordList:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> i, c </span><span style={{color: 'rgb(166, 38, 164)'}}>in</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(1, 132, 188)'}}>enumerate</span><span style={{color: 'rgb(56, 58, 66)'}}>(word):</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(56, 58, 66)'}}>counts[i][c] </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> counts[i].</span><span style={{color: 'rgb(64, 120, 242)'}}>get</span><span style={{color: 'rgb(56, 58, 66)'}}>(c, </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span><span style={{color: 'rgb(56, 58, 66)'}}>) </span><span style={{color: 'rgb(166, 38, 164)'}}>+</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>1</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> c </span><span style={{color: 'rgb(166, 38, 164)'}}>in</span><span style={{color: 'rgb(56, 58, 66)'}}> ignore:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"        "}</span><span style={{color: 'rgb(166, 38, 164)'}}>for</span><span style={{color: 'rgb(56, 58, 66)'}}> count </span><span style={{color: 'rgb(166, 38, 164)'}}>in</span><span style={{color: 'rgb(56, 58, 66)'}}> counts:</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"            "}</span><span style={{color: 'rgb(56, 58, 66)'}}>count[c] </span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(183, 107, 1)'}}>0</span></span>{"\n"}<span style={{display: 'inline-block'}} className="line">
                <span style={{color: 'rgb(56, 58, 66)'}}>{"    "}</span><span style={{color: 'rgb(166, 38, 164)'}}>return</span><span style={{color: 'rgb(56, 58, 66)'}}> </span><span style={{color: 'rgb(1, 132, 188)'}}>max</span><span style={{color: 'rgb(56, 58, 66)'}}>(wordList, </span><span style={{color: 'rgb(56, 58, 66)'}}>key</span><span style={{color: 'rgb(166, 38, 164)'}}>=</span><span style={{color: 'rgb(166, 38, 164)'}}>lambda</span><span style={{color: 'rgb(56, 58, 66)'}}> word: </span><span style={{color: 'rgb(64, 120, 242)'}}>scoreWordIgnore</span><span style={{color: 'rgb(56, 58, 66)'}}>(word, counts))</span>
            </span></code></pre>
            <br />
            <h2>Reducing The Word List</h2>
            <p>
                After the each guess the word list is reduced. This is done using 4 different factors:
            </p><br />
            <h4>Negative Mask</h4>
            <p>
                This takes care of letters which are in the word but their position was wrong in a previous guess.<br />
                For example, given:
                <img src={image1} alt="The word cares with a and r in the wrong positions" />
                all words with the letter <b><i>A</i></b> in position 2 and the
                letter <b><i>R</i></b> in position 3 will be removed from the word list.
            </p><br />
            <h4>Failed letters</h4>
            <p>
                This takes care of letter that are known no to be in the word. Given the same example as above
                any words containing the characters <b><i>C</i></b>, <b><i>E</i></b> or <b><i>S</i></b> are
                removed.
            </p><br />
            <h4>Positive Mask</h4>
            <p>
                This reduction is only used when the character information isn't being expanded. It removes
                words which don't have known characters in their correct position.<br />
                For example, given:
                <img src={image2} alt="The word alters with l and t in the correct position and a and r in the wrong positions" />
                all words without <b><i>L</i></b> in position 2 and <b><i>T</i></b> in position 3 will be removed.
            </p><br />
            <h4>Known Character Subset</h4>
            <p>
                This reduction is only used when the character information isn't being expanded. It removes
                words where the list of characters doesn't have the list of known characters as a subset. Given the
                same example as above only words which contain all the characters <b><i>A</i></b>, <b><i>L</i></b>,
                <b><i>T</i></b> and <b><i>R</i></b> are considered.
            </p><br />
            <h2>Expanding Character Information</h2>
            <p>
                To decide when to expand character information I decided to take into account two factors. These are the 
                number of turns left and the number of known characters.
            </p><br />
            <p>
                For example, if there is one remaining guess then there is little point expanding as it will result in
                loosing.
            </p>
            <p>
                Another case is if we know all 5 characters in the word then there is no point expanding because we already
                have a lot of information.
            </p><br />
            <p>
                The expanding functions are used if the turn number is less than the cutoff point and the known letters
                are less than the search point.
            </p><br />
            <p>
                To find the best parameters to use I decided to do some testing.
            </p><br />
            <h2>Testing</h2>
            <p>
                As we have a full word list it is possible to try and solve every word using a range of parameters.
                We can then pick the best parameters
            </p><br />
            <p>
                First I created a function that automatically scored the words and fed the result back into the solver.
                Then it's the simple case of running it on the word list and saving the score.
            </p><br />
            <p>
                I decided to save the number of turns taken, the number of successfully guessed words and the words which
                were missed.
            </p>
            <img alt="stats" src={[stats1, stats2, stats3][imgSelected]} onClick={() => setImgSelected(old => (old + 1) % 3)}/>
            <p>The list of words all 42 settings failed to find are:</p>
            <div className="code">
                dumps, vibes, pates, loxes, moper, paves, bider, veals, vined, rapes, veeps, vires, wears, razes, tames, vends, sawer, oozes, vests, vails, vales, dills, poxes, zeals, dinks, vapes, wales, fifes, vases, vaunt, finks, waxer, gears, zests, fells, jiber, hinds, heeds, boded, hives, vower, gages, jilts, eases, eaves, jings, kikes, coked, doges, jives, gapes, faxer, faxed, liker, fazes, coxed, coxes, mimes, mimer, jakes, nines, janes, dozes, laker, peats, lases, laxer, lazes, loges, yummy, jowls
            </div><br />
            <p>By these extremely crude stats it looks like a cutoff of 3 and a search until 2 performs the best</p><br />
            <h2>Limitations</h2>
            <p>
                As I decided to try and find the most likely word from the list, when a guess is incorrect the reduction
                remaining options can vary massively. This isn't the greatest approach as the program would be more
                consistent if it picked words which in the worst case still reduced the number of possible words the
                most.
            </p><br />
            <p>
                I'm working on a newer version which should be more reliable and hopefully better at solving the problem.
            </p>
            </div>
    );
}
 
export default Component;