import { FiDatabase } from 'react-icons/fi';
import type { FridgeItem } from '../db';

interface StatsPanelProps {
  items: FridgeItem[];
  expiredItems: number;
  expiringSoonItems: number;
}

export function StatsPanel({ items, expiredItems, expiringSoonItems }: StatsPanelProps) {
  const productLines = items.length;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const categories = items.reduce((acc: Record<string, number>, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.quantity;
    return acc;
  }, {});

  const topCategories = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 border">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FiDatabase className="mr-2" /> Estatísticas do Frigorífico
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl mb-1 text-slate-600">📦</div>
          <p className="text-sm text-gray-600">Produtos</p>
          <p className="font-semibold text-lg">{productLines}</p>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-1 text-blue-600">📊</div>
          <p className="text-sm text-gray-600">Unidades totais</p>
          <p className="font-semibold text-lg">{totalItems}</p>
        </div>

        <div className="text-center">
          <div className="text-2xl mb-1 text-red-600">🚨</div>
          <p className="text-sm text-gray-600">Vencidos</p>
          <p className="font-semibold text-lg">{expiredItems}</p>
        </div>

        <div className="text-center">
          <div className="text-2xl mb-1 text-yellow-600">⏳</div>
          <p className="text-sm text-gray-600">A expirar em 3 dias</p>
          <p className="font-semibold text-lg">{expiringSoonItems}</p>
        </div>
      </div>

      {topCategories.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Top Categorias</h3>
          <ul className="space-y-1">
            {topCategories.map(([category, quantity]) => (
              <li key={category} className="flex justify-between items-center text-sm">
                <span className="capitalize">{category}</span>
                <span className="font-medium">{quantity} item{quantity !== 1 ? 's' : ''}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}