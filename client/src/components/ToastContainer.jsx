import useToast from '../hooks/useToast';

function ToastContainer() {
  const toastContext = useToast();

  if (!toastContext) return null;
  const { toasts, dismissToast } = toastContext;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          className={`toast ${toast.type}`}
          onClick={() => dismissToast(toast.id)}
          type="button"
        >
          {toast.message}
        </button>
      ))}
    </div>
  );
}

export default ToastContainer;
