import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { CheckoutSessionRequest } from "@/types/order.types";
import { useResturantStore } from "@/store/useResturantStore";

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState({
    name: "",
    email: " ",
    contact: " ",
    address: " ",
    city: " ",
    country: " ",
  });
  const { cart } = useCartStore();
  const { createCheckoutSession } = useOrderStore();
  const { restaurant } = useResturantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const checkoutHandler =  async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();

try {
  const checkoutData: CheckoutSessionRequest = {
    cartItems: cart.map((cartItem) => ({
      menuId: cartItem._id,
      name: cartItem.name,
      image: cartItem.image as string,
      price: cartItem.price.toString(),
      quantity: cartItem.quantity.toString(),
    })),
    deliveryDetails: input,

    restaurantId: restaurant?._id as string,
  };
  await createCheckoutSession(checkoutData);
} catch (error) {
  console.log(error);
}
 


    console.log(input);
  }
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent>
        <DialogTitle>ORDER  FORM</DialogTitle>
        <DialogDescription className="text-sm">
          Please fill in the form below to proceed with your order. Your
          information will be used for order processing and delivery.
        </DialogDescription>
        <form  onSubmit={checkoutHandler} className=" flex flex-col ">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
         
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Contact</Label>
            <Input
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={input.address}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
            />
          </div>

          <DialogFooter  className="my-3 ">
            <Button className="bg-orange hover:bg-orange w-full ">Continue to Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmPage;
