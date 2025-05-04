"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const ImageBackground = ({
  children,
  className,
  containerClassName,
  imageUrl,
  height = 300,
  blur = 0,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden flex flex-col items-center justify-center",
        containerClassName
      )}
      style={{ height }}
    >
      {/* Background Layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: `blur(${blur}px)`,
        }}
      />

      {/* Foreground Content */}
      <div className={cn("relative z-10 w-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
