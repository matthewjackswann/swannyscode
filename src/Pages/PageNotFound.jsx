import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div className='flex justify-center items-center text-center' style={{"minHeight": "50vh"}}>
            <div>
                <h1 className='text-2xl text-text dark:text-text-dark'>Page Not Found</h1>
                <p className='text-text dark:text-text-dark text-2xl'>Return to <Link to="/" className='text-primary-button dark:text-primary-button-dark hover:text-accent dark:hover:text-accent-dark'>Home</Link></p>
            </div>
        </div>
    );
}

export default PageNotFound;