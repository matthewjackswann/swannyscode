import { faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectInfo from "../Projects/data.json";
import React, { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";

const getContent = (path) => {
    const Component = React.lazy(() => import(`../Projects/${path}`));
    return (
        <div key={path}>
            <Suspense fallback={<div>Loading...</div>}>
                <Component />
            </Suspense>
        </div>
    );
}

const ProjectSummary = ({id, projectDetails}) => {
    const nav = useNavigate();
    
    return (<div onClick={() => {nav("/projects/" + id)}} className="group my-2 hover:bg-accent hover:dark:bg-accent-dark rounded-lg bg-primary-button dark:bg-primary-button-dark cursor-pointer">
        <div className="p-2">
            {projectDetails.title}
            {getContent(projectDetails.folder + "/Summary")}
            <div className="flow-root" >
                <p className="
                text-accent dark:text-accent-dark
                group-hover:text-primary-button dark:group-hover:text-primary-button-dark
                float-right">Read More...</p>
            </div>
        </div>
    </div>);
}

function Projects() {
    let [projectKeys, setProjectKeys] = useState([...Object.keys(ProjectInfo)].sort((a, b) => new Date(ProjectInfo[b].date) - new Date(ProjectInfo[a].date)));
    
    const sortOptions = [
        ["Newest First", () => setProjectKeys(prev => [...prev].sort((a, b) => new Date(ProjectInfo[b].date) - new Date(ProjectInfo[a].date)))],
        ["Oldest First", () => setProjectKeys(prev => [...prev].sort((a, b) => new Date(ProjectInfo[a].date) - new Date(ProjectInfo[b].date)))]
    ];

    return (<div>
        <h1 className="text-text dark:text-text-dark text-4xl pb-2">My Projects</h1>
        <p className="text-text dark:text-text-dark">
            This are a list of projects I have compleated in my own time and for my own enjoyment. They all
            have a writeup, explaining how I solves specific problems, as well as what I have learnt from working
            on them. <br />
            Each project takes a significant amount of time so I finish them quite infrequently (especially when I
            have more work I 
            should be doing instead <FontAwesomeIcon className="text-text dark:text-text-dark" icon={faFaceSmileBeam} />)
        </p>
        <br />

        <select className="px-2 bg-accent dark:bg-accent-dark text-secondary-button dark:text-secondary-button-dark rounded-xl float-right cursor-pointer" style={{"WebkitAppearance": "none"}}
        onChange={(e) => sortOptions[e.target.value][1]()}>
            {sortOptions.map(([label, _], i) => <option key={i} value={i}>{label}</option>)}
        </select>

        <br />
        {projectKeys.map(id => <ProjectSummary id={id} key={id} projectDetails={ProjectInfo[id]}/>)}
    </div>);
}

export default Projects;
export { ProjectSummary };