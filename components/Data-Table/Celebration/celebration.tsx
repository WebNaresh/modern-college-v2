"use client";
import useCelebration from "@/hooks/celebration";
import ConfettiExplosion from "react-confetti-explosion";

function Celebration() {
  const { celebration } = useCelebration();

  return (
    <>
      {celebration && (
        <ConfettiExplosion
          className=" absolute top-1/2 left-1/2"
          particleCount={100}
          duration={5000}
          colors={["#ff0000", "#00ff00", "#0000ff"]}
          particleSize={10}
          force={1}
          height="100vh"
          width={1000}
          zIndex={9999}
        />
      )}
    </>
  );
}

export default Celebration;
