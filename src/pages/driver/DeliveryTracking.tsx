import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, MapPin, Clock, CheckCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { orders, products } from "@/data/mockData";

export default function DeliveryTracking() {
  const { orderId } = useParams();
  const [deliveryStatus, setDeliveryStatus] = useState("picked_up");
  const { toast } = useToast();
  
  const order = orders.find(o => o.id === parseInt(orderId || "0"));

  if (!order) {
    return (
      <div className="pb-20 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Order not found</h2>
          <Link to="/driver/orders">
            <Button>Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = (status: string) => {
    setDeliveryStatus(status);
    let message = "";
    
    switch (status) {
      case "picked_up":
        message = "Order picked up successfully";
        break;
      case "en_route":
        message = "En route to customer";
        break;
      case "arrived":
        message = "Arrived at delivery location";
        break;
      case "delivered":
        message = "Order delivered successfully!";
        break;
    }
    
    toast({
      title: "Status Updated",
      description: message,
    });
  };

  const statusSteps = [
    { id: "picked_up", label: "Picked Up", icon: CheckCircle },
    { id: "en_route", label: "En Route", icon: Navigation },
    { id: "arrived", label: "Arrived", icon: MapPin },
    { id: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.id === deliveryStatus);

  return (
    <div className="pb-20 min-h-screen bg-background">
      <div className="sticky top-0 bg-card border-b p-4 z-10">
        <div className="flex items-center gap-4">
          <Link to="/driver/orders">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Delivery #{order.id}</h1>
            <p className="text-sm text-muted-foreground">Track your delivery progress</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Map Placeholder */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-0">
            <div className="h-48 bg-gradient-to-br from-muted to-muted/50 rounded-t-lg flex items-center justify-center">
              <div className="text-center">
                <Navigation className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Navigation Active</p>
                <p className="text-xs text-muted-foreground">2.3 km to destination</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Progress */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Delivery Progress</h3>
            <div className="space-y-4">
              {statusSteps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    index <= currentStepIndex
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <step.icon className="h-4 w-4" />
                  </div>
                  <span className={`font-medium ${
                    index <= currentStepIndex ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.label}
                  </span>
                  {index === currentStepIndex && (
                    <Badge className="bg-primary text-primary-foreground ml-auto">Current</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button variant="outline" className="flex-col h-16 gap-1">
                <Phone className="h-5 w-5" />
                <span className="text-xs">Call Customer</span>
              </Button>
              <Button variant="outline" className="flex-col h-16 gap-1">
                <MessageCircle className="h-5 w-5" />
                <span className="text-xs">Message</span>
              </Button>
            </div>
            
            {/* Status Update Buttons */}
            <div className="space-y-2">
              {deliveryStatus === "picked_up" && (
                <Button 
                  onClick={() => handleStatusUpdate("en_route")}
                  className="w-full bg-gradient-primary text-primary-foreground"
                >
                  Start Delivery
                </Button>
              )}
              {deliveryStatus === "en_route" && (
                <Button 
                  onClick={() => handleStatusUpdate("arrived")}
                  className="w-full bg-gradient-primary text-primary-foreground"
                >
                  Mark as Arrived
                </Button>
              )}
              {deliveryStatus === "arrived" && (
                <Button 
                  onClick={() => handleStatusUpdate("delivered")}
                  className="w-full bg-gradient-primary text-primary-foreground"
                >
                  Complete Delivery
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Order Details</h3>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Delivery Address</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                123 Delivery Street, Apt 4B<br />
                New York, NY 10001
              </p>
            </div>

            <div className="space-y-3">
              {order.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return (
                  <div key={item.productId} className="flex items-center gap-3">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product?.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Order Total</span>
                <span className="text-xl font-bold text-primary">${order.total.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground">Your delivery fee: ${(order.total * 0.15).toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Customer Notes */}
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Delivery Notes</h3>
            <p className="text-sm text-muted-foreground">
              Please ring doorbell and wait for customer. Apartment entrance is on the side of the building.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}