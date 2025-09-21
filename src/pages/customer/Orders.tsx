import { Link } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orders, products } from "@/data/mockData";

export default function Orders() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "On the way":
        return <Truck className="h-4 w-4" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On the way":
        return "bg-info text-info-foreground";
      case "Delivered":
        return "bg-success text-success-foreground";
      default:
        return "bg-warning text-warning-foreground";
    }
  };

  return (
    <div className="pb-20 min-h-screen bg-background">
      <div className="sticky top-0 bg-card border-b p-4 z-10">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">My Orders</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{order.status}</span>
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    return (
                      <div key={item.productId} className="flex items-center gap-3">
                        <img
                          src={product?.image}
                          alt={product?.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{product?.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    {order.status === "On the way" && (
                      <Link to={`/order-tracking/${order.id}`}>
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          Track Order
                        </Button>
                      </Link>
                    )}
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here</p>
            <Link to="/">
              <Button className="bg-gradient-primary text-primary-foreground">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}