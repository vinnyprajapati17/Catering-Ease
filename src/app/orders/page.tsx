import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockOrders } from "@/lib/mock-data";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrdersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold font-headline mb-8">My Orders</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {mockOrders.map((order) => (
                <AccordionItem key={order.id} value={order.id}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                      <div className="text-left">
                        <span className="font-bold">Order #{order.id}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({order.date})
                        </span>
                      </div>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Cancelled"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                      <span className="font-bold">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-center">Quantity</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.items.map(({ product, quantity }) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell className="text-center">{quantity}</TableCell>
                            <TableCell className="text-right">
                              ${(product.price * quantity).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
