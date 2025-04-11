export default async function fetchImgbb(img: Blob, name: string) {
  const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY!;

  const formData = new FormData();
  formData.set("key", IMGBB_KEY);
  formData.append("image", img);
  formData.append("name", name);
  const response = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  });

  const resJson = await response.json();
  if (resJson.status !== 200) {
    console.error(Error);
  }

  return resJson;
}
