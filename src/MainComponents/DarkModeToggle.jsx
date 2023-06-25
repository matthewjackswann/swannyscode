import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from "@fortawesome/free-solid-svg-icons";

function DarkModeToggle({className}) {

    let [inDarkMode, setDarkMode] = useState(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches));

    useEffect(() => {
        if (inDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [inDarkMode]);

    return (
        <div className={className}>
            <button onClick={() => setDarkMode(prev => {localStorage.theme = !prev ? 'dark' : ''; return !prev;})}>
                <FontAwesomeIcon icon={faMoon} size="xl" className="text-text dark:text-text-dark hover:text-accent dark:hover:text-accent-dark" />
            </button>
        </div>
    );
}

export default DarkModeToggle;