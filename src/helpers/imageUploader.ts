import { getStorage } from "firebase-admin/storage";

export async function uploadImage(buffer: Buffer, fileName: string) {
  const fileUrl = `${fileName}.png`;
  const file = getStorage().bucket().file(fileUrl);

  await file.save(buffer, {
    metadata: { contentType: "image/png" },
    public: true,
    validation: "md5",
  });

  const url = `https://storage.googleapis.com/${file.metadata.bucket}/${file.name}`;
  return url;
}
