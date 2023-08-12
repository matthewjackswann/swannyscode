import Collapsible from "../../Components/Collapsible";
import CodeSnippet from "../../Components/CodeSnippet";
import { WebsiteCodeFormatterCode } from "./Media/Code";

const Update3 = () => {
    return (<div>
        <br />
        <h2 className="text-4xl" id="rules">Update 3- Tailwind CSS and Updates</h2>
        <p>July 15th, 2023</p>
        <br />

        <p>
            I've re-written my entire website to use Tailwind CSS to help with formatting. It's taken me way too long to do but it's no so much easier to add new content to my website as I don't need to worry about lots of CSS classes. There is a lot less inheritance beacuse of this which has made making components look how I want so much easier.
        </p><br />

        <p>
            I've also removed my CTF write up section and replaced it with and Updates page. As the third year of university has been very busy, I've not had much time to compeate in CTFs and instead have done a lot of other random coding competitions. I want to record them somewhere and it made the most sense to change my CTF page into a general updates page.
        </p><br />

        <p>
            As I've switched to using Tailwind for styling, my current method for code no longer works as well. It was very janky anyway so I've got rid of the old method entirely. I now use <a className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark" href="https://www.npmjs.com/package/react-highlight">react-highlight</a> which is built using <a className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark" href="https://highlightjs.org/">highlight.js</a> and is a much better solution. As they styling is done using css style sheets, I updated my <i>DarkModeToggle</i> component to add the code dark mode sheet to the webpage when toggling, alowing code snippets to update as well.
        </p>

    </div>);
}

const Update2 = () => {
    return (<div>
        <br />
        <h2 className="text-4xl" id="rules">Update 2 - Code Syntax Highlighting</h2>
        <p>April 3, 2022</p>
        <br />

        <p>
            Previously I was using the following <a className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark" href="https://github.com/googlearchive/code-prettify">script</a> to
            do code syntax highlighting for me but I realized it's quite old. It's been depricated and don't always work on react pages. I've decided to replace it with
            another method of formatting code, using html and css. After some searching I found the atom module <a className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark"href="https://atom.io/packages/copy-with-style">copy-with-style</a> which
            does exactly what I want. Sadly it doesn't work but looking at the pull requests there is a functioning version <a className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark" href="https://github.com/my-codeworks/copy-with-style/pull/16">here</a>.
        </p><br />
        <p>
            Next I created a script to remove the background and convert the HTML to JSX, the form that react webpages
            are written in. I did this in python using some regex to modify the HTML and then <b>selenium</b> to use and online
            converter so I don't have to try and do that myself. The full code is shown below:
        </p><br />

        <Collapsible className="tc mb-4 p-2 bg-background-faded dark:bg-background-faded-dark rounded-md" header={<div className="text-lg font-bold">CodeFormatter.py</div>}>
            <CodeSnippet code={WebsiteCodeFormatterCode} />
        </Collapsible>

        <p>
            I also modified the code-with-style package further so it runs a custom python script on completion,
            switches themes for you automatically (these are hardcoded sadly), and encoding so that <b>/</b> and other 
            special characters don't break the html output. My modified
            fork can be found <a className="tc underline hover:text-primary-button dark:hover:text-primary-button-dark" href="https://github.com/matthewjackswann/copy-with-style">here</a>.
        </p>
    </div>);
}

const Update1 = () => {
    return (<div>
        <br />
        <h2 className="text-4xl" id="rules">Update 1 - CTF Write Ups</h2>
        <p>November 5, 2021</p>
        <br />

        <p>
            While at university I have joined the Bristol Ethical Hackers group and actively take part in various CTF competitions. I've decided to add a section to my site dedicated to write ups for challenges I found particularly interesting.
        </p>
    </div>);
}

function Content() {
    return (<div>
        <h1 className="text-5xl">Creating My Website</h1>

        <p className="pb-4">January 15, 2022</p>

        <p>
            Welcome to my website!
            It's a place for me to put my projects and interesting work I am doing.
            I'm still learning but I'm trying my best to make is pretty and easy to use / navigate.
            It's built in react and hosted on github pages.
        </p>

        <Update3 />

        <Update2 />
        
        <Update1 />
    </div>);
}

export default Content;