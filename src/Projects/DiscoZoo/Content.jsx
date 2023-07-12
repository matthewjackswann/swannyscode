import InPageLink from "../../Components/InPageLink";
import image1 from "./Media/example1.png";
import image2 from "./Media/example2.png";
import image3 from "./Media/example3.png";
import Latex from "react-latex-next";

function DiscoZoo() {

    return (<div>
        <h1 className="text-5xl">Disco Zoo</h1>

        <p className="pb-4">January 15, 2022</p>

        <p className="pb-2">
            When my internet went down I decided to revisit an old project that I never finished, to find a way of maximizing the money made in the Disco Zoo app.
        </p>

        <p className="pb-4">
            This is a remake of an old disco zoo project I worked on before university; I liked the simplicity of it but never got round to finishing. It was developed in java and most of my time was spent wrestling with drawing the grid. I decided to remake it as a react component instead and I can use HTML and CSS to display the grid, so more time could be spent on the interesting coding.
        </p>
        
        <p>
            The full code is available on <a className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark" href="https://github.com/matthewjackswann/discozoo">github</a>. I'm not massively happy the CSS as I've not really worked out how to make things look good yet.
        </p>

        <p className="py-6">
            The component used be part of this website as well. However, when I switched over to using tailwind I didn't want to remake the styling so I'm leaving it out.
        </p>

        <br />

        <p className="pb-2">
            Disco Zoo is an app where the aim is to collect animals to grow your zoo. You do this by visiting each group of animals habitat and find them in the grid. Each animals has its own unique shape which can be used to help find it. When you arrive at a habitat you are told the animals currently there and it's up to you to uncover their shape before you run out of turns. It's quite easy to make educated guesses if you can remember the pattern of each animal but with multiple animals it can be hard to keep track of the possible places each should be in.
        </p>

        <p>I've split the explanation into the following sections:</p>

        <ul className="list-disc pl-8">
            {[
                ["Rules of Disco Zoo", "rules"],
                ["Calculating Square Expectancy", "squares"],
                ["Maximizing total score", "maximising"]
            ].map(([label, l]) => <li key={l}>
                <InPageLink className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark cursor-pointer" to={l}>{label}</InPageLink>
            </li>)}
        </ul>

        <br />

        <h2 className="text-4xl" id="rules">Rules of Disco Zoo</h2>
        <br />

        <p>When visiting a habitat you are show the following:</p>

        <img className="mx-auto max-w-2xl" src={image1} alt="a disco zoo game" />

        <p className="py-2">
            To collect an animal you must pick all the squares that animal is on before you run out of turns. Each animal has a unique shape which is the same throughout the game.<br />
            Below is a view of a grid once some animals have been found:
        </p>

        <img className="mx-auto max-w-2xl" src={image2} alt="a disco zoo game" />

        <p className="pt-2">
        {`It is always more valuable to catch an animal if you can however, if it's not possible to get any more animals then it's best to aim for empty spaces. These sometimes have coins in them (though very few, so theres no point in aiming for them unless turns < animal squares remaining).`}
        </p>

        <p className="pt-2">
            Different animals have different rarities with higher and lower value animals. The aim of the game it to collect the maximum number of each animal to make you zoo as big as possible.
        </p>

        <p>Now the basic rules are covered I can explain how the expected value of each square is calculated.</p>

        <br />

        <h2 className="text-4xl" id="squares">Calculating Square Expectancy</h2>
        <br />

        <p className="pb-2">
            Because we know the animals present in the grid and each of their shape we can calculate how likely it is for any square to contain any animal.
        </p>

        <p className="pb-2">
            This is done by calculating all possible grids and finding the amount of times each animal occurs in each square.
        </p>

        <p>
            To generate the list of all grids a recursive algorithm is used, adding a new animal in each recursion.
            If only one animal is given then it's possible positions are calculated using that animals width and height. This list of possible grids is then returned.
            If more then one animal is given then the possible positions of the last n-1 animals are calculated. For each of these possible grids, any place the first animal fits is added to the list of possible grids. This list is then returned.
        </p>

        <br /><br /><p>todo code</p><br /><br />

        <p>
            This is then reduced into a 5x5 grid of key value pairs with the frequency of each animal. The score of each square is then calculated using the following simple formula:
        </p>

        <div className="text-xl overflow-auto">
            <Latex>{`
            $$\\text{Let } V_{a} = \\text{users chosen value of animal } a$$
            $$\\text{Let } S_{a}(x,y) = \\text{frequency of animal } a \\text{ in the square } (x,y)$$
            $$\\text{Let } A = \\text{list of animals}$$
            $$\\text{Score}(x,y) = \\sum_{a \\in A} V_{a} * S_{a}(x,y)$$
            `}</Latex>
        </div>

        <p>
            This allows me to rank the squares in order of expected returns, with larger numbers meaning higher chance of higher value animals. You could use this to inform your square choice alone, however it's unlikely to be the optimal strategy for reasons I'll cover next.
        </p>

        <br />

        <h2 className="text-4xl" id="maximising">Maximizing total score</h2>
        <br />

        <p>
            In the game you are limited to only 10 turns, meaning it can be advantageous to pick squares with a lower expectancy.
        </p>

        <p className="pt-2">
            For example, given the following grid with darkened squares already picked and each square's expectancy shown, with only 3 turns left we can't afford to miss a single square. This is because there are 3 remaining sheep squares and we need to pick all of them to get the animal. This means it's actually better to go for the squares with the lowest expectancy as we can either guarantee getting the sheep or have the most remaining turns to maximize profit from blank squares.
        </p>

        <img className="mx-auto max-w-2xl py-2" src={image3} alt="a grid with expectancy" />

        <p>
            To account for this, the expectancy generated from each animal depends on the remaining number of that animal in a grid, and the number of remaining turns.
        </p>

        <ul className="list-disc pl-8">
            <li>{'If turn > remaining animal squares use expectancy contribution as normal'}</li>
            <li>If turns = remaining animal squares then expectancy is divided by the frequency of the given square. This means that the more probable squares will have a lower expectancy contribution</li>
            <li>{"If turns < remaining animal squares then expectancy contribution is zero. Knowing a square is an animal can give additional info which aids other animal finding but it's not prioritized in any way."}</li>
            <li>{"If turns < remaining animal squares for all animals then expectancy contribution for all animals is -1. This means that blank squares are prioritized as they are the only way of making money."}</li>
        </ul>

        <p className="pt-4">
            This works fairly well and ends up with grids with a high final value.
        </p>

        <p className="pt-4">
            In the end I'm very happy with how it works algorithmically however the graphics still leave a lot to be desired. I might fix this in the future but it's just CSS and not really a priority to me; I'd rather work on some new different projects.
        </p>
    </div>)
}

export default DiscoZoo;