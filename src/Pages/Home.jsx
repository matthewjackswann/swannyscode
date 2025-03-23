import ProjectInfo from "../Projects/data.json";
import UpdateInfo from "../Updates/data.json";
import { ProjectSummary } from "../Projects/ProjectSummary";
import { UpdateSummary } from "../Updates/UpdateSummary";
import { useRef, useState } from "react";
import SegmentedButton from "../Components/SegmentedButton";
import EmailIcon from "./Media/email.svg";
import LinkedinIcon from "./Media/linkedin.svg";
import GithubIcon from "./Media/github.svg";
import InternalLink from "../MainComponents/InternalLink";

const newestProjects = Object.keys(ProjectInfo).sort((a, b) => new Date(ProjectInfo[b].date) - new Date(ProjectInfo[a].date)).slice(0,2);
const newestUpdates = Object.keys(UpdateInfo).filter(p => !UpdateInfo[p].categories.includes("Project")).sort((a, b) => new Date(UpdateInfo[b].date) - new Date(UpdateInfo[a].date)).slice(0,5);
const featuredProjects = ["1", "2"];
const featuredUpdates = ["6", "5", "4", "2", "7"];

const ProjectsPane = () => {
    let [showNewestProject, setShowNewestProject] = useState(true);

    return (<div>
        <SegmentedButton controlRef={useRef()}
            segments={[
                {
                    label: 'Newest Projects',
                    callback: () => setShowNewestProject(true),
                    ref: useRef(),
                },
                {
                    label: 'Featured Projects',
                    callback: () => setShowNewestProject(false),
                    ref: useRef(),
                }
            ]}
        />

        {/* Change css to hide so all images are preloaded and flickering is reduced */}
        <div className={"sm:grid-cols-2 sm:gap-3 " + (!showNewestProject ? "hidden": "sm:grid")}>{newestProjects.map(id => <ProjectSummary id={id} key={id} projectDetails={ProjectInfo[id]}/>)}</div>
        <div className={"sm:grid-cols-2 sm:gap-3 " + (showNewestProject ? "hidden": "sm:grid")}>{featuredProjects.map(id => <ProjectSummary id={id} key={id} projectDetails={ProjectInfo[id]}/>)}</div>
    </div>)
};

const UpdatesPane = () => {
    let [showNewestUpdate, setShowNewestUpdate] = useState(false);
    let [openUpdate, setOpenUpdate] = useState("");

    return (<div>
        <SegmentedButton controlRef={useRef()}
            segments={[
                {
                    label: 'Featured Updates',
                    callback: () => setShowNewestUpdate(false),
                    ref: useRef(),
                },
                {
                    label: 'Newest Updates',
                    callback: () => setShowNewestUpdate(true),
                    ref: useRef(),
                }
            ]}
        />

        <div>
            {showNewestUpdate && newestUpdates.map(id => <UpdateSummary id={id} key={id} updateDetails={UpdateInfo[id]} openFunction={setOpenUpdate} open={openUpdate === id} filters={new Set()}/>)}
            {!showNewestUpdate && featuredUpdates.map(id => <UpdateSummary id={id} key={id} updateDetails={UpdateInfo[id]} openFunction={setOpenUpdate} open={openUpdate === id} filters={new Set()}/>)}
        </div>
    </div>)
}

const ContactPill = ({href, icon, text}) => {

    return (<a href={href} className="tc grid grid-cols-[.5fr_.75fr] w-40 border-solid border-2 rounded-full px-3 py-2 m-2 hover:bg-accent dark:hover:bg-accent-dark bg-secondary dark:bg-secondary-dark">
        <img className="cc dark:invert mx-auto " src={icon} alt={text} />
        <div className="m-auto">{text}</div>
    </a>);
}

function Home() {    
    return (<div>
        <h1 className="text-4xl pb-2">Home</h1>
        <p>
            Welcome to my website
            I'm a junior software engineer working in London. I created this website to show off my projects and work,
            and so I can remember all the things I've achieved.
        </p>
        <p>
            I create writeups for larger projects I've been working on explaining decisions I've made when solving problems.
        </p>
        <p>
            <InternalLink to="/projects">Projects</InternalLink> I also add updates on smaller projects / competitions I've taken part in which I want to remember but I'm too lazy
            to create a writeup about.
        </p>

        <h2 className="font-bold text-2xl pt-4" >Contact me:</h2>

        <div className="sm:flex">
            <ContactPill icon={EmailIcon} href="mailto:matthewjackswann@outlook.com" text="Email" />
            <ContactPill icon={LinkedinIcon} href="https://www.linkedin.com/in/matthew-swann-29a262161/" text="Linkedin" />
            <ContactPill icon={GithubIcon} href="https://github.com/matthewjackswann" text="Github" />
        </div>

        <br />

        <ProjectsPane />

        <br />

        <UpdatesPane />

    </div>);
}

export default Home;