import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from "@fortawesome/free-solid-svg-icons";

// light style sheet - must be in public folder
import "highlight.js/styles/atom-one-light.css"

function DarkModeToggle({className}) {

    let [inDarkMode, setDarkMode] = useState(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));

    useEffect(() => {
        if (inDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // setup code colours
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        // dark style sheet - must be in public folder
        link.href = inDarkMode ? "/atom-one-dark.css": "";
        document.head.appendChild(link);

        return () => { document.head.removeChild(link); }
    }, [inDarkMode]);

    return (
        <div className={className}>
            <button onClick={() => setDarkMode(prev => {localStorage.theme = !prev ? 'dark' : ''; return !prev;})}>
                <FontAwesomeIcon icon={faMoon} size="xl" className="tc hover:text-accent dark:hover:text-accent-dark" />
            </button>
        </div>
    );
}

export default DarkModeToggle;