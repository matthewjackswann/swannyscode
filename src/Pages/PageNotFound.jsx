import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div className='flex justify-center items-center text-center' style={{"minHeight": "50vh"}}>
            <div>
                <h1 className='text-2xl'>Page Not Found</h1>
                <p className='text-2xl'>Return to <Link to="/" className='text-primary dark:text-primary-dark hover:text-accent dark:hover:text-accent-dark cc'>Home</Link></p>
            </div>
        </div>
    );
}

export default PageNotFound;