import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';

const mockCategories = [
  { id: 'all', name: 'Todos' },
  { id: 'burgers', name: 'Hamburguesas' },
  { id: 'drinks', name: 'Bebidas' },
  { id: 'desserts', name: 'Postres' },
];

const initialProducts = [
  { id: 1, categoryId: 'burgers', name: 'Doble Cheddar', description: 'Doble medallón de carne 150g, doble cheddar, bacon crujiente y salsa de la casa.', price: 5900, visible: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500' },
  { id: 2, categoryId: 'burgers', name: 'Combo Veggie', description: 'Medallón NotMeat, lechuga, tomate, cebolla morada y mayonesa vegana.', price: 4500, visible: true, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=500' },
  { id: 3, categoryId: 'drinks', name: 'Gaseosa 500ml', description: 'Coca-Cola, Sprite, Fanta.', price: 1200, visible: false, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500' },
];

const MenuAdmin = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: 'burgers',
    image: ''
  });

  const handleToggleVisibility = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
  };

  const handleEdit = (product) => {
    console.log('Edit product', product);
    // TODO: Open modal
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };
  
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Por favor ingresa al menos nombre y precio");
      return;
    }
    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price),
      visible: true
    };
    setProducts([...products, productToAdd]);
    setIsModalOpen(false);
    setNewProduct({ name: '', description: '', price: '', categoryId: 'burgers', image: '' });
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.categoryId === activeCategory);

  return (
    <div className="h-full w-full p-6 bg-background overflow-y-auto relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            Gestión de Menú
          </h1>
          <p className="text-text-muted mt-2">Administra tus productos, precios y disponibilidad.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center shadow-[0_0_20px_rgba(236,72,153,0.4)]"
        >
          <Plus size={18} className="mr-2" />
          Nuevo Producto
        </button>
      </div>

      <CategoryFilter 
        categories={mockCategories} 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onToggleVisibility={handleToggleVisibility}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      
      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass w-full max-w-md rounded-2xl p-6 border border-white/10 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Agregar Nuevo Producto</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-muted mb-1">Nombre</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                  placeholder="Ej. Hamburguesa Clásica"
                />
              </div>
              
              <div>
                <label className="block text-sm text-text-muted mb-1">Descripción</label>
                <textarea 
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary h-20 resize-none"
                  placeholder="Descripción del producto..."
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-text-muted mb-1">Precio ($)</label>
                  <input 
                    type="number" 
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                    placeholder="Ej. 1500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-text-muted mb-1">Categoría</label>
                  <select
                    value={newProduct.categoryId}
                    onChange={(e) => setNewProduct({...newProduct, categoryId: e.target.value})}
                    className="w-full bg-surface/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-text appearance-none"
                  >
                    {mockCategories.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id} className="bg-surface">{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-text-muted mb-1">Subir Foto del Producto</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewProduct({...newProduct, image: reader.result});
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 cursor-pointer"
                />
                {newProduct.image && (
                  <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-white/10">
                    <img src={newProduct.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
              >
                Cancelar
              </button>
              <button 
                onClick={handleAddProduct}
                className="flex-1 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white transition-colors text-sm font-medium"
              >
                Guardar Producto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuAdmin;
