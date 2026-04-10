import type { FridgeItem } from '../db';
import { daysFromTodayForDateString } from '../dateUtils';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface ItemCardProps {
  item: FridgeItem;
  onEdit: (item: FridgeItem) => void;
  onDelete: (id: number) => void;
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  const daysUntilExpiry = daysFromTodayForDateString(item.expiryDate);
  const getCategoryColor = () => {
    const colors: Record<string, string> = {
      'Frutas': 'bg-green-100 border-green-300',
      'Legumes': 'bg-green-200 border-green-400',
      'Laticínios': 'bg-blue-100 border-blue-300',
      'Carnes': 'bg-red-100 border-red-300',
      'Peixes': 'bg-blue-200 border-blue-400',
      'Bebidas': 'bg-blue-300 border-blue-500',
      'Outros': 'bg-gray-100 border-gray-300',
    };
    return colors[item.category] || 'bg-gray-100 border-gray-300';
  };

  const expiryStatus = daysUntilExpiry !== null ? (
    daysUntilExpiry <= 0 ? 'bg-red-500 text-white' : 
    daysUntilExpiry <= 3 ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'
  ) : '';

  return (
    <div className={`border rounded-lg p-4 mb-3 ${getCategoryColor()}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
          <p className="text-gray-600 mb-2">Quantidade: {item.quantity}</p>
          <p className="text-sm text-gray-500 mb-1">Categoria: {item.category}</p>
          {item.expiryDate && (
            <p className="text-sm mb-2">Validade: {new Date(item.expiryDate).toLocaleDateString('pt-PT')}</p>
          )}
          {item.notes && (
            <p className="text-sm italic text-gray-700">Notas: {item.notes}</p>
          )}
        </div>

        {daysUntilExpiry !== null && (
          <div className={`ml-3 px-2 py-1 rounded text-xs font-medium ${expiryStatus}`}>
            {daysUntilExpiry <= 0 ? 'Vencido' : daysUntilExpiry <= 3 ? `Falta ${daysUntilExpiry} dia${daysUntilExpiry !== 1 ? 's' : ''}` : `Vence em ${daysUntilExpiry} dia${daysUntilExpiry !== 1 ? 's' : ''}`}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-3 space-x-2">
        <button
          onClick={() => onEdit(item)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Editar"
        >
          <FiEdit2 />
        </button>
        <button
          onClick={() => onDelete(item.id!)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Remover"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}