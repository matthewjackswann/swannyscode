import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

function MenuBar() {
    return (
        <div className='items-center p-5 mx-2 mb-2 lg:flex border-solid border-b border-primary-button dark:border-primary-button-dark'>
            <Link to="/">
                <h1 className='text-4xl font-bold text-accent dark:text-accent-dark flex items-center'>
                    Swanny's <br className='sm:hidden'/> Code
                    <img src='logo192.png' alt='website logo' className='inline align-middle pl-3 h-24 sm:h-12'/>
                </h1>
            </Link>
            <div className='lg:ml-auto sm:flex'>
                {[
                    ["/", "Home"],
                    ["/projects", "Projects"],
                    ["/updates", "Updates"]
                ].map(([link, title]) => {
                    return <Link key={link} className='block text-2xl tc hover:text-accent dark:hover:text-accent-dark sm:inline sm:mr-5' to={link}>{title}</Link>
                })}
                <DarkModeToggle className='inline my-auto'/>
            </div>
        </div>
    );
}

export default MenuBar;