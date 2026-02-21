import { FaUserEdit, FaCalendarAlt } from "react-icons/fa";

const Card = ({ article, onClick }) => {
  const {
    title = "Untitled",
    creator = [],
    pubDate,
    source_id = "Unknown Source",
    description = "No description available",
    image_url,
  } = article;

  const formattedDate = pubDate
    ? new Date(pubDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Unknown Date";

  const authorName = creator.length > 0 ? creator.join(", ") : "Unknown Author";

  return (
    <div
      onClick={onClick}
      className="flex flex-col overflow-hidden bg-white border rounded-xl shadow-sm h-full transition-transform hover:scale-[1.02] hover:shadow-md cursor-pointer group"
    >
      <div className="h-48 bg-gray-200 overflow-hidden relative">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x200?text=No+Image";
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-100">
            No Image
          </div>
        )}

        {/* Source Badge overlayed on image */}
        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow">
          {source_id}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3
          className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
          title={title}
        >
          {title}
        </h3>

        {/* Snippet / Description */}
        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
          {description}
        </p>

        {/* Footer info: Author and Date */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center max-w-[60%] gap-1">
            <FaUserEdit className="text-gray-400 text-sm flex-shrink-0" />
            <span className="truncate" title={authorName}>
              {authorName}
            </span>
          </div>

          <div className="flex items-center flex-shrink-0 gap-1">
            <FaCalendarAlt className="text-gray-400 text-sm" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Read More button */}
        <button className="mt-4 block w-full text-center bg-gray-50 hover:bg-gray-100 text-blue-600 text-sm font-semibold py-2 rounded border border-gray-200 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
