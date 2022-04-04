import { useParams } from "react-router";
import projectInfo from "./projects/data.json";
import React, { Suspense, useState } from "react";
import NotFound from "./NotFound";
import { Link } from "react-router-dom";

const getContent = (folder, file) => {
    const Component = React.lazy(() => import(`./projects/${folder}/${file}`));
    return (
        <div key={file}>
            <Suspense fallback={<div>Loading...</div>}>
                <Component />
            </Suspense>
            <br />
            <hr />
        </div>
    );
}

const ProjectViewer = () => {
    const { id } = useParams();
    let reducedPages = [];
    let projectInfoHTML = "";
    if (projectInfo.list.includes(id)) {
        reducedPages = [...projectInfo[id].pages].filter(page => page[0] !== "summary");
        projectInfoHTML = {__html: projectInfo[id].info};
    }
    reducedPages.sort((a, b) => new Date(a[1]) - new Date(b[1]));
    const [currentPages, setPages] = useState(reducedPages);
    if (!projectInfo.list.includes(id)) {
        return <NotFound>
            <h1>Project not found</h1>
            <h3><Link to="/projects">List of projects</Link></h3>
        </NotFound>;
    }

    const sortList = () => {
        const selectBox = document.getElementById("sorting");
        const value = selectBox.options[selectBox.selectedIndex].value;
        const newPages = [...currentPages];
        if (value === "newest") {
            newPages.sort((a, b) => new Date(b[1]) - new Date(a[1]));
        } else {
            newPages.sort((a, b) => new Date(a[1]) - new Date(b[1]));
        }
        setPages(newPages);
    }

    return (
        <div className="projectView">
            <h1>{projectInfo[id].title}</h1>
            <p>{projectInfo[id].date}</p>
            <div className="sorting">
                <label htmlFor="sorting">Sort by: </label>
                <select name="sorting" id="sorting" onChange={sortList}>
                    <option value="oldest">Oldest</option>
                    <option value="newest">Newest</option>
                </select>
            </div>
            <p dangerouslySetInnerHTML={projectInfoHTML}></p><br />
            {projectInfo[id].pages.some(page => page[0] === "summary") && getContent(projectInfo[id].folder, "summary")}
            {currentPages.map(page => getContent(projectInfo[id].folder ,page[0]))}       
        </div>
    );
}
 
export default ProjectViewer;