import { useState } from "react";
import { MapPin, Clock, CheckCircle, DollarSign, Star, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { drivers, orders, products } from "@/data/mockData";

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const driver = drivers[0]; // Current driver
  const activeOrders = orders.filter(o => o.status === "On the way" && o.driverId === driver.id);
  
  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Good morning, {driver.name}!</h1>
            <p className="text-primary-foreground/80">Ready to make deliveries?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">Go Online</span>
              <Switch checked={isOnline} onCheckedChange={setIsOnline} />
            </div>
            <Badge className={isOnline ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}>
              {isOnline ? "Online" : "Offline"}
            </Badge>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">${(driver.deliveriesCompleted * 8.5).toFixed(0)}</p>
            <p className="text-sm text-primary-foreground/80">Today's Earnings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{activeOrders.length}</p>
            <p className="text-sm text-primary-foreground/80">Active Orders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{driver.rating}⭐</p>
            <p className="text-sm text-primary-foreground/80">Rating</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Quick Actions */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Navigation className="h-5 w-5" />
                <span className="text-sm">Start Navigation</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <MapPin className="h-5 w-5" />
                <span className="text-sm">Update Location</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Deliveries */}
        {isOnline && (
          <Card className="mb-6 shadow-soft">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Active Deliveries</h3>
              
              {activeOrders.length === 0 ? (
                <div className="text-center py-6">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No active deliveries</p>
                  <p className="text-sm text-muted-foreground">You'll receive notifications for new orders</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeOrders.map(order => (
                    <Card key={order.id} className="border border-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              ETA: {new Date(order.estimatedDelivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <Badge className="bg-info text-info-foreground">
                            ${order.total.toFixed(2)}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          {order.items.slice(0, 2).map(item => {
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
                          {order.items.length > 2 && (
                            <p className="text-sm text-muted-foreground">+{order.items.length - 2} more items</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">123 Delivery Street</span>
                        </div>

                        <Button className="w-full mt-3 bg-gradient-primary text-primary-foreground">
                          <Navigation className="h-4 w-4 mr-2" />
                          Navigate to Customer
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Today's Performance */}
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Today's Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Deliveries Completed</span>
                </div>
                <span className="font-semibold">8</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-info" />
                  <span>Average Delivery Time</span>
                </div>
                <span className="font-semibold">22 min</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-success" />
                  <span>Earnings</span>
                </div>
                <span className="font-semibold">${(8 * 8.5).toFixed(2)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-warning" />
                  <span>Customer Rating</span>
                </div>
                <span className="font-semibold">{driver.rating}⭐</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}