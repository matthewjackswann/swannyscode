function InPageLink({to, className, children}) {
    return (<span className={className} onClick={() => {
        let hero = document.getElementById(to);
        hero && hero.scrollIntoView({ behavior: "smooth", block: "start" });
    }}>
        {children}
    </span>)
}

export default InPageLink;