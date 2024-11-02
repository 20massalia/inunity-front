import { Platform, platformResolver } from "@/lib/PlatformResolver";
import { useState, useLayoutEffect } from "react";


export const usePlatform = () => {
    const [platform, setPlatform] = useState<Platform>({});
    const userAgent = navigator.userAgent.toLowerCase()
    useLayoutEffect(() => {
      setPlatform(platformResolver(userAgent));
    }, []);
  
    return platform;
  }