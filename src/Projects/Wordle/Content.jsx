import InPageLink from "../../Components/InPageLink";
import CodeSnippet from "../../Components/CodeSnippet";
import ImageSwapper from "../../Components/ImageSwapper";
import example1 from "./Media/example1.png";
import example2 from "./Media/example2.png";
import stat1 from "./Media/img1.png";
import stat2 from "./Media/img2.png";
import stat3 from "./Media/img3.png";
import { WordleScoringCode, WordleScoringIgnoreCode } from "./Media/Code";

function Content() {
    return (<div>
        <h1 className="text-5xl">Wordle Solver</h1>

        <p className="pb-4">Febuary 12, 2022</p>

        <p className="pb-2">
            The aim of wordle is to guess the word in as few turns as possible. The approach I took was to pick the most probable word and use the results of that to reduce the number of possible words. I also split my solving into two parts, the first to try and gain more information, and the second to try and find the correct word.
        </p>

        <p>
            The full code is available on <a className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark" href="https://github.com/matthewjackswann/wordle">github</a>
        </p>

        <p>
            The word list I used for testing is also on <a className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark" href="https://github.com/charlesreid1/five-letter-words/blob/master/sgb-words.txt">github</a>
        </p>

        <p className="pt-6">
            Parts of the write up:
        </p>

        <ul className="list-disc pl-8">
            {[
                ["Scoring Words", "scoring"],
                ["Reducing The Word List", "reducing"],
                ["Expanding Character Information", "expanding"],
                ["Limitations", "limitations"]
            ].map(([label, l]) => <li key={l}>
                <InPageLink className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark cursor-pointer" to={l}>{label}</InPageLink>
            </li>)}
        </ul>

        
        <br />

        <h2 className="text-4xl" id="scoring">Scoring Words</h2>
        <br />

        <p>
            I decided to score each word by maximizing the most common characters in the most common position. To do this the total number of each character in each position is calculated and this is used to score each word. The word with the largest score is then calculated.
        </p>

        <CodeSnippet className="my-3" code={WordleScoringCode} />

        <p>
            This works quite well but for the word list I'm using. The highest scoring word is: <b>SORES</b><br />
            Sadly this is not amazing as the character <b>S</b> is repeated twice. Information if only found about 4 characters instead of the maximum 5. While this seems to have little impact, if we know the 5th character is not in the word, then the word list can have all words with that character in it removed, massively reducing the remaining possible options.
        </p>

        <p className="pt-2">
            To prevent this I created a second wordle function called <i>wordleIgnore</i>. This penalizes words with duplicate characters by scoring them as <b>(score / number of occurrences)</b>. Additionally, it also takes a list of characters which information is already known about. These have their scores set to 0 so that other characters are much more likely to be chosen.
        </p>

        <CodeSnippet className="my-3" code={WordleScoringIgnoreCode} />

        <br />

        <h2 className="text-4xl" id="reducing">Reducing The Word List</h2>
        <br />

        <p>
            After the each guess the word list is reduced. This is done using 4 different filters:
        </p>

        <h4 className="text-xl font-bold pt-4">Negative Mask</h4>
        <p>
            This takes care of letters which are in the word but their position was wrong in a previous guess.<br />
            For example, given:
        </p>

        <img className="p-4 w-full" src={example1} alt="the word 'cares' in wordle. The 'A' and 'R' are in the word but are in the wrong place"/>

        <p>
            All words with the letter <b>A</b> in position 2 and the letter <b>R</b> in position 3 will be removed from the word list.
        </p>

        <h4 className="text-xl font-bold pt-4">Failed letters</h4>
        <p>
            This takes care of letter that are known not to be in the word. Given the same example as above, any words containing the characters <b>C</b>, <b>E</b> or <b>S</b> are removed.
        </p>

        <h4 className="text-xl font-bold pt-4">Positive Mask</h4>
        <p>
            This reduction is only used when the character information isn't being expanded. It removes words which don't have known characters in their correct position.<br />
            For example, given:
        </p>

        <img className="p-4 w-full" src={example2} alt="the word 'alter' in wordle. The 'L' and 'T' are in the correct place. The 'A' and 'R' are in the word but are in the wrong place."/>

        <p>
            All words without <b>L</b> in position 2 and <b>T</b> in position 3 will be removed.
        </p>

        <h4 className="text-xl font-bold pt-4">Known Character Subset</h4>
        <p>
            This reduction is only used when the character information isn't being expanded. It removes words where the list of characters doesn't have the list of known characters as a subset. Given the same example as above only words which contain all the characters <b>A</b>, <b>L</b>, <b>T</b> and <b>R</b> are considered.
        </p>

        <br />

        <h2 className="text-4xl" id="expanding">Expanding Character Information</h2>
        <br />

        <p>
            To decide when to expand character information I decided to take into account two factors. These are the number of turns left and the number of known characters.
        </p>

        <p className="pt-2">
            For example, if there is one remaining guess then there is little point expanding as it will result in loosing.Another case is if we know all 5 characters in the word then there is no point expanding because we already have a lot of information.
        </p>

        <p className="pt-2">
            The expanding functions are used if the turn number is less than the cutoff point and the known letters are less than the search point.
        </p>
        
        <p className="pt-2">
            As we have a full word list, it is possible to try and solve every word using a range of parameters. We can then pick the best cutoff point and search point.
        </p>

        <p className="pt-2">
            First I created a function that automatically plays worlde and fed the result back into the solver. Then it's the simple case of running it on the word list and saving the score. I decided to save the number of turns taken, the number of successfully guessed words and the words which were missed.
        </p>

        <ImageSwapper className="p-4 w-full" srcs={[stat1, stat2, stat3]} alt="state across all possible parameters" />

        <p>
            The list of words all 42 settings failed to find are:
        </p>

        <p className="cc bg-background-faded dark:bg-background-faded-dark p-2 my-2 rounded-md">
            dumps, vibes, pates, loxes, moper, paves, bider, veals, vined, rapes, veeps, vires, wears, razes, tames, vends, sawer, oozes, vests, vails, vales, dills, poxes, zeals, dinks, vapes, wales, fifes, vases, vaunt, finks, waxer, gears, zests, fells, jiber, hinds, heeds, boded, hives, vower, gages, jilts, eases, eaves, jings, kikes, coked, doges, jives, gapes, faxer, faxed, liker, fazes, coxed, coxes, mimes, mimer, jakes, nines, janes, dozes, laker, peats, lases, laxer, lazes, loges, yummy, jowls
        </p>

        <p>
            By these extremely crude stats it looks like a cutoff of 3 and a search until 2 performs the best
        </p>

        <br />

        <h2 className="text-4xl" id="limitations">Limitations</h2>
        <br />

        <p>
            As I decided to try and find the most likely word from the list, when a guess is incorrect the reduction remaining options can vary massively. This isn't the greatest approach as the program would be more consistent if it picked words which in the worst case still reduced the number of possible words the most. After finishing this project I saw multiple <a className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark" href="https://www.youtube.com/watch?v=fRed0Xmc2Wg">youtube</a> videos doing this and doing considerably better then me.
        </p>

    </div>);
}

export default Content;