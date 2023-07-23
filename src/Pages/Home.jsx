import ProjectInfo from "../Projects/data.json";
import UpdateInfo from "../Updates/data.json";
import { ProjectSummary } from "../Projects/ProjectSummary";
import { UpdateSummary } from "../Updates/UpdateSummary";
import { useRef, useState } from "react";
import SegmentedButton from "../Components/SegmentedButton";

const newestProjects = Object.keys(ProjectInfo).sort((a, b) => new Date(ProjectInfo[b].date) - new Date(ProjectInfo[a].date)).slice(0,2);
const newestUpdates = Object.keys(UpdateInfo).filter(p => !UpdateInfo[p].categories.includes("Project")).sort((a, b) => new Date(UpdateInfo[b].date) - new Date(UpdateInfo[a].date)).slice(0,5);
const featuredProjects = ["1", "2"];
const featuredUpdates = ["1"];

const ProjectsPane = () => {
    let [showNewestProject, setShowNewestProject] = useState(false);

    return (<div>
        <SegmentedButton controlRef={useRef()}
            segments={[
                {
                    label: 'Featured Projects',
                    callback: () => setShowNewestProject(false),
                    ref: useRef(),
                },
                {
                    label: 'Newest Projects',
                    callback: () => setShowNewestProject(true),
                    ref: useRef(),
                }
            ]}
        />

        <div className="sm:grid sm:grid-cols-2 sm:gap-3">
            {showNewestProject && newestProjects.map(id => <ProjectSummary id={id} key={id} projectDetails={ProjectInfo[id]}/>)}
            {!showNewestProject && featuredProjects.map(id => <ProjectSummary id={id} key={id} projectDetails={ProjectInfo[id]}/>)}
        </div>
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

function Home() {    
    return (<div>
        <h1 className="text-4xl pb-2">Home</h1>
        <p>
            Welcome to my website
            I am a fourth year computer science student at the University of Bristol and decided to create this website
            to show off my projects and work.
        </p>
        <p>
            I create writeups for larger projects I've been working on explaining decisions I've made when solving problems.
        </p>
        <p>
            I also add updates on smaller projects / competitions I've taken part in which I want to remember but I don't want
            to create a writeup about.
        </p>

        <br />

        <ProjectsPane />

        <br />

        <UpdatesPane />

    </div>);
}

export default Home;