import { useRef, useState, useEffect } from "react";



/*
 * Read the blog post here (this is directly copied and heavily modified):
 * https://letsbuildui.dev/articles/building-a-segmented-control-component
 */

const SegmentedButton = ({segments, callback, defaultIndex = 0, controlRef}) => {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const componentReady = useRef();

    // Determine when the component is "ready"
    useEffect(() => {
        componentReady.current = true;
    }, []);

    useEffect(() => {
        const updateBackgroundSelector = () => {
            const activeSegmentRef = segments[activeIndex].ref;
            const { offsetWidth, offsetLeft, offsetHeight, offsetTop } = activeSegmentRef.current;
            const { style } = controlRef.current;

            style.setProperty("--highlight-width", `${offsetWidth}px`);
            style.setProperty("--highlight-x-pos", `${offsetLeft}px`);
            style.setProperty("--highlight-height", `${offsetHeight}px`);
            style.setProperty("--highlight-y-pos", `${offsetTop - 8}px`); // magic number :(, from margin and padding, of main div
        }

        const updateBackgroundSelectorOnResize = () => {
            componentReady.current = false; // disables animations
            updateBackgroundSelector();
            componentReady.current = true; // enables animations
        }
        
        updateBackgroundSelector();

        window.addEventListener('resize', updateBackgroundSelectorOnResize);

        return () => {
            window.removeEventListener('resize', updateBackgroundSelectorOnResize);
        }
    }, [callback, segments, activeIndex, controlRef]);

    const onInputChange = (index) => {
        setActiveIndex(index);
    };

    return (<div className="segmented-button-container flex" ref={controlRef}>
        {/* before: is for moving background selected area */}
        <div className={`
            segmented-button-${componentReady.current ? "ready" : "" /* only animated once the component has loaded */}
            shadow-2xl justify-between sm:inline-flex
            bg-primary-button border-[1px]  dark:bg-primary-button-dark
            p-1 m-auto relative overflow-hidden rounded-3xl sm:rounded-[10rem]
            before:w-[length:var(--highlight-width)] before:translate-x-[length:var(--highlight-x-pos)]
            before:h-[length:var(--highlight-height)] before:translate-y-[length:var(--highlight-y-pos)]
            before:top-2 before:bottom-2
            before:bg-accent dark:before:bg-accent-dark
            before:rounded-3xl before:absolute before:left-0 before:z-0
        `}>
            {segments?.map((item, i) => (
                <div key={i} className={`relative text-center z-0 min-w-[180px]`} ref={item.ref}>
                    <input type="radio"
                    className="opacity-0 m-0 top-0 right-0 left-0 bottom-0 absolute cursor-pointer w-full h-full"
                    id={item.label}
                    onChange={() => {onInputChange(i); item.callback()}}
                    checked={i === activeIndex}
                    />
                    <label htmlFor={item.label} className={`
                        cursor-pointer block font-bold p-3 transition-colors duration-500 whitespace-pre-wrap sm:whitespace-normal
                        ${i === activeIndex ? "text-secondary-button dark:text-secondary-button-dark" : "text-text dark:text-text-dark"}
                    `}>
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    </div>);
};

export default SegmentedButton;
