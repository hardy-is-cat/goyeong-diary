async function resizingImage(image: File) {
  const { originWidth, originHeight } = await readImageFile(image);
  let resizeWidth = 0;
  let resizeHeight = 0;
  const IMAGE_MAX_SIZE = 180;

  // 리사이징 할 이미지 크기 계산
  if (originWidth >= originHeight) {
    const ratio = IMAGE_MAX_SIZE / originHeight;
    resizeWidth = originWidth * ratio;
    resizeHeight = originHeight * ratio;
  } else if (originWidth < originHeight) {
    const ratio = IMAGE_MAX_SIZE / originWidth;
    resizeWidth = originWidth * ratio;
    resizeHeight = originHeight * ratio;
  }

  const imgUrl = URL.createObjectURL(image);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = IMAGE_MAX_SIZE;
  canvas.height = IMAGE_MAX_SIZE;

  const img = new Image();

  const blob = await new Promise<Blob>((resolve, reject) => {
    img.onload = async () => {
      ctx?.drawImage(
        img,
        -((resizeWidth - IMAGE_MAX_SIZE) / 2),
        -((resizeHeight - IMAGE_MAX_SIZE) / 2),
        resizeWidth,
        resizeHeight
      );

      try {
        const blob = await canvasToBlob(canvas);
        resolve(blob);
      } catch (error) {
        reject(error);
      } finally {
        URL.revokeObjectURL(imgUrl);
      }
    };

    img.onerror = (error) => reject(error);

    img.src = imgUrl;
  });

  return blob;
}

// 이미지 가로세로 크기 불러오기
async function readImageFile(
  image: File
): Promise<{ originWidth: number; originHeight: number }> {
  return new Promise((resolve, reject) => {
    const imgUrl = URL.createObjectURL(image);
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = function () {
      const img = new Image();
      img.src = imgUrl;

      img.onload = function () {
        const originWidth = img.width;
        const originHeight = img.height;
        URL.revokeObjectURL(imgUrl);
        resolve({ originWidth, originHeight });
      };

      img.onerror = (error) => {
        URL.revokeObjectURL(imgUrl);
        reject(new Error(`이미지 로드 실패: ${error}`));
      };

      reader.onerror = (error) => {
        URL.revokeObjectURL(imgUrl);
        reject(new Error(`파일 읽기 실패: ${error}`));
      };
    };
  });
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Blob 생성 실패"));
        }
      },
      "image/jpeg",
      0.7
    );
  });
}

export default resizingImage;
