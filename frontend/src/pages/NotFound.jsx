import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="card p-12 text-center">
    <div className="text-8xl mb-4">🔍</div>
    <h1 className="text-5xl font-bold gradient-text mb-4">
      404
    </h1>
    <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
    <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn-primary inline-block">
      Go Back Home
    </Link>
  </div>
);

export default NotFound;
