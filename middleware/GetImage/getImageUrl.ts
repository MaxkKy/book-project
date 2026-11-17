const NOT_IMAGE = "/images/notImage.jpeg";
export function getImage(imagePath?: string | null):string {
  if (!imagePath || imagePath.trim() === "") {
    return NOT_IMAGE;
  }
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const baseURL = process.env.NEXT_PUBLIC_LOCAL_API || "http://localhost:8000"

  const defaultImagePath = (imagePath.startsWith("/") ? imagePath : `/${imagePath}`)
  return `${baseURL}${defaultImagePath}`
}
