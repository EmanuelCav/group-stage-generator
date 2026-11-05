export interface IResponseStore {
    isLoading: boolean;
    handleLoading: (data: boolean) => void;
}