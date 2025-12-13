import { Router } from "expo-router"
import { MD3Colors } from "react-native-paper/lib/typescript/types";

export type HeaderAuthPropsType = {
    router: Router;
    title: string;
}

export type PasswordPropsType = {
    label: string; 
    value: string; 
    setValue: (value: string) => void;
    colors: MD3Colors;
}

export type EmailPropsType = {
    email: string; 
    setEmail: (email: string) => void;
    colors: MD3Colors;
}

export type ChangeAuthPropsType = {
    text: string; 
    buttonText: string; 
    navigate: () => void;
    colors: MD3Colors;
}