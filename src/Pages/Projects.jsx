import { faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectInfo from "../Projects/data.json";
import React, { useState } from "react";
import { ProjectSummary } from "../Projects/ProjectSummary";

const ProjectList = () => {
    let [projectKeys, setProjectKeys] = useState([...Object.keys(ProjectInfo)].sort((a, b) => new Date(ProjectInfo[b].date) - new Date(ProjectInfo[a].date)));
    
    const sortOptions = [
        ["Newest First", () => setProjectKeys(prev => [...prev].sort((a, b) => new Date(ProjectInfo[b].date) - new Date(ProjectInfo[a].date)))],
        ["Oldest First", () => setProjectKeys(prev => [...prev].sort((a, b) => new Date(ProjectInfo[a].date) - new Date(ProjectInfo[b].date)))]
    ];
    
    return (<div>
        <select className="px-2 bg-accent dark:bg-accent-dark text-secondary-button dark:text-secondary-button-dark rounded-xl float-right cursor-pointer cc" style={{"WebkitAppearance": "none"}}
        onChange={(e) => sortOptions[e.target.value][1]()}>
            {sortOptions.map(([label, _], i) => <option key={i} value={i}>{label}</option>)}
        </select>

        <br />
        {projectKeys.map(id => <ProjectSummary id={id} key={id} projectDetails={ProjectInfo[id]}/>)}
    </div>);
}

function Projects() {
    return (<div>
        <h1 className="text-4xl pb-2">My Projects</h1>
        <p>
            This are a list of projects I have compleated in my own time and for my own enjoyment. They all
            have a writeup, explaining how I solves specific problems, as well as what I have learnt from working
            on them. <br />
            Each project takes a significant amount of time so I finish them quite infrequently (especially when I
            have more work I 
            should be doing instead <FontAwesomeIcon icon={faFaceSmileBeam} />)
        </p>
        <br />

        <ProjectList />
    </div>);
}

export default Projects;