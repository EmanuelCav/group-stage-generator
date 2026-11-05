export interface IUserStore {
    premium: boolean;
    setPremium: (data: boolean) => void;
}