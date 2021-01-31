import { Movie } from './movies';
import { Room } from './room';

interface FailResponse {
    success: false;
    message: string;
}

export interface SuccessResponse<T> {
    success: true;
    data: T;
}

export type SocketResponse<T> = SuccessResponse<T> | FailResponse;

export type SocketCallback<T> = (res: SocketResponse<T>) => void;
