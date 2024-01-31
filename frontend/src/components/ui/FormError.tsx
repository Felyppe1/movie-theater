import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

export const FormError = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement> 
>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)