import { useState } from "react";
import { TrendingUp, DollarSign, Package, Users, Calendar, Download, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const mockSalesData = [
  { date: "2025-09-15", revenue: 1850, orders: 42 },
  { date: "2025-09-16", revenue: 2100, orders: 38 },
  { date: "2025-09-17", revenue: 1950, orders: 45 },
  { date: "2025-09-18", revenue: 2350, orders: 52 },
  { date: "2025-09-19", revenue: 2180, orders: 47 },
  { date: "2025-09-20", revenue: 2420, orders: 55 },
  { date: "2025-09-21", revenue: 2350, orders: 48 },
];

const mockTopProducts = [
  { name: "Fresh Milk 1L", sales: 156, revenue: 187.2 },
  { name: "Bananas (1kg)", sales: 134, revenue: 294.8 },
  { name: "White Bread", sales: 128, revenue: 192.0 },
  { name: "Red Apples (1kg)", sales: 98, revenue: 294.0 },
  { name: "Frozen Pizza", sales: 67, revenue: 368.5 },
];

const mockDeliveryStats = [
  { metric: "Average Delivery Time", value: "28 min", change: "-2 min", trend: "down" },
  { metric: "On-Time Deliveries", value: "94.5%", change: "+2.1%", trend: "up" },
  { metric: "Customer Satisfaction", value: "4.8★", change: "+0.2", trend: "up" },
  { metric: "Failed Deliveries", value: "2.3%", change: "-0.8%", trend: "down" },
];

export default function Reports() {
  const [timeRange, setTimeRange] = useState("7d");
  
  const totalRevenue = mockSalesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = mockSalesData.reduce((sum, day) => sum + day.orders, 0);
  const averageOrderValue = totalRevenue / totalOrders;
  const revenueGrowth = 12.5; // Mock growth percentage

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Insights into your business performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold text-success">${totalRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-sm text-success">+{revenueGrowth}%</span>
                </div>
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
                <p className="text-3xl font-bold text-primary">{totalOrders}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-sm text-success">+8.2%</span>
                </div>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Order Value</p>
                <p className="text-3xl font-bold text-info">${averageOrderValue.toFixed(2)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-sm text-success">+3.1%</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Customers</p>
                <p className="text-3xl font-bold text-warning">24</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-sm text-success">+15.6%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart Placeholder */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Revenue chart visualization</p>
                <p className="text-sm text-muted-foreground">Shows daily revenue for the selected period</p>
              </div>
            </div>
            
            {/* Mini stats below chart */}
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
              <div className="text-center">
                <p className="text-lg font-bold text-success">${Math.max(...mockSalesData.map(d => d.revenue))}</p>
                <p className="text-xs text-muted-foreground">Highest Day</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-primary">${Math.round(totalRevenue / mockSalesData.length)}</p>
                <p className="text-xs text-muted-foreground">Daily Average</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-info">+{revenueGrowth}%</p>
                <p className="text-xs text-muted-foreground">Growth Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">${product.revenue.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Performance */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Delivery Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockDeliveryStats.map((stat) => (
              <div key={stat.metric} className="text-center">
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground mb-2">{stat.metric}</p>
                <div className={`inline-flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-success" : "text-info"
                }`}>
                  <TrendingUp className={`h-3 w-3 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                  <span>{stat.change}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="mt-6 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span>Sales Report</span>
              <span className="text-xs text-muted-foreground">Daily/Monthly sales data</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Package className="h-6 w-6" />
              <span>Inventory Report</span>
              <span className="text-xs text-muted-foreground">Stock levels & movement</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Customer Report</span>
              <span className="text-xs text-muted-foreground">Customer analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}