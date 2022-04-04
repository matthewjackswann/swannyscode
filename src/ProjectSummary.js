import {Link} from 'react-router-dom';

const ProjectSummary = (props) => {
    const image = require(`./projects/${props.project.folder}/${props.project.img}`).default;
    const projectInfo = {__html: props.project.info};
    return (
        <div className="projectSummary">
            <Link to={`/projects/${props.project.key}`}>
                <img src={image} alt="project"/>
                <h3>{props.project.title}</h3>
                <p dangerouslySetInnerHTML={projectInfo}></p>
                <div className="infoBar">
                    <div className="faded">Updated: {props.project.updated}</div>
                    <span>Read more...</span>
                </div>
            </Link>
        </div>
        );
}

export default ProjectSummary;