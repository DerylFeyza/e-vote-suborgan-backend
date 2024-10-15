"use server";

import { UploadApiResponse } from "cloudinary";

import cloudinary from "@/lib/cloudinary";

export async function imageUploader(file: File | any) {
	const buffer: Buffer = Buffer.from(await file.arrayBuffer());
	try {
		const upload: UploadApiResponse | undefined = await new Promise(
			(resolve, reject) => {
				cloudinary.uploader
					.upload_stream(
						{ upload_preset: "kandidat_evote" },
						(error, uploadResult) => {
							if (error) reject(error);
							return resolve(uploadResult);
						}
					)
					//@ts-expect-error hehe
					.end(buffer?.data ? buffer.data : buffer);
			}
		);

		if (!upload) return { success: false, message: "Terjadi kesalahan" };

		const data = {
			format: upload.format,
			url: upload.secure_url,
		};

		return { success: true, message: "Upload sukses", data };
	} catch (e) {
		console.error(e);
		const error = e as Error;
		return {
			success: false,
			message: error.message.includes("not allowed")
				? error.message
				: "Terjadi kesalahan",
		};
	}
}

export async function handleImageDelete(filename: string) {
	try {
		//@ts-expect-error hehe
		const publicId = filename.split("/").pop().split(".")[0];
		const deleteResult = await cloudinary.uploader.destroy(publicId);

		if (deleteResult.result === "ok") {
			return { success: true, message: "Image deleted successfully." };
		} else {
			throw new Error("Failed to delete image.");
		}
	} catch (error) {
		return {
			success: false,
			message: "Terjadi kesalahan saat menghapus gambar",
		};
	}
}
