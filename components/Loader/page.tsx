"use client";

import useStore from "@/hooks/loader-hook";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Props = {};

const Loader = (props: Props) => {
  const pathname = usePathname();

  const { loading, setLoading, onceTime } = useStore();
  useEffect(() => {
    window.addEventListener("load", onceTime);
    return () => {
      window.removeEventListener("load", onceTime);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
  }, [pathname]);

  return (
    loading && (
      <div
        id="uniqueLoader"
        className="flex justify-center items-center fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full h-full backdrop-filter backdrop-blur-sm bg-opacity-30 z-50"
      >
        <div className="preloaderBg" id="preloader">
          <div className="preloader"></div>
          <div className="preloader2"></div>
        </div>
      </div>
    )
  );
};

export default Loader;
