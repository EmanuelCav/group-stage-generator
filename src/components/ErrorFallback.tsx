import { Alert } from "react-native";
import { useEffect } from "react";

let showingErrorAlert = false;

export default function ErrorFallback({
    error,
    resetError
}: {
    error: unknown;
    resetError: () => void;
}) {

    useEffect(() => {

        console.error("ErrorBoundary:", error);

        if (showingErrorAlert) return;

        showingErrorAlert = true;

        Alert.alert(
            "Unexpected error",
            "Something went wrong. Please restart the app.",
            [
                {
                    text: "Restart",
                    onPress: () => {
                        showingErrorAlert = false;
                        resetError();
                    }
                }
            ],
            { cancelable: false }
        );

    }, [error]);

    return null;
}