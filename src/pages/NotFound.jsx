import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-red-500">404</h1>

      <h2 className="text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-2">
        Sorry, the page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-200 hover:text-yellow-900 hover:font-bold"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;