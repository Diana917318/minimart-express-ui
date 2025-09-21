import { useState } from "react";
import { Package, DollarSign, Users, TrendingUp, Clock, Star, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminStats, orders, products, drivers, promotions } from "@/data/mockData";

export default function AdminDashboard() {
  const [timeFrame, setTimeFrame] = useState("today");
  
  const activeOrders = orders.filter(o => o.status === "On the way").length;
  const lowStockProducts = products.filter(p => p.stock <= 5).length;
  const activeDrivers = drivers.length;

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">MiniMarket Admin</h1>
          <p className="text-muted-foreground">Manage your store operations</p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold text-success">${adminStats.revenue.toLocaleString()}</p>
                <p className="text-sm text-success">+12% from yesterday</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-3xl font-bold text-primary">{adminStats.totalOrders}</p>
                <p className="text-sm text-success">+8 new orders</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Drivers</p>
                <p className="text-3xl font-bold text-info">{activeDrivers}</p>
                <p className="text-sm text-info">All online</p>
              </div>
              <Users className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Delivery</p>
                <p className="text-3xl font-bold text-warning">{adminStats.averageDeliveryTime}m</p>
                <p className="text-sm text-success">-2 min from avg</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-soft border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-warning" />
              <div>
                <p className="font-semibold text-warning">Low Stock Alert</p>
                <p className="text-sm text-muted-foreground">{lowStockProducts} products need restocking</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-success" />
              <div>
                <p className="font-semibold text-success">Sales Trending Up</p>
                <p className="text-sm text-muted-foreground">15% increase this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-l-4 border-l-info">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-info" />
              <div>
                <p className="font-semibold text-info">Customer Satisfaction</p>
                <p className="text-sm text-muted-foreground">4.8★ average rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} items • ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <Badge className={
                    order.status === "Delivered" 
                      ? "bg-success text-success-foreground" 
                      : "bg-info text-info-foreground"
                  }>
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Promotions */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Active Promotions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {promotions.filter(p => p.active).map(promo => (
                <div key={promo.id} className="p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{promo.title}</h4>
                    <Badge className="bg-success text-success-foreground">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Code: {promo.code}</p>
                  <p className="text-sm text-muted-foreground">
                    {promo.type === "percentage" 
                      ? `${promo.discount}% off` 
                      : promo.type === "free_delivery" 
                        ? "Free delivery" 
                        : `$${promo.discount} off`
                    }
                  </p>
                  <p className="text-xs text-muted-foreground">Expires: {promo.expiryDate}</p>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create New Promotion
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-20 flex-col gap-2">
          <Package className="h-6 w-6" />
          <span>Manage Inventory</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <Users className="h-6 w-6" />
          <span>Driver Management</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <TrendingUp className="h-6 w-6" />
          <span>View Reports</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <Star className="h-6 w-6" />
          <span>Customer Reviews</span>
        </Button>
      </div>
    </div>
  );
}