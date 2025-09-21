import { useState } from "react";
import { Plus, Search, Edit, Trash2, AlertTriangle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { products, categories } from "@/data/mockData";

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [productList, setProductList] = useState(products);
  const { toast } = useToast();

  const filteredProducts = productList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
      product.categoryId === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleUpdateStock = (productId: number, newStock: number) => {
    setProductList(prev => 
      prev.map(product => 
        product.id === productId ? { ...product, stock: newStock } : product
      )
    );
    toast({
      title: "Stock Updated",
      description: "Product stock has been updated successfully.",
    });
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "bg-destructive text-destructive-foreground" };
    if (stock <= 5) return { label: "Low Stock", color: "bg-warning text-warning-foreground" };
    return { label: "In Stock", color: "bg-success text-success-foreground" };
  };

  const lowStockCount = productList.filter(p => p.stock <= 5).length;
  const outOfStockCount = productList.filter(p => p.stock === 0).length;

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Manage your product catalog and stock levels</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Product description (optional)" />
              </div>
              <Button className="w-full bg-gradient-primary text-primary-foreground">
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{productList.length}</p>
            <p className="text-sm text-muted-foreground">Total Products</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-warning">{lowStockCount}</p>
            <p className="text-sm text-muted-foreground">Low Stock</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold text-destructive">{outOfStockCount}</p>
            <p className="text-sm text-muted-foreground">Out of Stock</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-success">
              ${productList.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(0)}
            </p>
            <p className="text-sm text-muted-foreground">Inventory Value</p>
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
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          const category = categories.find(c => c.id === product.categoryId);
          const stockStatus = getStockStatus(product.stock);
          
          return (
            <Card key={product.id} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                    <Badge className={stockStatus.color}>
                      {stockStatus.label}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">{category?.name}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Stock - {product.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="newStock">New Stock Quantity</Label>
                            <Input
                              id="newStock"
                              type="number"
                              defaultValue={product.stock}
                              onBlur={(e) => {
                                const newStock = parseInt(e.target.value);
                                if (newStock !== product.stock && newStock >= 0) {
                                  handleUpdateStock(product.id, newStock);
                                }
                              }}
                            />
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Current stock: {product.stock} units
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="p-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}