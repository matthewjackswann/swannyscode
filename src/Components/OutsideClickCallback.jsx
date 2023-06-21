import React, { useRef, useEffect } from "react";

// taken from https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}


export default function OutsideClickCallback(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.onClickLeave);

  return <div className={props.className} ref={wrapperRef}>{props.children}</div>;
}