import React, { useState } from 'react';
import { Search, ChefHat, Loader2 } from 'lucide-react';
import axios from 'axios';
import { Recipe, SearchResponse } from './types';
import { RecipeCard } from './components/RecipeCard';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchRecipes = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not found. Please add your Spoonacular API key to the .env file.');
      }

      const response = await axios.get<SearchResponse>(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            apiKey: apiKey,
            query: query,
            addRecipeInformation: true,
            number: 12
          }
        }
      );
      setRecipes(response.data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch recipes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchRecipes();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <ChefHat className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Recipe Finder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover delicious recipes from around the world
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-16">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for recipes..."
                className="w-full px-6 py-4 pl-12 text-lg border-2 border-orange-100 rounded-2xl 
                         focus:ring-4 focus:ring-orange-100 focus:border-orange-500 
                         transition-all duration-300 bg-white/80 backdrop-blur-sm"
              />
              <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 
                       focus:ring-4 focus:ring-orange-200 transition-all duration-300 
                       disabled:opacity-50 disabled:hover:bg-orange-500 
                       font-semibold text-lg shadow-lg shadow-orange-500/30"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 mx-auto max-w-2xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Empty State */}
        {!loading && recipes.length === 0 && (
          <div className="text-center py-16">
            <ChefHat className="w-20 h-20 mx-auto mb-6 text-orange-200" />
            <p className="text-xl text-gray-500">
              Ready to discover amazing recipes?
            </p>
            <p className="text-gray-400 mt-2">
              Type a dish or ingredient to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;