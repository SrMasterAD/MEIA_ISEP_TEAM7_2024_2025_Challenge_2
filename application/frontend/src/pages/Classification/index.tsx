import { useState } from "react";
import { FaSearch, FaUndo } from "react-icons/fa";

interface Wine {
  name: string;
  type: string;
  price: string;
}

const dishes = ["Carne Vermelha", "Frutos do Mar", "Massas"];

const wineRecommendation: Wine[] = [
  { name: "Vinho Especial", type: "Cabernet Sauvignon", price: "R$100" },
];

export default function Classification() {
  const [selectedDish, setSelectedDish] = useState<string>("");
  const [recommendations, setRecommendations] = useState<Wine[]>([]);

  const resetDishes = () => {
    setSelectedDish("");
    setRecommendations([]);
  };

  const findWine = () => {
    setRecommendations(wineRecommendation);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
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
                <option key={dish} value={dish}>
                  {dish}
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
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
            >
              <FaSearch />
              <span>Search</span>
            </button>
          </div>
        </section>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recommendation
        </h3>
        <div className="flex flex-col space-y-4">
          {recommendations.map((wine) => (
            <div
              key={wine.name}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <span className="text-sm text-gray-900">{wine.name}</span>
              <span className="text-sm text-gray-900">{wine.type}</span>
              <span className="text-sm text-gray-900">{wine.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
