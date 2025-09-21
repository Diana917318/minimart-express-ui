import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, CheckCircle, Clock, Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { orders, drivers, products } from "@/data/mockData";

export default function OrderTracking() {
  const { orderId } = useParams();
  const order = orders.find(o => o.id === parseInt(orderId || "0"));
  const driver = drivers.find(d => d.id === order?.driverId);

  if (!order || !driver) {
    return (
      <div className="pb-20 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Order not found</h2>
          <Link to="/orders">
            <Button>Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const trackingSteps = [
    { status: "Order Confirmed", completed: true, icon: CheckCircle },
    { status: "Preparing Order", completed: true, icon: Clock },
    { status: "Out for Delivery", completed: order.status === "On the way", icon: Truck },
    { status: "Delivered", completed: order.status === "Delivered", icon: CheckCircle },
  ];

  const estimatedTime = new Date(order.estimatedDelivery);
  const timeRemaining = Math.max(0, Math.floor((estimatedTime.getTime() - Date.now()) / (1000 * 60)));

  return (
    <div className="pb-20 min-h-screen bg-background">
      <div className="sticky top-0 bg-card border-b p-4 z-10">
        <div className="flex items-center gap-4">
          <Link to="/orders">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Track Order</h1>
        </div>
      </div>

      <div className="p-4">
        {/* ETA Card */}
        <Card className="mb-6 shadow-medium bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold mb-2">
              {timeRemaining > 0 ? `${timeRemaining} min` : "Arriving now!"}
            </div>
            <p className="text-primary-foreground/90">Estimated delivery time</p>
            <p className="text-sm text-primary-foreground/70 mt-2">
              Order #{order.id} • {estimatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-0">
            <div className="h-48 bg-gradient-to-br from-muted to-muted/50 rounded-t-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Live tracking map</p>
                <p className="text-xs text-muted-foreground">Driver location: Downtown area</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver Info */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={driver.photo} alt={driver.name} />
                <AvatarFallback>{driver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{driver.name}</h3>
                <p className="text-sm text-muted-foreground">★ {driver.rating} • {driver.deliveriesCompleted} deliveries</p>
                <p className="text-sm text-muted-foreground">{driver.licensePlate}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="p-2">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Status Timeline */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Order Status</h3>
            <div className="space-y-4">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    step.completed 
                      ? "bg-success text-success-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    <step.icon className="h-4 w-4" />
                  </div>
                  <span className={`font-medium ${
                    step.completed ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Order Items</h3>
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
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}