import { useState, useEffect } from "react";
import Card from "./Components/Card";
import CardDetails from "./Components/CardDetails";
import FilterSidebar from "./Components/FilterSidebar";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  // 1. Maintain the input states in the Sidebar
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    author: "",
    language: "",
    country: "",
    category: [],
    datatype: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Build the URL Query dynamically
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        // Append all active filters
        Object.entries(appliedFilters).forEach(([key, value]) => {
          if (value) {
            if (Array.isArray(value) && value.length > 0) {
              queryParams.append(key, value.join(","));
            } else if (!Array.isArray(value)) {
              queryParams.append(key, value);
            }
          }
        });

        const response = await fetch(
          `http://localhost:3000/api/news?${queryParams.toString()}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await response.json();
        setArticles(data.articles);
        setTotalPages(data.pagination.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, limit, appliedFilters]);

  const handleApplyFilters = () => {
    setPage(1);
    setAppliedFilters({ ...filters });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 relative">
      <header className="bg-white shadow relative z-10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            News <span className="text-blue-800">Today</span>
          </h1>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label
                htmlFor="limit-select"
                className="text-sm font-semibold text-gray-600"
              >
                Cards per page:
              </label>
              <select
                id="limit-select"
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-pointer shadow-sm transition-colors"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={45}>45</option>
              </select>
            </div>
            <div className="text-md font-medium px-4 py-2 bg-blue-50 border border-blue-100 rounded-md shadow-sm">
              <span className="text-blue-800 font-bold">{articles.length}</span>{" "}
              Results Loaded
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-0 flex flex-col md:flex-row gap-8 items-start">
        {/* Left Sidebar Layout */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            applyFilters={handleApplyFilters}
          />
        </aside>

        {/* Right Main Content Layout */}
        <div className="flex-1 w-full flex flex-col min-h-[500px]">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
              <p className="text-red-700">Error: {error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <Card
                      key={article.article_id}
                      article={article}
                      onClick={() => setSelectedArticle(article)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10 text-gray-500">
                    No articles found in the database.
                  </div>
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10 space-x-4">
                  <button
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={page === 1}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-gray-600 font-medium">
                    Page <span className="text-blue-600">{page}</span> of{" "}
                    {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setPage((old) =>
                        !totalPages || old < totalPages ? old + 1 : old,
                      )
                    }
                    disabled={page === totalPages}
                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedArticle(null)}
          ></div>
          <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
            <CardDetails
              article={selectedArticle}
              onClose={() => setSelectedArticle(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
