import {
  FaGlobe,
  FaCalendarAlt,
  FaUserEdit,
  FaTags,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";

const CardDetails = ({ article, onClose }) => {
  if (!article) return null;

  const {
    title,
    link,
    creator = [],
    pubDate,
    source_id,
    description,
    image_url,
    category = [],
    country = [],
    language,
  } = article;

  const formattedDate = pubDate
    ? new Date(pubDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown Date";

  const authorName = creator.length > 0 ? creator.join(", ") : "Unknown Author";

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden my-8 relative">
      {/* Optional Close Button if rendered as a modal or overlay */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-900 border border-transparent text-white p-2 rounded-full shadow-md z-10 hover:bg-red-600 transition-colors"
        >
          <FaTimes />
        </button>
      )}

      {/* Header Image */}
      <div className="h-72 sm:h-96 w-full bg-gray-100 relative">
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/800x400?text=No+Image+Available";
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500 font-medium">
            No Image Available
          </div>
        )}
        {source_id && (
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-bold shadow-lg uppercase tracking-wider">
              {source_id}
            </span>
            {language && (
              <span className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-lg uppercase">
                {language}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FaUserEdit className="text-blue-500 text-lg" />
            <span className="font-medium text-gray-800">{authorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400 text-lg" />
            <span>{formattedDate}</span>
          </div>
          {country.length > 0 && (
            <div className="flex items-center gap-2">
              <FaGlobe className="text-green-500 text-lg" />
              <span className="uppercase">{country.join(", ")}</span>
            </div>
          )}
        </div>

        <div className="prose max-w-none text-gray-800 text-lg leading-relaxed space-y-6">
          {description ? (
            <p className="font-semibold text-xl text-gray-700 leading-snug">
              {description}
            </p>
          ) : (
            <p className="whitespace-pre-wrap">
              No additional description provided by the source.
            </p>
          )}
        </div>

        {/* Categories / Tags Section */}
        {category.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200 flex items-start gap-4">
            <FaTags className="text-gray-400 text-xl mt-1" />
            <div className="flex flex-wrap gap-2">
              {category.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium capitalize border border-gray-200"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-10 flex justify-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all hover:scale-105 active:scale-95"
          >
            Read Original Source
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
