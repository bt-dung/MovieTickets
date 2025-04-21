require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
cloudinary.config({
    cloud_name: 'dpxcbtktz',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadQRCode(imagePath) {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'qrcodes',
        });

        await fs.promises.unlink(imagePath);
        const publicId = result.public_id.split('qrcodes/')[1];
        return publicId;

    } catch (error) {
        console.error('Upload lỗi:', error);
        throw error;
    }
}

async function addOverlayToImage(qrId) {
    try {
        const url = cloudinary.url('cinema-ticket3_vrlqol', {
            transformation: [
                {
                    width: 600,
                    crop: "fill",
                    gravity: 'auto'

                },
                {
                    overlay: `qrcodes:${qrId}`,
                    width: 150,
                    height: 150
                },
                {
                    flags: 'layer_apply',
                    gravity: 'east',
                    x: 15,
                    y: -30,
                }
            ]
        });
        return url;
    } catch (error) {
        console.error("Upload lỗi 2: ", error);
        throw error
    }
};

module.exports = { uploadQRCode, addOverlayToImage };

