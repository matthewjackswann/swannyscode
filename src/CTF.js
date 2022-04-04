import writeupInfo from "./writeups/data.json";
import { useState } from "react";
import { useHistory } from "react-router";

const CTF = () => {
    const history = useHistory();
    const [selected, setSelected] = useState([]);
    const [search , setSearch] = useState("");
    const toggleState = (category)  => {
        setSelected((old) => {
            if (old.includes(category)) {
                return old.filter(c => c !== category);
            }
            return [...old, category];
        })
    };
    const getCategoryTile = (category, i) => {
        return <div className={selected.includes(category) ? "categoryTileSelected" : "categoryTile"} onClick={() => toggleState(category)} key={i}>
            <img src={require("./writeups/categoryIcons/" + category + ".png").default} alt={category}/>
            <p>{category}</p>
        </div>
    };
    const getWriteUps = () => {
        let table = [];
        writeupInfo.list.forEach(key => {
            let writeUp = writeupInfo[key];
            if (selected.every(c => writeUp.categories.includes(c)) && 
            (writeUp.title.toUpperCase().startsWith(search.toUpperCase()) || 
            writeUp.event.toUpperCase().startsWith(search.toUpperCase()) || 
            writeUp.date.toUpperCase().startsWith(search.toUpperCase()))) {
                table.push(
                <tr key={key} onClick={() => {history.push("/ctf/" + key)}}>
                    <td>{writeUp.categories.join(", ")}</td>
                    <td>{writeUp.title}</td>
                    <td>{writeUp.event}</td>
                    <td>{writeUp.date}</td>
                    <td style={{textAlign: "right"}}><i className="arrow right" /></td>
                </tr>);
            }
        })
        return table;
    };

    let writeUps = getWriteUps();

    return (
        <div className="ctf">
            <h1>CTF Writeups</h1><br />
            <p>
                Since joining university I have joined the Ethical Bristol Hackers group where we regularly take part in
                CTF competitions. This page is somewhere i can write about interesting challenges I've solved and how I
                got to the solution.
            </p><br />
            <p>I've taken part in lots of competitions including but not limited to:</p>
            <ul>
                <li>HTB University CTF 2020</li>
                <li>Le Tour Du Hack</li>
                <li>Country-2-Country 2021</li>
                <li>Cyber Apocalypse 2021</li>
                <li>Tenable CTF 2021</li>
                <li>HTB HTB University CTF 2021</li>
                <li>Bristol BAE CTF 2021 - Part of winning team Brist0x</li>
            </ul>
            <br />
            <h4>Filter by category</h4>
            <div style={{display:"flex", flexWrap:"wrap"}}>{writeupInfo.categories.map((category, i) => {return getCategoryTile(category, i)})}</div><br />
            <input className="search" type="text" placeholder="Search.." onInput={e => {setSearch(e.target.value)}}/>
            <table className="ctf">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Event</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {writeUps}
                </tbody>
            </table><br />
            {writeUps.length > 0 || // if there are no writeups show this message
            <h3 style={{textAlign:"center"}}>
                There are currently no writeups published for this category. Please check back later.
            </h3>}
        </div>
    );
}
 
export default CTF;