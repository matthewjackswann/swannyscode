import React from "react";
import ProjectSummary from "./ProjectSummary";
import projectInfo from "./projects/data.json";
import { Link } from "react-router-dom";

const Home = () => {
    const reducedList = projectInfo.list.filter(project => project !== projectInfo.newest);
    const randomProject = reducedList[Math.floor(Math.random() * reducedList.length)];

    return (
        <div className="home">
            <p>Welcome to my website</p>
            <p>I am a second year computer science student at the University of Bristol and decided to create this web app to show off my projects and work.</p>
            <br />
            <p>Look at my list of projects <Link to="/projects">here</Link> or one of the projects below</p>
            <div className="homeProjects">
                <div className="featureProject" id="newestProject">
                    <h3>Newest Project</h3>
                    <ProjectSummary project={projectInfo[projectInfo.newest]}/>
                </div>
                <div className="featureProject" id="randomProject">
                    <h3>Random Project</h3>
                    <ProjectSummary project={projectInfo[randomProject]}/>
                </div>
            </div>
        </div>
    );
}
 
export default Home;