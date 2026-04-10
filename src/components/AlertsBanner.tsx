import { FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';

interface AlertsBannerProps {
  expiredCount: number;
  expiringSoonCount: number;
}

export function AlertsBanner({ expiredCount, expiringSoonCount }: AlertsBannerProps) {
  if (expiredCount === 0 && expiringSoonCount === 0) return null;

  return (
    <div className="space-y-2 mb-6" role="region" aria-label="Alertas de validade">
      {expiredCount > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-900">
          <FiAlertCircle className="mt-0.5 shrink-0 text-red-600" size={22} aria-hidden />
          <div>
            <p className="font-semibold">Itens vencidos</p>
            <p className="text-sm text-red-800">
              Tens {expiredCount} item{expiredCount !== 1 ? 's' : ''} com validade ultrapassada. Considera consumir ou deitar fora.
            </p>
          </div>
        </div>
      )}
      {expiringSoonCount > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950">
          <FiAlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={22} aria-hidden />
          <div>
            <p className="font-semibold">A expirar em breve</p>
            <p className="text-sm text-amber-900">
              {expiringSoonCount} item{expiringSoonCount !== 1 ? 's' : ''}{' '}
              {expiringSoonCount === 1 ? 'expira' : 'expiram'} nos próximos 3 dias.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
