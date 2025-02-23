import { Badge } from "./ui/badge";
import HeroPizza from "@/assets/hero_pizza.png";
const RestaurantDetail = () => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className=" flex flex-col items-center ">
        <div className="w-full h-32 md:h-6  lg:h-72">
          <img
            src={HeroPizza}
            alt="restaurant"
            className=" object-cover w-full rounded-lg h-full shadow-lg"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between  mt-4">
          <div className="my-5">
            <h1 className="font-medium text-xl">Tandoori Tadkha</h1>
            <div className="flex gap-2 my-2">
              {["North Indian", "Chinese", "Fast Food"].map((item, index) => (
                <Badge key={index}> {item} </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col  mt-4">
          <h2>
            DeliveryTime : <span>20 mins</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
