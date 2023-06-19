import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from "@fortawesome/free-solid-svg-icons";

function DarkModeToggle() {

    let [inDarkMode, setDarkMode] = useState(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));

    useEffect(() => {
        if (inDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [inDarkMode]);

    return (
        <div>
            <button onClick={() => setDarkMode(prev => !prev)}><FontAwesomeIcon icon={faMoon} size="xl" style={{color: inDarkMode ? "#F6F2FF" : "#1E3050"}}/></button>
        </div>
    );
}

export default DarkModeToggle;