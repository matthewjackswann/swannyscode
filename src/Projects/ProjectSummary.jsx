import { useNavigate } from "react-router-dom";

const getContent = (path) => {
    const Component = require(`./${path}.jsx`).default;
    return (
        <div key={path}>
            <Component />
        </div>
    );
}

export const ProjectSummary = ({ id, projectDetails }) => {
    const nav = useNavigate();

    return (<div onClick={() => { nav("/projects/" + id); }} className="group my-2 transition-all tc hover:border-accent hover:dark:border-accent-dark rounded-lg border-solid border-2 border-secondary dark:border-secondary-dark cursor-pointer">
        <div className="p-2 h-full flex flex-col">
            {getContent(projectDetails.folder + "/Summary")}
            <div className="flow-root mt-auto">
                <span className="
                text-accent dark:text-accent-dark
                float-left cc">{projectDetails.date}</span>
                <span className="
                text-accent dark:text-accent-dark
                float-right cc">Read More...</span>
            </div>
        </div>
    </div>);
};
