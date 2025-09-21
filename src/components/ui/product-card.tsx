import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  stock?: number;
  quantity?: number;
  onAddToCart?: (id: number) => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  stock = 0,
  quantity = 0,
  onAddToCart,
  onUpdateQuantity,
  className,
}: ProductCardProps) {
  const handleAdd = () => {
    if (quantity === 0) {
      onAddToCart?.(id);
    } else {
      onUpdateQuantity?.(id, quantity + 1);
    }
  };

  const handleSubtract = () => {
    if (quantity > 1) {
      onUpdateQuantity?.(id, quantity - 1);
    } else {
      onUpdateQuantity?.(id, 0);
    }
  };

  return (
    <Card className={cn("overflow-hidden bg-card shadow-soft hover:shadow-medium transition-shadow", className)}>
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2">{name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
              {stock <= 5 && stock > 0 && (
                <span className="text-xs text-warning">Only {stock} left</span>
              )}
              {stock === 0 && (
                <span className="text-xs text-destructive">Out of stock</span>
              )}
            </div>
            
            {stock > 0 && (
              <div className="flex items-center">
                {quantity === 0 ? (
                  <Button
                    size="sm"
                    onClick={handleAdd}
                    className="bg-gradient-primary hover:opacity-90 text-primary-foreground rounded-full h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleSubtract}
                      className="rounded-full h-7 w-7 p-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-semibold min-w-[1.5rem] text-center">{quantity}</span>
                    <Button
                      size="sm"
                      onClick={handleAdd}
                      className="bg-gradient-primary hover:opacity-90 text-primary-foreground rounded-full h-7 w-7 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}