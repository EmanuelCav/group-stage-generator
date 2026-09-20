import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const listeners = new Set<(value: boolean) => void>();

export const useIsFullName = () => {

    const [isFullName, setFullNameState] = useState<boolean>(false);

    useEffect(() => {
        const loadIsFullName = async () => {
            try {
                const value = await AsyncStorage.getItem("isFullName");
                if (value === null) {
                    setFullNameState(false);
                } else {
                    setFullNameState(value === "yes");
                }
            } catch (error) {
                console.error("Error loading isFullName", error);
                setFullNameState(false);
            }
        };

        loadIsFullName();

        const handleChange = (newValue: boolean) => {
            setFullNameState(newValue);
        }

        listeners.add(handleChange);

        return () => {
            listeners.delete(handleChange);
        };
    }, []);

    const setIsFullName = async (value: boolean) => {
        try {
            setFullNameState(value);
            await AsyncStorage.setItem("isFullName", value ? "yes" : "no");
            listeners.forEach((listener) => listener(value));
        } catch (error) {
            console.error("Error saving isFullName", error);
        }
    }

    return { isFullName, setIsFullName }
}