export interface UserModel {
    email: string;
    password: string;
}
export interface UserData {
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    phone: string;
    email: string;
}
export interface CardProps {
    title: string;
    detail: string | number;
    currency: string;
    percent?: string;
    imgSrc?: string;
    trenddingUp?: boolean;
    showPercent: boolean;
}
export interface PercentProps {
    trenddingUp: boolean;
}