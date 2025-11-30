import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockCart } from "@/lib/mock-data";
import { CreditCard, MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const subtotal = mockCart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + taxes;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold font-headline mb-8">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] hidden md:table-cell">Image</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCart.map(({ product, quantity }) => (
                      <TableRow key={product.id}>
                        <TableCell className="hidden md:table-cell">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="rounded-md object-cover"
                            data-ai-hint={product.imageHint}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {product.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="icon">
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={quantity}
                              className="w-14 text-center"
                              readOnly
                            />
                            <Button variant="ghost" size="icon">
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          ${product.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          ${(product.price * quantity).toFixed(2)}
                        </TableCell>
                         <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (8%)</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full text-lg py-6 mt-4">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
