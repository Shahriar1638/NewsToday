import { FaFilter, FaRedo, FaSearch } from "react-icons/fa";

const FilterSidebar = ({ filters, setFilters, applyFilters }) => {
  const languages = [
    "english",
    "spanish",
    "french",
    "german",
    "italian",
    "chinese",
  ];
  const countries = ["us", "gb", "ca", "au", "in", "fr", "de"];
  const categories = [
    "Business",
    "Technology",
    "Sports",
    "Entertainment",
    "Health",
    "Science",
    "Politics",
  ];
  const datatypes = ["News", "Blog", "Press Release", "Podcast"];
  const handleCategoryToggle = (category) => {
    if (filters.category.includes(category)) {
      setFilters({
        ...filters,
        category: filters.category.filter((c) => c !== category),
      });
    } else {
      setFilters({ ...filters, category: [...filters.category, category] });
    }
  };

  const handleReset = () => {
    setFilters({
      startDate: "",
      endDate: "",
      author: "",
      language: "",
      country: "",
      category: [],
      datatype: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FaFilter className="text-blue-600 text-sm" />
          Analytics Filter
        </h2>
        <button
          onClick={handleReset}
          className="text-gray-400 hover:text-red-600 transition-colors flex items-center gap-1 text-sm font-medium"
        >
          <FaRedo className="text-xs" /> Reset
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date Range
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
            />
            <span className="text-center text-xs text-gray-400 font-medium">
              TO
            </span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Author
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="w-3 h-3 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search author..."
              value={filters.author}
              onChange={(e) =>
                setFilters({ ...filters, author: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-8 p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Language
            </label>
            <select
              value={filters.language}
              onChange={(e) =>
                setFilters({ ...filters, language: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 uppercase"
            >
              <option value="">Any</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Country
            </label>
            <select
              value={filters.country}
              onChange={(e) =>
                setFilters({ ...filters, country: e.target.value })
              }
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 uppercase"
            >
              <option value="">Any</option>
              {countries.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Categories
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = filters.category.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors border ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Content Type
          </label>
          <select
            value={filters.datatype}
            onChange={(e) =>
              setFilters({ ...filters, datatype: e.target.value })
            }
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
          >
            <option value="">All Types</option>
            {datatypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={applyFilters}
          className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
        >
          <FaFilter /> Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
