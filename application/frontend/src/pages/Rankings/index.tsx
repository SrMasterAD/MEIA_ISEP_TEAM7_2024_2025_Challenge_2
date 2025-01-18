import React, { useState } from "react";
import { FaSearch, FaUndo } from "react-icons/fa";
import axios from "axios";
import { BarLoader } from "react-spinners";

interface Criterion {
  attribute: string;
  weight: number;
  option: string;
}

interface Result {
  wineName: string;
  wineryName: string;
  rating: string;
  price: string;
  abv: string;
  body: string;
  acidity: string;
}

export default function Rankings() {
  const [criteria, setCriteria] = useState<Criterion[]>([
    { attribute: "Price", weight: 1, option: "lower" },
    { attribute: "Rating", weight: 1, option: "higher" },
    { attribute: "Score", weight: 1, option: "higher" },
  ]);

  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const resetCriteria = () => {
    setCriteria([
      { attribute: "Price", weight: 1, option: "lower" },
      { attribute: "Rating", weight: 1, option: "higher" },
      { attribute: "Score", weight: 1, option: "higher" },
    ]);
    setResult(null);
  };

  const searchResults = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/ranking",
        criteria,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rankings:", error);
      setLoading(false);
    }
  };

  const handleWeightChange = (index: number, value: number) => {
    const newCriteria = [...criteria];
    newCriteria[index].weight = value;
    setCriteria(newCriteria);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newCriteria = [...criteria];
    newCriteria[index].option = value;
    setCriteria(newCriteria);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Rankings</h2>
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Criteria</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attribute
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {criteria.map((criterion, index) => (
              <tr key={criterion.attribute}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {criterion.attribute}
                </td>
                <td className="flex flex-col w-5/6 px-6 py-4 whitespace-nowrap">
                  <span className="ml-auto mr-auto mb-1 text-sm text-gray-900">
                    {criterion.weight}
                  </span>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    value={criterion.weight}
                    onChange={(e) =>
                      handleWeightChange(index, parseInt(e.target.value))
                    }
                    className="rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 bg-white"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={criterion.option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 bg-white"
                  >
                    <option value="lower">Minimize</option>
                    <option value="higher">Maximize</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={resetCriteria}
            className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <FaUndo />
            <span>Reset</span>
          </button>
          <button
            onClick={searchResults}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <FaSearch />
            <span>Search</span>
          </button>
        </div>
      </section>
      {loading && (
        <div className="flex justify-center items-center mt-6">
          <BarLoader color={"#09f"} loading={loading} width={200} />
        </div>
      )}{" "}
      {!loading && result && (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Results</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  Wine Name
                </span>
                <span className="text-sm text-gray-900">{result.wineName}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  Winery Name
                </span>
                <span className="text-sm text-gray-900">
                  {result.wineryName}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  Rating
                </span>
                <span className="text-sm text-gray-900">{result.rating}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  Price
                </span>
                <span className="text-sm text-gray-900">${result.price}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">ABV</span>
                <span className="text-sm text-gray-900">{result.abv}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  Body
                </span>
                <span className="text-sm text-gray-900">{result.body}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700">
                  Acidity
                </span>
                <span className="text-sm text-gray-900">{result.acidity}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
