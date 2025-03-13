import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,SelectGroup
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Orders = () => {
  return (
    <div className=" max-w-6xl mx-auto my-10">
      <h1 className="font-extrabold text-2xl mb-5">Orders</h1>
      <div className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex-1 mb-6 sm:mb-0 text-left">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Order ID:
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            <span className="font-semibold">Address: </span>
            Ktm
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            <span className="font-semibold">Total Amount: </span>
            30
          </p>
        </div>
        <div className="w-full sm:w-1/3">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray300 mb-2">
                Order Status
              </Label>
              <Select
                // onValueChange={(newStatus) =>
                //   handleStatusChange(order._id, newStatus)
                // }
                // defaultValue={order.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Pending",
                      "Confirmed",
                      "Preparing",
                      "OutForDelivery",
                      "Delivered",
                    ].map((status: string, index: number) => (
                      <SelectItem key={index} value={status.toLowerCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
      </div>
    </div>
  );
};

export default Orders;
