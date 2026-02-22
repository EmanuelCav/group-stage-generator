import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useIsFullName = () => {

    const [isFullName, setIsFullName] = useState<boolean>(false);

    useEffect(() => {
        const loadIsFullName = async () => {
            try {
                const value = await AsyncStorage.getItem("isFullName");

                if (value === null) {
                    setIsFullName(false);
                } else {
                    setIsFullName(value === "yes")
                }
            } catch (error) {
                console.error("Error loading isFullName", error);
                setIsFullName(false)
            }
        }

        loadIsFullName()
    }, [])

    return { isFullName, setIsFullName }
}
