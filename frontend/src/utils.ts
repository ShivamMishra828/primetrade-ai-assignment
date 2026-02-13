import toast from 'react-hot-toast';

export const handleSuccess = (msg: string): void => {
    toast.success(msg);
};

export const handleError = (msg: string): void => {
    toast.error(msg);
};
