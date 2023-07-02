import UpdatesInfo from "../Updates/data.json";
import React, { useState } from "react";
import { Suspense } from "react";
import { UpdateSummary } from "../Updates/UpdateSummary";

export const getContent = (path) => {
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

export const getCatagoryLabel = (catagory, filters) => {
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

// displays page and list of UpdateSummaries
function Updates() {
    let [openUpdate, setOpenUpdate] = useState("");
    let [filters, setFilters] = useState(new Set());
    let [updateKeys, setUpdateKeys] = useState([...Object.keys(UpdatesInfo)].sort((a, b) => new Date(UpdatesInfo[b].date) - new Date(UpdatesInfo[a].date)));

    const sortOptions = [
        ["Newest First", () => setUpdateKeys(prev => [...prev].sort((a, b) => new Date(UpdatesInfo[b].date) - new Date(UpdatesInfo[a].date)))], 
        ["Oldest First", () => setUpdateKeys(prev => [...prev].sort((a, b) => new Date(UpdatesInfo[a].date) - new Date(UpdatesInfo[b].date)))], 
        ["Alphabetical (A - Z)", () => setUpdateKeys(prev => [...prev].sort((a, b) => (UpdatesInfo[a].title).localeCompare(UpdatesInfo[b].title)))], 
        ["Alphabetical (Z - A)", () => setUpdateKeys(prev => [...prev].sort((a, b) => (UpdatesInfo[b].title).localeCompare(UpdatesInfo[a].title)))]
    ];

    return (
        <div>
            <h1 className="text-4xl pb-2">Updates</h1>
            <p>
                These are some updates about a few events and achivements I have made.
                Not all of them a worth creating a writeup on but I want to save them somewhere so I can remember
                all the random stuff I've worked on, and the people I worked with them on.
            </p>
            <br />
            <p className="lg:inline-block lg:mr-4">Filters:</p>
            {Object.keys(catagoryColours).map(c => getFilterLabel(c, filters, setFilters))}
            <br />

            <select className="px-2 bg-accent dark:bg-accent-dark text-secondary-button dark:text-secondary-button-dark rounded-xl float-right cursor-pointer" style={{"WebkitAppearance": "none"}}
            onChange={(e) => sortOptions[e.target.value][1]()}>
                {sortOptions.map(([label, _], i) => <option key={i} value={i}>{label}</option>)}
            </select>

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