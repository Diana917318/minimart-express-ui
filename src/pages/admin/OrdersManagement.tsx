import { useState } from "react";
import { Eye, Search, Filter, UserCheck, Clock, CheckCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { orders, products, drivers } from "@/data/mockData";

const mockAllOrders = [
  ...orders,
  {
    id: 203,
    userId: 2,
    items: [
      { productId: 104, quantity: 1, price: 4.5 },
      { productId: 108, quantity: 1, price: 6.0 },
    ],
    total: 10.5,
    status: "Preparing",
    driverId: null,
    estimatedDelivery: "2025-09-22T20:30:00Z",
    orderDate: "2025-09-22T19:15:00Z",
  },
  {
    id: 204,
    userId: 3,
    items: [
      { productId: 101, quantity: 2, price: 1.5 },
      { productId: 110, quantity: 1, price: 3.5 },
    ],
    total: 6.5,
    status: "Pending",
    driverId: null,
    estimatedDelivery: "2025-09-22T21:00:00Z",
    orderDate: "2025-09-22T19:45:00Z",
  },
];

export default function OrdersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orderList, setOrderList] = useState(mockAllOrders);

  const filteredOrders = orderList.filter(order => {
    const matchesSearch = order.id.toString().includes(searchQuery);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const assignDriver = (orderId: number, driverId: number) => {
    setOrderList(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, driverId, status: "On the way" }
          : order
      )
    );
  };

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrderList(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />;
      case "Preparing":
        return <Package className="h-4 w-4" />;
      case "On the way":
        return <UserCheck className="h-4 w-4" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-warning text-warning-foreground";
      case "Preparing":
        return "bg-info text-info-foreground";
      case "On the way":
        return "bg-primary text-primary-foreground";
      case "Delivered":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const pendingOrders = orderList.filter(o => o.status === "Pending").length;
  const preparingOrders = orderList.filter(o => o.status === "Preparing").length;
  const activeDeliveries = orderList.filter(o => o.status === "On the way").length;
  const completedToday = orderList.filter(o => o.status === "Delivered").length;

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <p className="text-muted-foreground">Monitor and manage all customer orders</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-warning">{pendingOrders}</p>
            <p className="text-sm text-muted-foreground">Pending Orders</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 text-info mx-auto mb-2" />
            <p className="text-2xl font-bold text-info">{preparingOrders}</p>
            <p className="text-sm text-muted-foreground">Preparing</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <UserCheck className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{activeDeliveries}</p>
            <p className="text-sm text-muted-foreground">Out for Delivery</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">{completedToday}</p>
            <p className="text-sm text-muted-foreground">Completed Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6 shadow-soft">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Preparing">Preparing</SelectItem>
                <SelectItem value="On the way">On the way</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => {
          const assignedDriver = order.driverId ? drivers.find(d => d.id === order.driverId) : null;
          
          return (
            <Card key={order.id} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Ordered: {new Date(order.orderDate).toLocaleString()}</p>
                      <p>Customer ID: {order.userId}</p>
                      {order.estimatedDelivery && (
                        <p>ETA: {new Date(order.estimatedDelivery).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="mb-4">
                  <div className="flex gap-2 flex-wrap">
                    {order.items.slice(0, 3).map(item => {
                      const product = products.find(p => p.id === item.productId);
                      return (
                        <div key={item.productId} className="flex items-center gap-2 bg-muted/30 rounded-lg p-2">
                          <img
                            src={product?.image}
                            alt={product?.name}
                            className="w-8 h-8 rounded object-cover"
                          />
                          <span className="text-sm">{product?.name} x{item.quantity}</span>
                        </div>
                      );
                    })}
                    {order.items.length > 3 && (
                      <div className="flex items-center justify-center bg-muted/30 rounded-lg p-2 min-w-[60px]">
                        <span className="text-sm text-muted-foreground">+{order.items.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Driver Assignment */}
                {assignedDriver ? (
                  <div className="flex items-center gap-3 mb-4 p-3 bg-success/10 rounded-lg">
                    <img
                      src={assignedDriver.photo}
                      alt={assignedDriver.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-success">Assigned to {assignedDriver.name}</p>
                      <p className="text-sm text-success/80">{assignedDriver.licensePlate} • ★{assignedDriver.rating}</p>
                    </div>
                  </div>
                ) : order.status === "Preparing" && (
                  <div className="mb-4 p-3 bg-warning/10 rounded-lg">
                    <p className="text-warning font-medium mb-2">Awaiting Driver Assignment</p>
                    <Select onValueChange={(value) => assignDriver(order.id, parseInt(value))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a driver" />
                      </SelectTrigger>
                      <SelectContent>
                        {drivers.map(driver => (
                          <SelectItem key={driver.id} value={driver.id.toString()}>
                            {driver.name} - {driver.licensePlate} (★{driver.rating})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Order #{order.id} Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Items</h4>
                          <div className="space-y-2">
                            {order.items.map(item => {
                              const product = products.find(p => p.id === item.productId);
                              return (
                                <div key={item.productId} className="flex justify-between text-sm">
                                  <span>{product?.name} x{item.quantity}</span>
                                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {order.status === "Pending" && (
                    <Button 
                      onClick={() => updateOrderStatus(order.id, "Preparing")}
                      className="bg-gradient-primary text-primary-foreground"
                    >
                      Start Preparing
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="p-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}