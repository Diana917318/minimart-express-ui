import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { categories, products, user, cart } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(cart.items);

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getProductQuantity = (productId: number) => {
    return cartItems.find(item => item.productId === productId)?.quantity || 0;
  };

  const handleAddToCart = (productId: number) => {
    setCartItems(prev => [...prev, { productId, quantity: 1 }]);
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems(prev => {
      if (quantity === 0) {
        return prev.filter(item => item.productId !== productId);
      }
      const existingItem = prev.find(item => item.productId === productId);
      if (existingItem) {
        return prev.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary p-4 text-primary-foreground">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="h-4 w-4" />
            <div>
              <p className="text-sm opacity-90">Deliver to</p>
              <p className="font-semibold">{user.addresses[0].address}</p>
            </div>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/90 border-0 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="p-4">
        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Categories</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "whitespace-nowrap rounded-full",
                selectedCategory === null && "bg-gradient-primary text-primary-foreground"
              )}
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "whitespace-nowrap rounded-full",
                  selectedCategory === category.id && "bg-gradient-primary text-primary-foreground"
                )}
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">
              {selectedCategory 
                ? categories.find(c => c.id === selectedCategory)?.name 
                : "All Products"}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                stock={product.stock}
                quantity={getProductQuantity(product.id)}
                onAddToCart={handleAddToCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}