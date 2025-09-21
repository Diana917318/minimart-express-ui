import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNavigation from "./components/layout/BottomNavigation";

// Customer Pages
import Home from "./pages/customer/Home";
import Cart from "./pages/customer/Cart";
import Orders from "./pages/customer/Orders";
import Profile from "./pages/customer/Profile";
import Checkout from "./pages/customer/Checkout";
import OrderTracking from "./pages/customer/OrderTracking";

// Driver Pages
import DriverDashboard from "./pages/driver/Dashboard";
import DriverOrders from "./pages/driver/Orders";
import DriverHistory from "./pages/driver/History";
import DeliveryTracking from "./pages/driver/DeliveryTracking";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Inventory from "./pages/admin/Inventory";
import PromotionsManagement from "./pages/admin/Promotions";
import OrdersManagement from "./pages/admin/OrdersManagement";
import Reports from "./pages/admin/Reports";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={
              <div>
                <Home />
                <BottomNavigation userType="customer" />
              </div>
            } />
            <Route path="/cart" element={
              <div>
                <Cart />
                <BottomNavigation userType="customer" />
              </div>
            } />
            <Route path="/orders" element={
              <div>
                <Orders />
                <BottomNavigation userType="customer" />
              </div>
            } />
            <Route path="/profile" element={
              <div>
                <Profile />
                <BottomNavigation userType="customer" />
              </div>
            } />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
            
            {/* Driver Routes */}
            <Route path="/driver" element={
              <div>
                <DriverDashboard />
                <BottomNavigation userType="driver" />
              </div>
            } />
            <Route path="/driver/orders" element={
              <div>
                <DriverOrders />
                <BottomNavigation userType="driver" />
              </div>
            } />
            <Route path="/driver/history" element={
              <div>
                <DriverHistory />
                <BottomNavigation userType="driver" />
              </div>
            } />
            <Route path="/driver/delivery/:orderId" element={<DeliveryTracking />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/inventory" element={<Inventory />} />
            <Route path="/admin/promotions" element={<PromotionsManagement />} />
            <Route path="/admin/orders" element={<OrdersManagement />} />
            <Route path="/admin/reports" element={<Reports />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
