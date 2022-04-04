import { useParams } from "react-router";
import writeupInfo from "./writeups/data.json";
import React, {Suspense} from "react";
import NotFound from "./NotFound";
import { Link } from "react-router-dom";

function WriteUp() {    
    const { id } = useParams();
    if (!writeupInfo.list.includes(id)) {
        return <NotFound>
            <h1>Page not found</h1>
            <h2><Link to="/ctf">Go to writeups</Link></h2>
        </NotFound>
    }
    const folder = writeupInfo[id].folder
    const page = writeupInfo[id].page
    const Component = React.lazy(() => import(`./writeups/${folder}/${page}`));
    return (
        <div className="writeUp">
            <Suspense fallback={<div>Loading...</div>}>
                <Component />
            </Suspense>
            <br />
            <hr />
        </div>
    );
}

export default WriteUp;
