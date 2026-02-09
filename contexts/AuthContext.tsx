import { createContext, ReactNode } from "react";
import { SignIn } from "../app/(tabs)/signIn";

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps){

    async function signIn(){}

    return (
        <AuthContext.Provider value={{
            signIn,
            user: {
                name: 'Victor',
                avatarUrl: 'https://github.com/cuncunco.png'
            }
        }}>
            { children }
        </AuthContext.Provider>
    )
}