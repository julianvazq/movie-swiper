import PosterUnavailable from '../assets/poster_unavailable.png';
import toast from 'react-hot-toast';
import { Renderable, Toast, ToastOptions, ValueOrFunction } from 'react-hot-toast/dist/core/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkIfIncluded = (list: any[], object: { [key: string]: number | string }): boolean => {
    if (!list.length) {
        return false;
    }

    const key = Object.keys(object)[0];

    return Boolean(list.find((element) => element[key] === object[key]));
};

export const generateImageUrl = (imageSrc: string | null, width: 'w342' | 'w500'): string => {
    if (!imageSrc) {
        return PosterUnavailable;
    }

    return `https://image.tmdb.org/t/p/${width}${imageSrc}`;
};

export enum ToastType {
    Success = 'success',
    Error = 'error',
    Custom = 'custom',
}

interface ToastParams {
    type: ToastType;
    message: ValueOrFunction<Renderable, Toast>;
}

export const useToast = ({ type, message }: ToastParams) => {
    const successOptions: ToastOptions = {
        style: {
            backgroundColor: 'var(--blue-active)',
            color: '#FFF',
        },
        iconTheme: {
            primary: 'hsl(213deg 24% 53%)',
            secondary: '#FFF',
        },
    };

    const errorOptions: ToastOptions = {
        duration: 99999,
        style: {
            backgroundColor: 'hsl(0deg 56% 27%)',
            color: '#FFF',
        },
        iconTheme: {
            primary: '#a23636',
            secondary: '#FFF',
        },
    };
    switch (type) {
        case 'success':
            return toast.success(message, successOptions);
        case 'error':
            return toast.error(message, errorOptions);
        case 'custom':
            return toast(message, successOptions);
        default:
            return toast(message, successOptions);
    }
};
