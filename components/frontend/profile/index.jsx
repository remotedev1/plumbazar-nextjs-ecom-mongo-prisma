import { ShippingAddress } from "@/app/(client)/checkout/_components/shipping-address";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "./_components/profile";
import OrdersPage from "./_components/orders/page";

const ProfileTab = () => {
  return (
    <Tabs defaultValue="account" className="w-full container">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="address">Address</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Your profile.</TabsContent>
      <TabsContent value="account">
        <div className="w-full p-6 bg-slate-100 rounded shadow-lg">
          <Profile />
        </div>
      </TabsContent>
      <TabsContent value="address">Manage Address.</TabsContent>
      <TabsContent value="address">
        <div className="w-full p-6 bg-slate-100 rounded shadow-lg">
          <ShippingAddress />
        </div>
      </TabsContent>
      <TabsContent value="orders">Your Orders.</TabsContent>
      <TabsContent value="orders">
        <div className="w-full p-6 bg-slate-100 rounded shadow-lg">
          <OrdersPage />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTab;
