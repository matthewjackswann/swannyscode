import { Suspense } from "react";
import React from "react";
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

export const ProjectSummary = ({ id, projectDetails }) => {
    const nav = useNavigate();

    return (<div onClick={() => { nav("/projects/" + id); }} className="group my-2 transition-all tc hover:border-accent hover:dark:border-accent-dark rounded-lg border-solid border-2 border-primary-button dark:border-primary-button-dark cursor-pointer">
        <div className="p-2 h-full flex flex-col">
            {getContent(projectDetails.folder + "/Summary")}
            <div className="flow-root mt-auto">
                <span className="
                text-accent dark:text-accent-dark
                group-hover:text-primary-button dark:group-hover:text-primary-button-dark
                float-left cc">{projectDetails.date}</span>
                <span className="
                text-accent dark:text-accent-dark
                group-hover:text-primary-button dark:group-hover:text-primary-button-dark
                float-right cc">Read More...</span>
            </div>
        </div>
    </div>);
};
