import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Card from "../Components/Card";
import CardDetails from "../Components/CardDetails";
import { Link } from "react-router";

const Bookmarks = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user || !user.bookmarks || user.bookmarks.length === 0) {
        setArticles([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const idsParam = user.bookmarks.join(",");
        const response = await fetch(
          `http://localhost:3000/api/news?page=${page}&limit=12&ids=${idsParam}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookmarks");
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

    fetchBookmarks();
  }, [page, user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          You must be logged in.
        </h2>
        <Link
          to="/login"
          className="text-blue-600 font-semibold hover:underline bg-blue-50 px-6 py-2 rounded-full border border-blue-100 shadow-sm"
        >
          Go To Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-[60vh] relative">
      <div className="border-b border-gray-200 pb-5 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-800">
            My Bookmarks
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Articles you have saved to read later.
          </p>
        </div>
        <div className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
          {user.bookmarks.length} Saved
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.length > 0 ? (
              articles.map((article) => (
                <Card
                  key={article.article_id}
                  article={article}
                  onClick={() => setSelectedArticle(article)}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
                <span className="text-4xl block mb-2 opacity-50">📑</span>
                <p className="text-lg font-medium text-gray-600">
                  No bookmarks saved yet.
                </p>
                <Link
                  to="/"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Browse All News
                </Link>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-4">
              <button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
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
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

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

export default Bookmarks;
