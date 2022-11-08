import { toast } from 'react-toastify';

type UseToast = {
  type: 'error' | 'success';
  code: string;
  message: string;
};

export const useToast = ({ type, code, message }: UseToast) => {
  if (type === 'error') {
    return toast.error(`Code: ${code}, message: ${message}`);
  }

  return toast.success('success');
};
