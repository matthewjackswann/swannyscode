import projectInfo from "./projects/data.json";
import React, {useState} from "react";
import ProjectSummary from "./ProjectSummary";

const sortByDate = (old, dateUsed, forwards) => {
    const list = [...old];
    if (forwards) {
        list.sort((a, b) => new Date(b[dateUsed]) - new Date(a[dateUsed]));
    } else {
        list.sort((a, b) => new Date(a[dateUsed]) - new Date(b[dateUsed]));
    }
    return list;
}


const Projects = () => {
    const initProjectListUnsorted = [];
    projectInfo.list.forEach(projectId => {
        initProjectListUnsorted.push({
            jsx: <ProjectSummary key={projectId} project={projectInfo[projectId]} />,
            date: projectInfo[projectId].date,
            updated: projectInfo[projectId].updated
        })
    });
    const initProjectList = sortByDate(initProjectListUnsorted, "updated", true);

    const [projectList, setProjectList] = useState(initProjectList);

    const sortProjects = () => {
        const selectBox = document.getElementById("sorting");
        const value = selectBox.options[selectBox.selectedIndex].value;
        if (value === "oldest") {
            setProjectList(sortByDate(initProjectList, "date", false));
        } else {
            setProjectList(sortByDate(initProjectList, value, true));
        }
    }

    return (
        <div className="projects">
            <h2>My Projects</h2>

            <div className="sorting">
                <label htmlFor="sorting">Sort by: </label>
                <select name="sorting" id="sorting" onChange={sortProjects}>
                    <option value="updated">Updated</option>
                    <option value="date">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            {projectList.map(project => project.jsx)}
        </div>
    );
}

export default Projects;