import UpdatesInfo from "../Updates/data.json";
import React, { useState } from "react";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutsideClickCallback from "../Components/OutsideClickCallback";

const getContent = (path) => {
    const Component = React.lazy(() => import(`../Updates/${path}`));
    return (
        <div key={path}>
            <Suspense fallback={<div>Loading...</div>}>
                <Component />
            </Suspense>
        </div>
    );
}

const catagoryColours = {
    "Competition": "#0075ca",
    "Project": "#008672",
    "CTF": "#b60205",
    "Group Work": "#d876e3",
    "Extended": "#cbab0b"
}

const sortingOptions = [
    ["Newest First", (a, b) => new Date(UpdatesInfo[b].date) - new Date(UpdatesInfo[a].date)], 
    ["Oldest First", (a, b) => new Date(UpdatesInfo[a].date) - new Date(UpdatesInfo[b].date)], 
    ["Alphabetical (A - Z)", (a, b) => (UpdatesInfo[a].title).localeCompare(UpdatesInfo[b].title)], 
    ["Alphabetical (Z - A)", (a, b) => (UpdatesInfo[b].title).localeCompare(UpdatesInfo[a].title)]
];

const getCatagoryLabel = (catagory, filters) => {
    const pillStyle = filters.has(catagory) || filters.size === 0 ?
        {"color": catagoryColours[catagory], "backgroundColor": catagoryColours[catagory] + "70"} :
        {"color": catagoryColours[catagory] + "80", "backgroundColor": catagoryColours[catagory] + "50"};

    return (<div key={catagory} className="inline-block rounded-full px-2 mr-1 align-super text-lg" style={pillStyle}>
        {catagory}
    </div>);
}

const getFilterLabel = (catagory, filters, setFilters) => {
    const pillStyle = filters.has(catagory) ?
        {"color": catagoryColours[catagory], "backgroundColor": catagoryColours[catagory] + "70"} :
        {"color": "#818589", "backgroundColor": "#81858970"};

    const onFilterClick = () => {
        setFilters(prev => {
            let n = new Set(prev);
            if (prev.has(catagory)) n.delete(catagory);
            else n.add(catagory);
            return n;
        })
    }

    return (<div key={catagory} className="inline-block rounded-full px-2 mr-1 cursor-pointer text-lg" style={pillStyle} 
    onClick={onFilterClick}>
        {catagory}
    </div>);
}

// creates summary card of an update
function UpdateSummary({id, updateDetails, openFunction, open, filters}) {
    return (
        <div onClick={() => {openFunction(id)}} className="border-2 border-accent dark:border-accent-dark hover:border-primary-button dark:hover:border-primary-button-dark rounded-lg my-2 p-2">
            <h1 className="text-3xl text-text dark:text-text-dark lg:inline-block lg:mr-4">{updateDetails.title}</h1>
            {updateDetails.catagories.map(c => getCatagoryLabel(c, filters))}
            <p className="text-text dark:text-text-dark">{updateDetails.date}</p>
            {open && getContent(`Summary/${updateDetails.fileName}`)}
            {open && updateDetails.extended && 
                <div className="flow-root" >
                    <Link to={updateDetails.projectId ? "/projects/" + updateDetails.projectId : "/updates/" + id} 
                    className="
                    text-primary-button dark:text-primary-button-dark
                    hover:text-text dark:hover:text-text-dark
                    float-right">Read More</Link>
                </div>
            }
        </div>
    );
}

// displays page and list of UpdateSummaries
function Updates() {
    let [openUpdate, setOpenUpdate] = useState("");
    let [filters, setFilters] = useState(new Set());
    let [updateKeys, setUpdateKeys] = useState([...Object.keys(UpdatesInfo)].sort((a, b) => new Date(UpdatesInfo[b].date) - new Date(UpdatesInfo[a].date)));
    let [sortOpen, setSortOpen] = useState(false);

    return (
        <div>
            <h1 className="text-text dark:text-text-dark text-4xl pb-2">Updates</h1>
            <p className="text-text dark:text-text-dark">
                These are some updates about a few events and achivements I have made.
                Not all of them a worth creating a writeup on but I want to save them somewhere so I can remember
                all the random stuff I've worked on, and the people I worked with them on.
            </p>
            <br />
            <p className="lg:inline-block lg:mr-4">Filters:</p>
            {Object.keys(catagoryColours).map(c => getFilterLabel(c, filters, setFilters))}
            <br />

            <OutsideClickCallback onClickLeave={() => setSortOpen(false)} className="grid float-right">
                <div className="rounded-full bg-accent inline-block px-2 float-right cursor-pointer justify-self-end" onClick={() => setSortOpen(true)}>
                    <span className="text-secondary-button dark:text-secondary-button">
                        Sort by <FontAwesomeIcon className="text-secondary-button dark:text-secondary-button" icon={faChevronDown} />
                    </span>
                </div>
                {sortOpen && <div className="float-right mt-1">
                    {sortingOptions.map(([label, comp]) => {
                        return (<div className="
                            text-secondary-button dark:text-secondary-button
                            bg-primary-button dark:bg-primary-button-dark
                            hover:text-text dark:hover:text-text-dark
                            hover:bg-accent dark:hover:bg-accent-dark
                            cursor-pointer
                            first:rounded-t-md last:rounded-b-md p-2"
                            onClick={() => {setUpdateKeys(prev => [...prev].sort(comp))}}
                            key={label}>{label}</div>);
                    })}
                </div>}
            </OutsideClickCallback>

            <br />
            {
                updateKeys.filter(id => {
                    for (const f of filters) {
                        if (!UpdatesInfo[id].catagories.includes(f)) return false;
                    }
                    return true;
                })
                .map(id => <UpdateSummary key={id} id={id} updateDetails={UpdatesInfo[id]} openFunction={setOpenUpdate} open={openUpdate === id} filters={filters}/>)
            }
        </div>
    );
}

export default Updates;
export { UpdateSummary };