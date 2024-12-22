import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, Type } from "@aws-sdk/client-s3";

const bucketName = process.env.NEXT_PUBLIC_BUCKET_NAME
const bucketRegion = process.env.NEXT_PUBLIC_BUCKET_REGION
const accessKeyId = process.env.NEXT_PUBLIC_ACCESS_KEY
const secretAccessKey = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY

//@ts-ignore
const client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
});

export async function s3Upload(fileBuffer: any, fileName: any, fileType: any) {
    const uploadParams = {
      Bucket: bucketName, 
      Body: fileBuffer,
      Key: fileName,
      ContentType: fileType
    };

    return client.send(new PutObjectCommand(uploadParams))
};