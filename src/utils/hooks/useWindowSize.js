import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    type: undefined,
  });
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 640) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          type: "Mobile",
        });
      } else if (window.innerWidth > 640 && window.innerWidth < 1024) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          type: "Tablet",
        });
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          type: "Laptop",
        });
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
