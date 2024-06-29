import "dotenv/config";

export const port = process.env.PORT || 5000;
export const cryptoSecretKey = process.env.CRYPTO_SECRET || "";
export const cryptoIvKey = process.env.CRYPTO_IV_SECRET || "";
export const cryptoAlgorithm = process.env.CRYPTO_ALGORITHM || "AES-256-CBC";

export const awsAccessKey = process.env.AWS_ACCESS_KEY;
export const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
export const awsBucketName = process.env.AWS_S3_BUCKET_NAME
export const awsRegion = process.env.AWS_REGION