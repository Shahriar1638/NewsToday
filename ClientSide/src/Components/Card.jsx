import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import {
  FaUserEdit,
  FaCalendarAlt,
  FaRegBookmark,
  FaBookmark,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";

const Card = ({ article, onClick }) => {
  const { user, loginUser } = useContext(AuthContext);

  const {
    article_id,
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

  const isBookmarked = user?.bookmarks?.includes(article_id);
  const isFavourite = user?.favourites?.includes(article_id);

  const toggleBookmark = async (e) => {
    e.stopPropagation();
    if (!user) return alert("Please log in to bookmark articles.");

    try {
      const res = await fetch(
        "https://news-today-delta.vercel.app/api/user/bookmark",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, article_id }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        loginUser(data.user);
      }
    } catch (err) {
      console.error("Failed to toggle bookmark", err);
    }
  };

  const toggleFavourite = async (e) => {
    e.stopPropagation();
    if (!user) return alert("Please log in to favourite articles.");

    try {
      const res = await fetch(
        "https://news-today-delta.vercel.app/api/user/favourite",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, article_id }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        loginUser(data.user);
      }
    } catch (err) {
      console.error("Failed to toggle favourite", err);
    }
  };

  return (
    <div
      onClick={onClick}
      className="flex flex-col overflow-hidden bg-white border rounded-xl shadow-sm h-full transition-transform hover:scale-[1.02] hover:shadow-md cursor-pointer group relative"
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

        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium shadow z-10">
          {source_id}
        </span>

        <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
          <button
            className="p-1.5 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full text-gray-700 shadow transition-all"
            onClick={toggleBookmark}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
          >
            {isBookmarked ? (
              <FaBookmark className="text-blue-600" />
            ) : (
              <FaRegBookmark className="hover:text-blue-600" />
            )}
          </button>

          <button
            className="p-1.5 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full text-gray-700 shadow transition-all"
            onClick={toggleFavourite}
            title={isFavourite ? "Remove Favourite" : "Favourite"}
          >
            {isFavourite ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="hover:text-red-500" />
            )}
          </button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3
          className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
          title={title}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
          {description}
        </p>
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

        <button className="mt-4 block w-full text-center bg-gray-50 hover:bg-gray-100 text-blue-600 text-sm font-semibold py-2 rounded border border-gray-200 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
