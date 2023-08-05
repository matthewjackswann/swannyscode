import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Collapsible({children, header, className}) {

    const divRef = useRef(null);

    const toggleDropdown = () => {
        if (!divRef.current.classList.contains("grid-rows-[1fr]")) {
            divRef.current.classList.add("grid-rows-[1fr]");
            divRef.current.classList.remove("grid-rows-[0fr]");
        } else {
            divRef.current.classList.add("grid-rows-[0fr]");
            divRef.current.classList.remove("grid-rows-[1fr]");
        }
    }

    return (<div className={className}>
        <div className="flex cursor-pointer" onClick={toggleDropdown}>
            {header}
            <FontAwesomeIcon icon={faChevronDown} className="float-right ml-auto p-2"/>
        </div>
        <div ref={divRef} className="transition-[grid-template-rows] grid grid-rows-[0fr]">
            <div className="overflow-hidden">
                {children}
            </div>
        </div>
    </div>);
}

export default Collapsible;