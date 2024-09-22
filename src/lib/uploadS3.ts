"use server";
import { S3 } from "@aws-sdk/client-s3";
import { env } from "~/env";

const s3 = new S3({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function uploadS3(file: Buffer, uuid: string, type: string) {
  if (uuid) {
    await s3
      .putObject({
        Bucket: "mtc-images",
        Key: uuid,
        Body: Buffer.from(file),
        ContentType: type,
      })
  } else {
    console.log("No UUID");
  }
}
