import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CARD_IMG_URL } from "../config";
import { addItem } from "./shared/cartSlice";
import useRestaurant from "./shared/useRestaurant";
import { getTotalAmount } from "./shared/cartSlice";

const RestaurantMenu = () => {
  const [isVisibal, setIsVisibal] = useState(false);
  const { restaurantId } = useParams();
  const restaurantData = useRestaurant(restaurantId);
  console.log(restaurantData);

  const dispatch = useDispatch();

  const handelAddItem = (item) => {
    dispatch(addItem(item));
    console.log(item);
    setIsVisibal(true);
    setTimeout(() => {
      setIsVisibal(false);
    }, 5000);
    dispatch(getTotalAmount());
  };

  return !restaurantData ? (
    <h3 className="text-center">Loding menu please wait.....</h3>
  ) : (
    <div className="py-2">
      <div className=" flex bg-slate-100 w-full p-4 sticky top-0 z-20">
        <div className="ml-32 flex ">
          <img
            className="h-44 mx-3 rounded-md"
            src={CARD_IMG_URL + restaurantData.cloudinaryImageId}
          />
          <div className="p-4">
            <h1 className="font-bold text-3xl">{restaurantData.name}</h1>
            <h3 className="text-xl">{restaurantData.area}</h3>
            <h2>{restaurantData.city}</h2>
            <div className="flex font-semibold">
              <h3>{restaurantData.costForTwoMsg}</h3>
              <span className="px-1">|</span>
              <h3>{restaurantData.avgRatingString} ★ </h3>
              <span className="px-1">|</span>
              <h3>{restaurantData.totalRatingsString} </h3>
            </div>
          </div>
        </div>
        <div className="m-6 border-2 border-dashed  p-3 border-gray-400">
          {restaurantData.aggregatedDiscountInfo?.descriptionList?.map(
            (item) => (
              <h1 className="font-bold p-2">{item.meta}</h1>
            )
          )}
        </div>
      </div>
      <div className="p-5 ml-40">
        {isVisibal && (
          <h1 className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
            Item added to the cart
          </h1>
        )}
        <h2 className="text-2xl font-bold underline ml-[38rem]">Menu</h2>
        <ul className="flex flex-wrap">
          {Object.values(restaurantData?.menu?.items).map((item) => (
            <div className="flex justify-center" key={item.id}>
              <li className="  w-72 h-36 p-8 m-1 shadow-lg hover:shadow-2xl rounded-lg">
                <div>
                  <div className="text-sm font-bold ml-2">
                    {item?.name}
                    {item.isVeg == 0 ? <span>🔴</span> : <span> 🟢 </span>}
                  </div>

                  <div className="ml-2">
                    {item?.price / 100 == 0 ? (
                      <span className="text-sm mr-1">
                        ₹{item?.defaultPrice / 100}
                      </span>
                    ) : (
                      <span className="text-sm mr-1">₹{item?.price / 100}</span>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        handelAddItem(item);
                      }}
                      className=" p-1 bg-green-400 rounded text-sm "
                    >
                      ADD +
                    </button>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default RestaurantMenu;
