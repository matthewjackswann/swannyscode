import React from "react";
import { Link } from "react-router-dom";
import { getCategoryLabel } from "../Pages/Updates";

const getContent = (path) => {
    const Component = require(`./${path}.jsx`).default;
    return (
        <div key={path} className="cursor-default" onClick={e => e.stopPropagation()}>
            <Component />
        </div>
    );
}

// creates summary card of an update
export function UpdateSummary({ id, updateDetails, openFunction, open, filters }) {
    return (
        <div onClick={() => { openFunction(current => {
            if (current !== id) return id;
            return null;
        }); }} className="tc group border-2 border-secondary dark:border-secondary-dark hover:border-accent dark:hover:border-accent-dark rounded-lg my-2 p-2 cursor-pointer">
            <h1 className="text-3xl lg:inline-block lg:mr-4">{updateDetails.title}</h1>
            {updateDetails.categories.map(c => getCategoryLabel(c, filters))}
            <p>{updateDetails.date}</p>
            {open && getContent(`Summary/${updateDetails.fileName}`)}
            {open && updateDetails.extended &&
                <div className="flow-root cursor-default" onClick={e => e.stopPropagation()}>
                    <Link to={updateDetails.projectId ? "/projects/" + updateDetails.projectId : "/updates/" + id}
                        className="cc
                    text-secondary dark:text-secondary-dark
                    group-hover:text-accent dark:group-hover:text-accent-dark
                    group-hover:hover:text-primary dark:group-hover:hover:text-primary-dark
                    float-right">Read More</Link>
                </div>}
        </div>
    );
}
