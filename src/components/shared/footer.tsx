import Logo from "./logo";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground mt-auto">
      <Separator />
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CateringEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
