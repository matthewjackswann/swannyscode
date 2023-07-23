import cgVideo from "../Media/ComputerGraphics.mp4";

function Update1() {
    return (<div>
        <p>
            For my 3rd Year Computer Graphics module I created a simple animation in my own rendering engine. The skeleton code provided only had the functionality to set an individual pixels colour. From this we had to add all the features ourself. I created both a rasteriser and more advanced ray-traced renderer. The ray-traced renderer had: dynamic lighting, soft shadows, reflective and refractive materials, environment maps, bump maps, textures, simulated caustics and coloured lighting / materials.
        </p>

        <video className="mx-auto" src={cgVideo} controls>
            Your browser does not support the video tag.
        </video>
    </div>);
}

export default Update1;