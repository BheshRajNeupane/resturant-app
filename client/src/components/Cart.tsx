import  {useState } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Minus, Plus } from "lucide-react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant="link"> Clear All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="text-left">
            <TableCell>
              <Avatar>
                <AvatarImage src="" alt="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell> Biryani</TableCell>
            <TableCell>80</TableCell>
            <TableCell>
              <div className=" flex jusify-content-center align-items-center ">
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="rounded-full bg-gray-200"
                >
                  {" "}
                  <Minus />{" "}
                </Button>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="rounded-full bg-gray-200"
                >
                  1
                </Button>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  className="rounded-full bg-gray-200"
                >
                  <Plus />
                </Button>
              </div>
            </TableCell>
            <TableCell>80</TableCell>
            <TableCell className="text-right">
              <Button variant={"outline"} className="rounded-full bg-gray-200">
                {" "}
                Remove
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">80</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <div className="flex justify-end my-4">
        <Button onClick={()=>setOpen(true)} className="bg-orange hover:bg-hoverOrange">Checkout</Button>
        </div>
        <CheckoutConfirmPage  open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Cart;
