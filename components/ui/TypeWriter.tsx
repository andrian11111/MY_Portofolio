import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypeWriter() {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(el.current!, {
      strings: [
        "Mobile Developer",
        "Web Developer",
        "IoT Developer",
        "UI/UX Designer",
        "Vidio Editor",
        "UI/Ux Designer",
      ],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  return (
    <h2 className="text-xl md:text-3xl font-semibold text-gray-300 mt-4">
      I am a : {" "}
      <span
        ref={el}
        className="text-rose-500 font-bold"
      ></span>
    </h2>
  );
}