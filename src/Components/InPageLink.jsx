function InPageLink({to, className, children}) {
    return (<div className={className} onClick={() => {
        let hero = document.getElementById(to);
        hero && hero.scrollIntoView({ behavior: "smooth", block: "start" });
    }}>
        {children}
    </div>)
}

export default InPageLink;