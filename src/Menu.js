import {Link} from 'react-router-dom';

const Menu = () => {
    return (
        <div className="menubar">
            <Link to="/">
                <h1>SwannysCode</h1>
            </Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/ctf">CTF</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </div>
    );
}
 
export default Menu;