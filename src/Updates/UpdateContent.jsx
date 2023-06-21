import { useParams } from "react-router-dom";
import React, { Suspense } from "react";
import UpdatesInfo from "../Updates/data.json";
import PageNotFound from "../Pages/PageNotFound";

const getContent = (path) => {
    const Component = React.lazy(() => import(`../Updates/${path}`));
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
        {getContent(`Content/${UpdatesInfo[id].fileName}`)}
    </div>);
}

export default UpdateContent;