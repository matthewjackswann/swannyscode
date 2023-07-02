import React from "react";
import { Link } from "react-router-dom";
import { getCatagoryLabel, getContent } from "../Pages/Updates";

// creates summary card of an update
export function UpdateSummary({ id, updateDetails, openFunction, open, filters }) {
    return (
        <div onClick={() => { openFunction(id); }} className="border-2 border-accent dark:border-accent-dark hover:border-primary-button dark:hover:border-primary-button-dark rounded-lg my-2 p-2">
            <h1 className="text-3xl lg:inline-block lg:mr-4">{updateDetails.title}</h1>
            {updateDetails.catagories.map(c => getCatagoryLabel(c, filters))}
            <p>{updateDetails.date}</p>
            {open && getContent(`Summary/${updateDetails.fileName}`)}
            {open && updateDetails.extended &&
                <div className="flow-root">
                    <Link to={updateDetails.projectId ? "/projects/" + updateDetails.projectId : "/updates/" + id}
                        className="
                    text-primary-button dark:text-primary-button-dark
                    hover:text-text dark:hover:text-text-dark
                    float-right">Read More</Link>
                </div>}
        </div>
    );
}
