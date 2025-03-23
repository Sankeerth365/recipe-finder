import React from 'react';
import { Clock, Users, ExternalLink } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl 
                    transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-56 object-cover transform transition-transform duration-300 
                     group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-6 text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="font-medium">{recipe.readyInMinutes} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" />
            <span className="font-medium">{recipe.servings} servings</span>
          </div>
        </div>
        <a
          href={recipe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 
                     font-semibold transition-colors duration-300"
        >
          View Recipe <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};