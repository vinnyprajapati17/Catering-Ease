import { ChefHat } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-2xl font-bold text-primary font-headline",
        className
      )}
    >
      <ChefHat className="h-7 w-7" />
      <span>CateringEase</span>
    </Link>
  );
};

export default Logo;
