const ExternalLink = ({href, children}) => {
    return <a className="tc underline hover:text-primary dark:hover:text-primary-dark" href={href}>{children}</a>
}

export default ExternalLink;