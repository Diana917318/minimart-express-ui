import { useState } from "react";
import { Clock, CheckCircle, X, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { orders, products, drivers } from "@/data/mockData";

const mockPendingOrders = [
  {
    id: 301,
    items: [
      { productId: 102, quantity: 2, price: 2.2 },
      { productId: 107, quantity: 1, price: 5.5 },
    ],
    total: 9.9,
    customerAddress: "789 Oak Street, Apt 2A",
    distance: "1.2 km",
    estimatedTime: "15 min",
  },
  {
    id: 302,
    items: [
      { productId: 105, quantity: 3, price: 1.2 },
      { productId: 109, quantity: 2, price: 2.0 },
    ],
    total: 7.6,
    customerAddress: "456 Pine Avenue, Floor 3",
    distance: "2.1 km", 
    estimatedTime: "18 min",
  },
];

export default function DriverOrders() {
  const [pendingOrders, setPendingOrders] = useState(mockPendingOrders);
  const { toast } = useToast();
  const driver = drivers[0];
  const activeOrders = orders.filter(o => o.status === "On the way" && o.driverId === driver.id);

  const handleAcceptOrder = (orderId: number) => {
    setPendingOrders(prev => prev.filter(o => o.id !== orderId));
    toast({
      title: "Order Accepted!",
      description: "Navigate to the pickup location to start delivery.",
    });
  };

  const handleRejectOrder = (orderId: number) => {
    setPendingOrders(prev => prev.filter(o => o.id !== orderId));
    toast({
      title: "Order Declined",
      description: "The order has been reassigned to another driver.",
      variant: "destructive",
    });
  };

  return (
    <div className="pb-20 min-h-screen bg-background">
      <div className="sticky top-0 bg-card border-b p-4 z-10">
        <h1 className="text-xl font-bold">Available Orders</h1>
        <p className="text-sm text-muted-foreground">Accept orders to start deliveries</p>
      </div>

      <div className="p-4">
        {/* Active Deliveries */}
        {activeOrders.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Current Deliveries</h2>
            <div className="space-y-4">
              {activeOrders.map(order => (
                <Card key={order.id} className="shadow-medium border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          ETA: {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <Badge className="bg-info text-info-foreground">
                        In Progress
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      {order.items.map(item => {
                        const product = products.find(p => p.id === item.productId);
                        return (
                          <div key={item.productId} className="flex items-center gap-2">
                            <img
                              src={product?.image}
                              alt={product?.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <span className="text-sm">{product?.name} x{item.quantity}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-primary text-primary-foreground">
                        <Navigation className="h-4 w-4 mr-2" />
                        Navigate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Pending Orders */}
        <div>
          <h2 className="text-lg font-semibold mb-3">New Order Requests</h2>
          
          {pendingOrders.length === 0 ? (
            <Card className="shadow-soft">
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-semibold mb-2">No pending orders</h3>
                <p className="text-muted-foreground text-sm">
                  You'll receive notifications when new orders are available
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingOrders.map(order => (
                <Card key={order.id} className="shadow-soft border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold">New Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.distance} • {order.estimatedTime} delivery
                        </p>
                      </div>
                      <Badge className="bg-success text-success-foreground">
                        ${order.total.toFixed(2)}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      {order.items.map(item => {
                        const product = products.find(p => p.id === item.productId);
                        return (
                          <div key={item.productId} className="flex items-center gap-2">
                            <img
                              src={product?.image}
                              alt={product?.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <span className="text-sm">{product?.name} x{item.quantity}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mb-4 p-2 bg-muted/30 rounded">
                      <p className="text-sm text-muted-foreground">Delivery to:</p>
                      <p className="text-sm font-medium">{order.customerAddress}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleAcceptOrder(order.id)}
                        className="flex-1 bg-gradient-primary text-primary-foreground"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept Order
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleRejectOrder(order.id)}
                        className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}