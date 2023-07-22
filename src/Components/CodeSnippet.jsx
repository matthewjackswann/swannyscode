import Highlight from "react-highlight";

function CodeSnippet({className, children}) {
    return <Highlight className={"cc " + className}>
        {children}
    </Highlight>
}

export default CodeSnippet;