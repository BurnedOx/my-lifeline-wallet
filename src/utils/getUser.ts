import { User } from "../interfaces";

export const getUser = () => {
    const userString = localStorage.getItem('user');
    const user: User | null = userString ? JSON.parse(userString) : null;
    return user;
};