import { useState, useEffect } from 'react';
import { db } from './db';
import type { FridgeItem } from './db';
import { AddItemModal } from './components/AddItemModal';
import { EditItemModal } from './components/EditItemModal';
import { ItemCard } from './components/ItemCard';
import { StatsPanel } from './components/StatsPanel';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';

function App() {
  const [items, setItems] = useState<FridgeItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<FridgeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<FridgeItem | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const allItems = await db.items.toArray();
      setItems(allItems);
      setFilteredItems(allItems);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    let result = [...items];
    
    if (searchTerm) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    setFilteredItems(result);
  }, [searchTerm, selectedCategory, items]);

  const calculateDaysUntilExpiry = (expiryDate: string | undefined): number | null => {
    if (!expiryDate) return null;
    
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const expiredItems = items.filter(item => {
    if (!item.expiryDate) return false;
    const daysUntilExpiry = calculateDaysUntilExpiry(item.expiryDate);
    return daysUntilExpiry !== null && daysUntilExpiry <= 0;
  }).length;

  const expiringSoonItems = items.filter(item => {
    if (!item.expiryDate) return false;
    const daysUntilExpiry = calculateDaysUntilExpiry(item.expiryDate);
    return daysUntilExpiry !== null && daysUntilExpiry > 0 && daysUntilExpiry <= 3;
  }).length;

  const categories = ['Todos', ...Array.from(new Set(items.map(item => item.category)))];

  const handleDelete = async (id: number) => {
    await db.items.delete(id);
    setItems(await db.items.toArray());
  };

  const handleItemAdded = async () => {
    setItems(await db.items.toArray());
  };

  const handleItemUpdated = async () => {
    setItems(await db.items.toArray());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">🧊 Fridge Manager</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <FiPlus className="mr-2" /> Adicionar Item
          </button>
        </div>

        <StatsPanel
          items={items}
          expiredItems={expiredItems}
          expiringSoonItems={expiringSoonItems}
        />

        <div className="bg-white rounded-lg shadow p-4 mb-6 border">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar itens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value === 'Todos' ? null : e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum item encontrado.</p>
            <p className="text-sm text-gray-400 mt-2">Tenta adicionar alguns itens ao teu frigorífico!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map(item => {
              const daysUntilExpiry = calculateDaysUntilExpiry(item.expiryDate);
              return (
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={(item) => {
                    setEditingItem(item);
                    setShowEditModal(true);
                  }}
                  onDelete={handleDelete}
                  daysUntilExpiry={daysUntilExpiry}
                />
              );
            })}
          </div>
        )}

        {showAddModal && (
          <AddItemModal
            onClose={() => setShowAddModal(false)}
            onItemAdded={handleItemAdded}
          />
        )}

        {showEditModal && editingItem && (
          <EditItemModal
            item={editingItem}
            onClose={() => setShowEditModal(false)}
            onItemUpdated={handleItemUpdated}
          />
        )}
      </div>
    </div>
  );
}

export default App;