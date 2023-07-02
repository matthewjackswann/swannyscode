import { useState } from "react";

function ImageSwapper({className, srcs, alt}) {
    let [selected, setSelected] = useState(0);

    const onClick = () => {
        setSelected(prev => (prev + 1) % srcs.length);
    }

    return <img className={className} src={srcs[selected]} alt={alt} onClick={onClick}/>
}

export default ImageSwapper;