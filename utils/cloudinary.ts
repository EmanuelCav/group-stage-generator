export const uploadImageToCloudinary = async (uri: string): Promise<string> => {

    const data = new FormData()

    const fileName = uri.split("/").pop() || `photo.jpg`
    const fileType = fileName.split(".").pop()

    data.append("file", {
        uri,
        name: fileName,
        type: `image/${fileType}`,
    } as any);

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
