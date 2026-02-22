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
        return result.secure_url

    } catch (error) {
        console.error("Cloudinary upload error:", error)
        return ""
    }
}

export const normalizeUri = async (uri: string) => {

    try {
        
        if (!uri.startsWith("content://")) return uri

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