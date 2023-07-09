import Collapsible from "../../Components/Collapsible";

function Update1() {

    return (<div className="border-solid border-accent border-2 rounded-md p-2">
        <Collapsible header={<div className="my-auto">This is the header</div>}>
        <h1 className="text-5xl">This is a heading</h1>
                <p className="pt-2">
                    Each ant can only move in upto 3 different directions each turn. Either in the direction it is currently moving, one turn left, or one turn right. If any of these directions are blocked by a wall, then the ant can instead go in the opposite direction, turning around. If both of forwards and backwards are blocked then the weight given to this direction is 0, so the ant can't move in that direction.
                </p>

                <p className="py-2">
                    The ants next direction is picked randomly from the set of possible options. They are weighted by adding a base weight value to the concentration of the target pheromone. This happens once every update and each ant's direction and x, y position are updated accordingly.
                </p>
        </Collapsible>
    </div>);
}

export default Update1;