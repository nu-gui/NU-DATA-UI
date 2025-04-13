import React from 'react';
import ResponsiveAnimation from '../animations/ResponsiveAnimation';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category?: string;
  url?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading?: boolean;
  onResultClick?: (result: SearchResult) => void;
  className?: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading = false,
  onResultClick,
  className = '',
}) => {
  return (
    <div className={`search-results ${className}`}>
      {isLoading ? (
        <div className="py-4 text-center">
          <div className="animate-spin h-6 w-6 border-2 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-gray-600">Searching...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-gray-500">No results found</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {results.map((result, index) => (
            <ResponsiveAnimation
              key={result.id}
              type="fadeIn"
              delay={index * 0.05} // Staggered animation
            >
              <li 
                className="py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                onClick={() => onResultClick && onResultClick(result)}
              >
                {result.category && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 mb-1 inline-block">
                    {result.category}
                  </span>
                )}
                <h4 className="font-medium">{result.title}</h4>
                <p className="text-sm text-gray-600">{result.description}</p>
              </li>
            </ResponsiveAnimation>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
