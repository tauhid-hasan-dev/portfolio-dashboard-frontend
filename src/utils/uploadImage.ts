export const uploadImage = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const url = `https://api.imgbb.com/1/upload?key=88c431ccc3e21f5debaf87d8420a07c6`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const imageData = await response.json();

    if (imageData.success) {
      const productImage = imageData?.data.url;
      return productImage; // Return the uploaded image URL
    } else {
      throw new Error("Image upload failed.");
    }
  } catch (error) {
    console.error("Error occurred while uploading image:", error);
    throw error; // Re-throw the error for handling at the caller's end
  }
};
