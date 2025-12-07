import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v2 as cloudinary } from "cloudinary";

const S3_BUCKET = process.env.AWS_S3_BUCKET;

let s3Client = null;
if (process.env.AWS_REGION && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  s3Client = new S3Client({ region: process.env.AWS_REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } });
}

if (process.env.CLOUDINARY_URL || (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export async function uploadBufferToS3(buffer, key, contentType) {
  if (!s3Client || !S3_BUCKET) throw new Error("S3 not configured");
  const cmd = new PutObjectCommand({ Bucket: S3_BUCKET, Key: key, Body: buffer, ContentType: contentType, ACL: "public-read" });
  await s3Client.send(cmd);
  const region = process.env.AWS_REGION;
  const url = `https://${S3_BUCKET}.s3.${region}.amazonaws.com/${encodeURIComponent(key)}`;
  return { url };
}

export function uploadBufferToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    if (!cloudinary.config().cloud_name) return reject(new Error("Cloudinary not configured"));
    const stream = cloudinary.uploader.upload_stream({ resource_type: "auto", public_id: `uploads/${Date.now()}-${filename}` }, (error, result) => {
      if (error) return reject(error);
      resolve({ url: result.secure_url, raw: result });
    });
    stream.end(buffer);
  });
}

export async function uploadBuffer(buffer, filename, contentType) {
  // Prefer Cloudinary if configured, else S3
  if (cloudinary.config().cloud_name) {
    return await uploadBufferToCloudinary(buffer, filename);
  }
  if (s3Client && S3_BUCKET) {
    const key = `${Date.now()}-${filename}`;
    return await uploadBufferToS3(buffer, key, contentType);
  }
  throw new Error("No cloud storage configured. Set CLOUDINARY_* or AWS_* env vars.");
}

export default { uploadBuffer, uploadBufferToS3, uploadBufferToCloudinary };
