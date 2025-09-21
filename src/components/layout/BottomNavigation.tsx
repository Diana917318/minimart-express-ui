import { NavLink } from "react-router-dom";
import { Home, ShoppingCart, Package, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const customerNavItems: NavItem[] = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/cart", icon: ShoppingCart, label: "Cart" },
  { to: "/orders", icon: Package, label: "Orders" },
  { to: "/profile", icon: User, label: "Profile" },
];

const driverNavItems: NavItem[] = [
  { to: "/driver", icon: Home, label: "Dashboard" },
  { to: "/driver/orders", icon: Package, label: "Orders" },
  { to: "/driver/history", icon: User, label: "History" },
];

interface BottomNavigationProps {
  userType?: "customer" | "driver";
}

export default function BottomNavigation({ userType = "customer" }: BottomNavigationProps) {
  const navItems = userType === "driver" ? driverNavItems : customerNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/" || item.to === "/driver"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-0 flex-1",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("h-5 w-5 mb-1", isActive ? "text-primary" : "")} />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}