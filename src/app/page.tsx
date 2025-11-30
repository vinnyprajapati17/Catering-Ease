import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockProducts } from "@/lib/mock-data";
import { ShoppingCart } from "lucide-react";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            Exquisite Catering for Any Occasion
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover our curated selection of delicious dishes, handcrafted by our
            expert chefs to make your event unforgettable.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold font-headline mb-8">Our Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mockProducts.map((product) => (
              <Card key={product.id} className="flex flex-col overflow-hidden group">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-48 transform transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={product.imageHint}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">{product.name}</CardTitle>
                  <CardDescription className="h-12 overflow-hidden">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow"></CardContent>
                <CardFooter className="flex justify-between items-center">
                  <p className="text-xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                  <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
