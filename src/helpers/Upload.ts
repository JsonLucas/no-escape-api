import { S3 } from 'aws-sdk';
import { awsAccessKey, awsBucketName, awsSecretAccessKey } from '../utils/env';

export class Upload {
    public async sendFile(base64: string, userId: number) {
        const s3 = new S3({
            credentials: {
                accessKeyId: awsAccessKey ?? "",
                secretAccessKey: awsSecretAccessKey ?? ""
            }
        });
        const extension = base64.split(';')[0].split('/')[1];
        const fileName = `profile-${userId}-${Date.now().toString()}.${extension}`;
        
        const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');

        const params = {
            Body: buffer,
            Bucket: awsBucketName ?? "",
            Key: fileName,
            ContentEncoding: 'base64',
            ContentType: `image/${extension}`
        };

        return new Promise((resolve, reject) => {
            s3.upload(params, {}, (err, data) => {
                // console.log(err, data);
                if(err) return reject(err);
                
                resolve(data);
            });
        });
    }

    public static create () {
        return new Upload();
    }
}