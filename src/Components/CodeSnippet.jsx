function CodeSnippet({className, code}) {
    return <div dangerouslySetInnerHTML={{__html: code}} className={"tc overflow-x-auto rounded-md bg-background-faded dark:bg-background-faded-dark p-2 " + className}></div>
}

export default CodeSnippet;