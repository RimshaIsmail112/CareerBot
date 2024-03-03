import * as React from "react"

import { cn } from "@/lib/utils"



const Input = React.forwardRef(({ className, type, Icon, finalIcon, ...props }, ref) => {
  return (
    (<div className={cn(
            "flex justify-center gap-1 items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}>
            {Icon}
            <input
                type={type}
                className='bg-transparent w-full h-full outline-none'
                ref={ref}
                {...props} />
            {finalIcon}

        </div>
    )
  );
})
Input.displayName = "Input"

export {Input}
