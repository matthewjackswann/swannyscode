import InPageLink from "./InPageLink";

const ReferenceLink = ({ num }) => {
  return <InPageLink className="tc underline hover:text-primary dark:hover:text-primary-dark cursor-pointer inline" to={`ref${num}`}>[{num}]</InPageLink>
}

export default ReferenceLink;