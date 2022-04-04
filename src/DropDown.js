import { useState } from "react";

const DropDown = (props) => {
    const [dropDown, setDropDown] = useState("none");
   
    const toggleState = () => {setDropDown((old => {
        if (old === "none") return "block";
        return "none";
    }))}

    return (
        <div className="dropdown">
            <div onClick={toggleState} className="dropdownHead">
                {props.children[0]}
            </div>
            <div style={{display: dropDown}}>
                {props.children.slice(1)}
            </div>
        </div>
    );
}
 
export default DropDown;