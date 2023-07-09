import { useParams } from "react-router-dom";
import React, { Suspense } from "react";
import UpdatesInfo from "./data.json";
import PageNotFound from "../Pages/PageNotFound";

const getContent = (path) => {
    const Component = React.lazy(() => import(`./Content/${path}`));
    return (
        <div key={path}>
            <Suspense fallback={<div>Loading...</div>}>
                <Component />
            </Suspense>
        </div>
    );
}

function UpdateContent() {
    const { id } = useParams();

    if (!(id in UpdatesInfo && UpdatesInfo[id].extended && !UpdatesInfo[id].projectId)) return <PageNotFound />;

    return (<div>
        {getContent(UpdatesInfo[id].fileName)}
    </div>);
}

export default UpdateContent;