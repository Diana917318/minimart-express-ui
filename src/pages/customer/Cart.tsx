import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cart, products, promotions } from "@/data/mockData";

export default function Cart() {
  const [cartItems, setCartItems] = useState(cart.items);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<any>(null);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const applyPromoCode = () => {
    const promo = promotions.find(p => p.code === promoCode && p.active);
    if (promo) {
      setAppliedPromo(promo);
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const deliveryFee = 2.5;
  const discount = appliedPromo 
    ? appliedPromo.type === "percentage" 
      ? (subtotal * appliedPromo.discount) / 100
      : appliedPromo.type === "free_delivery" 
        ? deliveryFee
        : 0
    : 0;

  const total = subtotal + deliveryFee - discount;

  if (cartItems.length === 0) {
    return (
      <div className="pb-20 min-h-screen bg-background">
        <div className="sticky top-0 bg-card border-b p-4 z-10">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Shopping Cart</h1>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started</p>
          <Link to="/">
            <Button className="bg-gradient-primary text-primary-foreground">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen bg-background">
      <div className="sticky top-0 bg-card border-b p-4 z-10">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Shopping Cart</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cartItems.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return null;

            return (
              <Card key={item.productId} className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                      <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="h-8 w-8 p-0 rounded-full bg-gradient-primary text-primary-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Promo Code */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-primary" />
              <span className="font-semibold">Promo Code</span>
            </div>
            
            {appliedPromo ? (
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                <div>
                  <p className="font-semibold text-success">{appliedPromo.title}</p>
                  <p className="text-sm text-success/80">Code: {appliedPromo.code}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={removePromo} className="text-success hover:text-success/80">
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                />
                <Button 
                  onClick={applyPromoCode}
                  disabled={!promoCode}
                  className="bg-gradient-primary text-primary-foreground"
                >
                  Apply
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="shadow-medium">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Link to="/checkout" className="block mt-6">
              <Button className="w-full bg-gradient-primary text-primary-foreground font-semibold py-3">
                Proceed to Checkout
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}