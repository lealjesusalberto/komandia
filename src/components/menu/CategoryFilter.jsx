import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
            activeCategory === category.id
              ? 'bg-primary text-white shadow-[0_0_10px_rgba(236,72,153,0.4)]'
              : 'glass hover:bg-white/10 text-text-muted'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
