import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div>
            <h1>Page Not Found</h1>
            <p>Return to <Link to="/">home</Link></p>
        </div>
    );
}

export default PageNotFound;