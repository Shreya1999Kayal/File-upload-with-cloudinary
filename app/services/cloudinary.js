const cloudinary = require("cloudinary").v2;

const uploadOnCloudinary = async (fileBuffer, folder = "mern-images") => {
    if (!fileBuffer) throw new Error("File buffer is required.");

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "image" },
            (error, result) => {
                if (error) return reject(error);
                resolve({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        );
        stream.end(fileBuffer);
    });
};

module.exports = uploadOnCloudinary;