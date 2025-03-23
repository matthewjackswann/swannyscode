import { Link } from "react-router-dom";

const InternalLink = ({to, children}) => {
    // todo work out class name for text colours (dark and light shouldn't be the same)
    return <Link className='text-primary dark:text-primary-dark hover:text-accent dark:hover:text-accent-dark cc' to={to}>{children}</Link>
}

export default InternalLink;