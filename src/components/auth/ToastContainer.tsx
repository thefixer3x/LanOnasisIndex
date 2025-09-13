// Toast Container - Simple toast notifications for auth feedback
import { useToast } from "../../hooks/use-toast";
import { X } from "lucide-react";

export const ToastContainer = () => {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            relative flex items-start space-x-3 p-4 rounded-lg shadow-lg border backdrop-blur-sm
            ${toast.variant === 'destructive' 
              ? 'bg-red-50/90 border-red-200 text-red-800' 
              : toast.variant === 'success'
              ? 'bg-green-50/90 border-green-200 text-green-800'
              : 'bg-blue-50/90 border-blue-200 text-blue-800'
            }
          `}
        >
          <div className="flex-1">
            <div className="font-medium text-sm">{toast.title}</div>
            {toast.description && (
              <div className="text-xs mt-1 opacity-90">{toast.description}</div>
            )}
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};