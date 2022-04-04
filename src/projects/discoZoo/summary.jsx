import { Link } from "react-router-dom";

const Component = () => {
    return (
        <div id="summary">
            <p>
                I had travelled home for Christmas just in time for the internet stop working. Bored and
                procrastinating doing revision I decided to do a project that would be fairly easy and 
                wouldn't require lots of googling.
            </p><br />
            <p>
                I decided to try and remake my disco zoo project again as I liked the simplicity of it but 
                never got round to finishing. It was developed in java and most of my time was spent wrestling
                with drawing the grid. I decided to remake it as a react component instead and I can use 
                HTML and CSS to display the grid, so more time could be spent on the interesting coding.
            </p><br />
            <p>
                The full code is available on <a href="https://github.com/matthewjackswann/discozoo">github</a>. I'm not massively happy with how it looks but it has all
                functionality I wanted and I don't find CSS the most fun.
            </p><br />
            <p>
                The component is also used on my website at <Link to="/discozoo">DiscoZoo</Link>
            </p>
        </div>
    );
}
 
export default Component;