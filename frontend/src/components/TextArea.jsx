import { AlertCircle } from 'lucide-react';

const TextArea = ({ label, error, icon: Icon, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}

        <textarea
          {...props}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none
            ${error ? 'border-red-500' : 'border-gray-300'}`}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;
