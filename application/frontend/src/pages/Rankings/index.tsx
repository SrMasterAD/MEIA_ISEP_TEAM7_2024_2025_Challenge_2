import { useState } from "react";
import { FaUndo, FaSearch } from "react-icons/fa";

interface Criterion {
  attribute: string;
  weight: number;
  option: string;
}

interface Result {
  name: string;
  rating: number;
  score: number;
  price: number;
}

export default function Rankings() {
  const [criteria, setCriteria] = useState<Criterion[]>([
    { attribute: "Preço", weight: 1, option: "menor" },
    { attribute: "Avaliação", weight: 1, option: "maior" },
    { attribute: "Pontuação", weight: 1, option: "maior" },
  ]);

  const [results, setResults] = useState<Result[]>([]);

  const resetCriteria = () => {
    setCriteria([
      { attribute: "Preço", weight: 1, option: "menor" },
      { attribute: "Avaliação", weight: 1, option: "maior" },
      { attribute: "Pontuação", weight: 1, option: "maior" },
    ]);
    setResults([]);
  };

  const searchResults = () => {
    // Simulated results - in a real app, this would fetch from an API
    const mockResults: Result[] = [
      { name: "Château Margaux 2015", rating: 98, score: 95, price: 850 },
      { name: "Opus One 2018", rating: 96, score: 93, price: 650 },
      { name: "Sassicaia 2016", rating: 97, score: 94, price: 450 },
    ];
    setResults(mockResults);
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
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rankings</h2>
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Critérios
          </h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Atributo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opção
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {criteria.map((criterion, index) => (
                <tr key={criterion.attribute}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {criterion.attribute}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={criterion.weight}
                      onChange={(e) =>
                        handleWeightChange(index, parseInt(e.target.value))
                      }
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 bg-white"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={criterion.option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      className="rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 bg-white"
                    >
                      <option value="menor">Menor</option>
                      <option value="maior">Maior</option>
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
              <span>Resetar</span>
            </button>
            <button
              onClick={searchResults}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center space-x-2"
            >
              <FaSearch />
              <span>Pesquisar</span>
            </button>
          </div>
        </section>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Resultados</h3>
        <div className="flex flex-col space-y-4">
          {results.map((result) => (
            <div
              key={result.name}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <span className="text-sm text-gray-900">{result.name}</span>
              <span className="text-sm text-gray-900">{result.rating}</span>
              <span className="text-sm text-gray-900">{result.score}</span>
              <span className="text-sm text-gray-900">{result.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
