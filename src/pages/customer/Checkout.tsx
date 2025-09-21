import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Building, Smartphone, Banknote, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { cart, products, user } from "@/data/mockData";

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, Amex" },
  { id: "bank", name: "Bank Transfer", icon: Building, description: "Direct bank transfer" },
  { id: "wallet", name: "Digital Wallet", icon: Smartphone, description: "PayPal, Apple Pay, Google Pay" },
  { id: "cash", name: "Cash on Delivery", icon: Banknote, description: "Pay when you receive" },
];

export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [selectedAddress, setSelectedAddress] = useState(user.addresses[0].id);
  const navigate = useNavigate();
  const { toast } = useToast();

  const subtotal = cart.items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const deliveryFee = 2.5;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    toast({
      title: "Order Placed Successfully!",
      description: "Your order will be delivered in 25-30 minutes.",
    });
    
    // Simulate order creation and redirect to tracking
    setTimeout(() => {
      navigate("/order-tracking/201");
    }, 1500);
  };

  return (
    <div className="pb-20 min-h-screen bg-background">
      <div className="sticky top-0 bg-card border-b p-4 z-10">
        <div className="flex items-center gap-4">
          <Link to="/cart">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Checkout</h1>
        </div>
      </div>

      <div className="p-4">
        {/* Delivery Address */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Delivery Address</h3>
            </div>
            
            <RadioGroup value={selectedAddress.toString()} onValueChange={(value) => setSelectedAddress(parseInt(value))}>
              <div className="space-y-3">
                {user.addresses.map(address => (
                  <div key={address.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={address.id.toString()} id={`address-${address.id}`} />
                    <Label htmlFor={`address-${address.id}`} className="flex-1 cursor-pointer">
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium">{address.label}</p>
                        <p className="text-sm text-muted-foreground">{address.address}</p>
                        <p className="text-sm text-muted-foreground">{address.city}</p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-3">
              {cart.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return (
                  <div key={item.productId} className="flex items-center gap-3">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{product?.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">${((product?.price || 0) * item.quantity).toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Payment Method</h3>
            
            <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={method.id} id={`payment-${method.id}`} />
                    <Label htmlFor={`payment-${method.id}`} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <method.icon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Total */}
        <Card className="shadow-medium">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-gradient-primary text-primary-foreground font-semibold py-3"
            >
              Place Order - ${total.toFixed(2)}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}