import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

export const uploadImageToCloudinary = async (uri: string): Promise<string> => {

    const data = new FormData()

    data.append("file", {
        uri,
        name: `photo_${Date.now()}.jpg`,
        type: "image/jpeg"
    } as any)

    data.append("upload_preset", `${process.env.EXPO_PUBLIC_UPLOAD_PRESET}`)
    data.append("cloud_name", `${process.env.EXPO_PUBLIC_CLOUD_NAME}`)

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: data,
        })

        const result = await res.json()

        if (!res.ok) throw new Error(result.error?.message || "Upload failed");

        return result.secure_url

    } catch (error) {
        console.error("Cloudinary upload error:", error)
        throw error
    }
}

export const normalizeUri = async (uri: string) => {

    if (!uri) return "";

    try {

        const fileInfo = await FileSystem.getInfoAsync(uri);

        if (!fileInfo.exists) {
            console.warn("El archivo original no existe en la ruta:", uri);
            return "";
        }

        const fileName = `image_${Date.now()}_${Math.random()}.jpg`
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`

        await FileSystem.copyAsync({
            from: uri,
            to: fileUri,
        })

        return fileUri

    } catch (error) {
        console.log("FileSystem copy error:", error);
        return uri;
    }
}

export const updateImageLimit = async (increment: number) => {

    try {

        const stored = await AsyncStorage.getItem("image_limit_count")
        const count = stored ? parseInt(stored, 10) : 0
        const newCount = Math.max(0, count + increment)
        await AsyncStorage.setItem("image_limit_count", newCount.toString())

    } catch (error) {
        console.log("Error actualizando límite:", error);
    }
};