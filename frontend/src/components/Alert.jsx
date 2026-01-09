import { CheckCircle, AlertCircle } from 'lucide-react';

const Alert = ({ type, message, onClose }) => {
  const styles =
    type === 'success'
      ? 'bg-green-50 text-green-800 border-green-200'
      : 'bg-red-50 text-red-800 border-red-200';

  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div className={`p-4 rounded-lg border ${styles} flex gap-3 mb-4`}>
      <Icon className="h-5 w-5 mt-0.5" />
      <p className="flex-1">{message}</p>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        ×
      </button>
    </div>
  );
};

export default Alert;
