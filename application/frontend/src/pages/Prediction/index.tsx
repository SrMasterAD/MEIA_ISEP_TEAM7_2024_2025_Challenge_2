import { useState } from "react";
import { FaSearch, FaUndo } from "react-icons/fa";
import { dishes } from "../../constants/dishes";
import axios from "axios";
import { BarLoader } from "react-spinners";

interface PredictionState {
  typeWine: string;
  grape: string;
  price: string;
}

export default function Prediction() {
  const [selectedDish, setSelectedDish] = useState<string>("");
  const [recommendations, setRecommendations] = useState<PredictionState>();
  const [loading, setLoading] = useState(false);

  const resetDishes = () => {
    setSelectedDish("");
    setRecommendations(undefined);
  };

  const findWine = async () => {
    try {
      setLoading(true);
      const selectedDishCategory = dishes.find(
        (dish) => dish.name === selectedDish
      )?.category;
      const response = await axios.get(`http://localhost:8000/prediction`, {
        params: {
          harmonize: selectedDishCategory,
        },
      });
      setRecommendations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wine recommendations:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 h-[70vh]">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Predictions</h2>
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Choose a dish
          </h3>
          <div className="flex mb-4">
            <select
              id="dish-select"
              value={selectedDish}
              onChange={(e) => setSelectedDish(e.target.value)}
              className="block w-1/3 p-2 border border-gray-300 rounded-md bg-white"
            >
              <option value="">Select a dish</option>
              {dishes.map((dish) => (
                <option key={dish.name} value={dish.name}>
                  {dish.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetDishes}
              className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
            >
              <FaUndo />
              <span>Reset</span>
            </button>
            <button
              onClick={findWine}
              disabled={!selectedDish}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                selectedDish
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaSearch />
              <span>Search</span>
            </button>
          </div>
        </section>
      </div>
      {loading && (
        <div className="flex justify-center items-center mt-6">
          <BarLoader color={"#09f"} loading={loading} width={200} />
        </div>
      )}
      {!loading && recommendations && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recommendation
          </h3>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  Wine type
                </span>
                <span className="text-sm text-gray-900">
                  {recommendations.typeWine}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  Grape
                </span>
                <span className="text-sm text-gray-900">
                  {recommendations.grape}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  Price
                </span>
                <span className="text-sm text-gray-900">
                  {recommendations.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
