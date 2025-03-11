async function resizingImage(image: File) {
  const { originWidth, originHeight } = await readImageFile(image);
  console.log(originWidth, originHeight);
  let resizeWidth = 0;
  let resizeHeight = 0;

  const MAX_SIZE = 180;
  if (originWidth >= originHeight) {
    const ratio = MAX_SIZE / originHeight;
    resizeWidth = originWidth * ratio;
    resizeHeight = originHeight * ratio;
  } else if (originWidth < originHeight) {
    const ratio = MAX_SIZE / originWidth;
    resizeWidth = originWidth * ratio;
    resizeHeight = originHeight * ratio;
  }

  console.log("리사이징!", resizeWidth, resizeHeight);

  const imgUrl = URL.createObjectURL(image);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const CANVAS_WIDTH = 180;
  const CANVAS_HEIGHT = 180;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const img = new Image();

  const blob = await new Promise<Blob>((resolve, reject) => {
    img.onload = async () => {
      ctx?.drawImage(
        img,
        -((resizeWidth - CANVAS_WIDTH) / 2),
        -((resizeHeight - CANVAS_HEIGHT) / 2),
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
    let originWidth = 0;
    let originHeight = 0;

    const imgUrl = URL.createObjectURL(image);
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = function () {
      const img = new Image();
      img.src = imgUrl;

      img.onload = function () {
        originWidth = img.width;
        originHeight = img.height;
        console.log(
          "이미지 크기",
          "가로: ",
          originWidth,
          "세로: ",
          originHeight
        );
        URL.revokeObjectURL(imgUrl);
        resolve({ originWidth, originHeight });
      };

      img.onerror = (error) => {
        URL.revokeObjectURL(imgUrl);
        reject(new Error(`이미지 로드 실패: ${error}`));
      };

      reader.onerror = (error) => {
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
