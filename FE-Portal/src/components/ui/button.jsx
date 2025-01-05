import { cva } from 'class-variance-authority';
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
const buttonStyles = cva(
    'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none',
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                blue: "bg-blue-500 hover:bg-blue-600"
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
                xl: "h-14 sm:h-16 rounded-md px-14 text-lg sm:text-xl font-bold", // added
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = ({ variant, size, children, ...props }) => {
    return (
        <button className={buttonStyles({ variant, size })} {...props}>
            {children}
        </button>
    );
};

Button.displayName = "Button";

export { Button, buttonStyles };
