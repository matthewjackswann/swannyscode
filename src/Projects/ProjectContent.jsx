import { useParams } from "react-router-dom";
import React, { Suspense } from "react";
import ProjectsInfo from "./data.json";
import PageNotFound from "../Pages/PageNotFound";

const getContent = (path) => {
    const Component = React.lazy(() => import(`./${path}`));
    return (
        <div key={path}>
            <Suspense fallback={<div>Loading...</div>}>
                <Component />
            </Suspense>
        </div>
    );
}

function ProjectContent() {
    const { id } = useParams();

    if (!(id in ProjectsInfo)) return <PageNotFound />;

    return (<div>
        {getContent(`${ProjectsInfo[id].folder}/Content`)}
    </div>);
}

export default ProjectContent;