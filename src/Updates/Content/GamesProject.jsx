import poster from "./Media/GamesProject/poster.png";
import report from "./Media/GamesProject/report.pdf";

function GamesProject() {
    return (<div>
        <p className="pb-2">
            My team of 6 created a VR racing game, where players moved using spider-man swinging to move through a city. The cities were generated entirely from open source data, so players could pick a start location on the map of the world and have the surrounding area generated and a race course made. This was one my favorite modules and my first time working in a fully agile team.
        </p>

        <p className="pb-2">
            Each week we would have a meeting to assign work and update each other on what had been done. We would then follow up meetings throughout the week to help brainstorm ideas and check we were all able to meet targets and adjusting them accordingly.
        </p>

        <p>
            The project included multiple technologies such as: 
        </p>

        <ul className="list-disc pl-8 pb-8">
            <li>Unity Optimizations</li>
            <li>Multi-threading</li>
            <li>Pipeline tools</li>
            <li>Immersive VR controls</li>
            <li>Graph algorithms for road networks</li>
        </ul>

        <iframe className="mx-auto aspect-video h-full w-full" title="report video" width="720" height="520" src="https://www.youtube.com/embed/2H-Qpqbo92M" />
        <p className="pt-2 pb-8">
            Our trailer and technical video for our game.
        </p>

        <img className="max-w-2xl mx-auto" src={poster} alt="Our poster for our game. It's a view up Park Street in Bristol, with the middle being a screen shot of our game standing in the same place." />
        <p className="pt-2 pb-8">
            Our poster for our game. It's a view up Park Street in Bristol, with the middle being a screen shot of our game standing in the same place.
        </p>

        <embed src={report} type="application/pdf" className="mx-auto aspect-square h-full w-full" width= "1080" height= "1080" />
        <p className="pt-2">
            Our report we created as a team for our game.
        </p>
        
    </div>);
}

export default GamesProject;