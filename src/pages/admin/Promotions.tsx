import { useState } from "react";
import { Plus, Edit, Trash2, Calendar, Percent, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { promotions } from "@/data/mockData";

export default function PromotionsManagement() {
  const [promoList, setPromoList] = useState(promotions);
  const [editingPromo, setEditingPromo] = useState<any>(null);
  const { toast } = useToast();

  const handleToggleStatus = (id: number) => {
    setPromoList(prev => 
      prev.map(promo => 
        promo.id === id ? { ...promo, active: !promo.active } : promo
      )
    );
    toast({
      title: "Promotion Updated",
      description: "Promotion status has been updated successfully.",
    });
  };

  const handleDeletePromo = (id: number) => {
    setPromoList(prev => prev.filter(promo => promo.id !== id));
    toast({
      title: "Promotion Deleted",
      description: "The promotion has been removed.",
      variant: "destructive",
    });
  };

  const activePromotions = promoList.filter(p => p.active).length;
  const totalPromotions = promoList.length;

  const getPromoIcon = (type: string) => {
    switch (type) {
      case "percentage":
        return <Percent className="h-4 w-4" />;
      case "free_delivery":
        return <Truck className="h-4 w-4" />;
      default:
        return <Percent className="h-4 w-4" />;
    }
  };

  const getPromoDescription = (promo: any) => {
    switch (promo.type) {
      case "percentage":
        return `${promo.discount}% discount`;
      case "free_delivery":
        return "Free delivery";
      case "fixed":
        return `$${promo.discount} off`;
      default:
        return "Discount";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Promotions Management</h1>
          <p className="text-muted-foreground">Create and manage promotional offers</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create Promotion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Promotion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Promotion Title</Label>
                <Input id="title" placeholder="e.g., Weekend Special" />
              </div>
              
              <div>
                <Label htmlFor="code">Promo Code</Label>
                <Input id="code" placeholder="e.g., WEEKEND20" className="uppercase" />
              </div>
              
              <div>
                <Label htmlFor="type">Promotion Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage Discount</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="free_delivery">Free Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="discount">Discount Value</Label>
                <Input id="discount" type="number" placeholder="20" />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter percentage (%) or dollar amount ($)
                </p>
              </div>
              
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" type="date" />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="active" />
                <Label htmlFor="active">Active immediately</Label>
              </div>
              
              <Button className="w-full bg-gradient-primary text-primary-foreground">
                Create Promotion
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary">{totalPromotions}</div>
            <p className="text-sm text-muted-foreground">Total Promotions</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-success">{activePromotions}</div>
            <p className="text-sm text-muted-foreground">Active Promotions</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-soft">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-info">245</div>
            <p className="text-sm text-muted-foreground">Times Used Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Promotions List */}
      <div className="space-y-4">
        {promoList.map(promo => (
          <Card key={promo.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    {getPromoIcon(promo.type)}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold">{promo.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>Code: <strong>{promo.code}</strong></span>
                      <span>•</span>
                      <span>{getPromoDescription(promo)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Expires: {promo.expiryDate}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge className={promo.active 
                      ? "bg-success text-success-foreground" 
                      : "bg-muted text-muted-foreground"
                    }>
                      {promo.active ? "Active" : "Inactive"}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      Used 23 times
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={promo.active}
                      onCheckedChange={() => handleToggleStatus(promo.id)}
                    />
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Promotion</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Title</Label>
                            <Input defaultValue={promo.title} />
                          </div>
                          <div>
                            <Label>Code</Label>
                            <Input defaultValue={promo.code} />
                          </div>
                          <div>
                            <Label>Discount</Label>
                            <Input defaultValue={promo.discount} />
                          </div>
                          <div>
                            <Label>Expiry Date</Label>
                            <Input type="date" defaultValue={promo.expiryDate} />
                          </div>
                          <Button className="w-full bg-gradient-primary text-primary-foreground">
                            Update Promotion
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeletePromo(promo.id)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Usage Stats */}
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-success">$342</p>
                    <p className="text-xs text-muted-foreground">Revenue Generated</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">23</p>
                    <p className="text-xs text-muted-foreground">Times Used</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-info">8.5%</p>
                    <p className="text-xs text-muted-foreground">Conversion Rate</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {promoList.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="p-12 text-center">
            <Percent className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No promotions created</h3>
            <p className="text-muted-foreground mb-6">Create your first promotion to boost sales</p>
            <Button className="bg-gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create First Promotion
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}