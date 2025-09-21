import { Link } from "react-router-dom";
import { ArrowLeft, Edit, MapPin, Clock, Heart, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { user, orders } from "@/data/mockData";

export default function Profile() {
  const completedOrders = orders.filter(order => order.status === "Delivered").length;

  return (
    <div className="pb-20 min-h-screen bg-background">
      <div className="sticky top-0 bg-card border-b p-4 z-10">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Profile</h1>
        </div>
      </div>

      <div className="p-4">
        {/* User Info */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">{user.phone}</p>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{completedOrders}</p>
                <p className="text-sm text-muted-foreground">Orders Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">4.8★</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Addresses */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Saved Addresses</h3>
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-1" />
                Add New
              </Button>
            </div>
            <div className="space-y-3">
              {user.addresses.map(address => (
                <div key={address.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{address.label}</p>
                    <p className="text-sm text-muted-foreground">{address.address}</p>
                    <p className="text-sm text-muted-foreground">{address.city}</p>
                  </div>
                  {address.isDefault && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu Options */}
        <div className="space-y-3">
          <Card className="shadow-soft">
            <CardContent className="p-0">
              <div className="space-y-1">
                <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="flex-1 text-left">Order History</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                  <Heart className="h-5 w-5 text-muted-foreground" />
                  <span className="flex-1 text-left">Favorites</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <span className="flex-1 text-left">Settings</span>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-4">
              <button className="w-full flex items-center gap-3 text-destructive hover:bg-destructive/10 transition-colors p-2 rounded">
                <LogOut className="h-5 w-5" />
                <span className="flex-1 text-left">Sign Out</span>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}