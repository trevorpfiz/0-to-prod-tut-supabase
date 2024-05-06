"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { env } from "~/env";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await fetch(
      `${env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (uploadResponse.ok) {
      const { url, filename } = await uploadResponse.json();
      console.log("Upload successful:", url, filename);
      router.refresh();
    } else {
      console.error("Upload Error:", await uploadResponse.text());
      alert("Upload failed.");
    }

    setUploading(false);

    // Reset the file state and clear the input
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        ref={fileInputRef}
        id="file"
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            setFile(files[0] as File);
          }
        }}
        accept="image/png, image/jpeg"
      />
      <button type="submit" disabled={uploading || !file}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export { FileUpload };
