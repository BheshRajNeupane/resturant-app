import { Badge } from "./ui/badge";
// import HeroPizza from "@/assets/hero_pizza.png";
import AvailableMenu from "./AvailableMenu";
import { useParams } from "react-router-dom";
import { useResturantStore } from "@/store/useResturantStore";
import { useEffect } from "react";
import { Timer } from "lucide-react";
const RestaurantDetail = () => {
  const params = useParams();
  const { singleRestaurant, getSingleRestaurant } = useResturantStore();

  useEffect(() => {
   
 
    getSingleRestaurant(params.id!); 
    
  }, [params.id]);

 

  return (
    <div className="max-w-6xl mx-auto my-10">
     <div className="w-full">
     <div className=" flex flex-col items-center ">
        <div className="w-full h-32 md:h-6  lg:h-72">
          <img
            src={singleRestaurant?.imageUrl}
            
            alt="restaurant"
            className=" object-cover w-full rounded-lg h-full shadow-lg"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between  mt-4">
          <div className="my-5">
          <h1 className="font-medium text-xl">{singleRestaurant?.restaurantName || "Loading..."}</h1>
            <div className="flex gap-2 my-2">
              { singleRestaurant?.cuisines.map((item, index) => (
                <Badge key={index}> {item} </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time: <span className="text-[#D19254]">{singleRestaurant?.deliveryTime || "NA"} mins</span>
                </h1>
              </div>
            </div>
      </div>
      {singleRestaurant?.menus && <AvailableMenu menus = {singleRestaurant?.menus!}/>} 
     </div>
    </div>
  );
};

export default RestaurantDetail;
