import { FaWineBottle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex relative w-full h-[90vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/src/assets/wines-photo.avif")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="flex flex-col">
          <div
            className="flex items-center gap-3 mb-4"
            onClick={() => navigate("/")}
          >
            <FaWineBottle className="h-10 w-10 text-rose-500" />
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Vineyard Select
            </h1>
          </div>
          <p className="text-xl text-gray-200 mb-8">
            Curate your restaurant's wine collection with our expertly selected
            premium wines from world-renowned vineyards.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/rankings")}
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Rankings
            </button>
            <button
              onClick={() => navigate("/classification")}
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Predictions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
