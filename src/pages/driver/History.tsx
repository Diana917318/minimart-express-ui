import { Calendar, DollarSign, Clock, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { drivers, products } from "@/data/mockData";

const mockCompletedOrders = [
  {
    id: 298,
    date: "2025-09-21T14:30:00Z",
    items: [
      { productId: 102, quantity: 2, price: 2.2 },
      { productId: 105, quantity: 1, price: 1.2 },
    ],
    total: 5.6,
    deliveryTime: 18,
    rating: 5,
    tip: 2.0,
    customerAddress: "456 Market St",
  },
  {
    id: 297,
    date: "2025-09-21T12:15:00Z",
    items: [
      { productId: 107, quantity: 1, price: 5.5 },
      { productId: 109, quantity: 2, price: 2.0 },
    ],
    total: 9.5,
    deliveryTime: 22,
    rating: 5,
    tip: 1.5,
    customerAddress: "789 Oak Ave",
  },
  {
    id: 296,
    date: "2025-09-21T10:45:00Z",
    items: [
      { productId: 103, quantity: 1, price: 3.0 },
      { productId: 106, quantity: 1, price: 3.8 },
    ],
    total: 6.8,
    deliveryTime: 15,
    rating: 4,
    tip: 1.0,
    customerAddress: "321 Pine St",
  },
];

export default function DriverHistory() {
  const driver = drivers[0];
  const todayEarnings = mockCompletedOrders.reduce((sum, order) => sum + (order.total * 0.15) + order.tip, 0);
  const todayDeliveries = mockCompletedOrders.length;
  const averageDeliveryTime = Math.round(mockCompletedOrders.reduce((sum, order) => sum + order.deliveryTime, 0) / mockCompletedOrders.length);
  const averageRating = (mockCompletedOrders.reduce((sum, order) => sum + order.rating, 0) / mockCompletedOrders.length).toFixed(1);

  return (
    <div className="pb-20 min-h-screen bg-background">
      <div className="sticky top-0 bg-card border-b p-4 z-10">
        <h1 className="text-xl font-bold">Delivery History</h1>
        <p className="text-sm text-muted-foreground">Your performance and completed deliveries</p>
      </div>

      <div className="p-4">
        {/* Today's Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-success">${todayEarnings.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Today's Earnings</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{todayDeliveries}</p>
              <p className="text-sm text-muted-foreground">Deliveries</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-info mx-auto mb-2" />
              <p className="text-2xl font-bold text-info">{averageDeliveryTime}m</p>
              <p className="text-sm text-muted-foreground">Avg. Time</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold text-warning">{averageRating}⭐</p>
              <p className="text-sm text-muted-foreground">Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Overall Performance */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Overall Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Deliveries</span>
                <span className="font-semibold">{driver.deliveriesCompleted}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer Rating</span>
                <span className="font-semibold">{driver.rating}⭐</span>
              </div>
              <div className="flex justify-between">
                <span>Total Earnings</span>
                <span className="font-semibold">${(driver.deliveriesCompleted * 8.5).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate</span>
                <span className="font-semibold text-success">98.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Deliveries */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Recent Deliveries</h2>
          <div className="space-y-4">
            {mockCompletedOrders.map(order => (
              <Card key={order.id} className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()} • {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      Delivered
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

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Delivered to: {order.customerAddress}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{order.deliveryTime}m</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-warning text-warning" />
                        <span>{order.rating}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Earnings</p>
                      <p className="font-semibold text-success">
                        ${((order.total * 0.15) + order.tip).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}