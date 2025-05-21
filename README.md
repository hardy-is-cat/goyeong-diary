# 🐱고영일기

> 그 때 뭘 먹였지? 화장실은 잘 갔었나?
> **간단하게 우리 고양이의 하루를 기록하는 서비스**

배포 URL : [https://goyeong-diary.vercel.app/](https://goyeong-diary.vercel.app/)

## 💁🏻‍♀️ 프로젝트 소개

### ℹ️ 프로젝트 정보

우리 고양이에 대한 기록을 도와주는 육묘 다이어리 서비스입니다.<br>
식사, 배변활동, 접종 이력, 놀이 시간을 저장할 수 있으며, 월별로 저장 기록을 확인할 수 있습니다.

### 🛠️ 기술스택

<div>
<img src="https://img.shields.io/badge/TypeScript-%233178C6?logo=typescript&logoColor=white" >
<img src="https://img.shields.io/badge/React-%2361DAFB?logo=react&logoColor=white" >
<img src="https://img.shields.io/badge/Next.js-%23000?logo=Next.js&logoColor=white" >
<img src="https://img.shields.io/badge/Styled--Components-%23DB7093?logo=styledcomponents&logoColor=white" >
<img src="https://img.shields.io/badge/Recoil-%233578E5?logo=recoil&logoColor=white" >
<img src="https://img.shields.io/badge/Firebase-%23DD2C00?logo=firebase&logoColor=white" >
</div>

### 🔍 주요 기능 소개

|                                                                회원가입                                                                |
| :------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/d9ab1ac4-1591-45f5-8621-0b14975dc2c3" alt="회원가입 화면" border="0" width="270"> |
|                                            이메일 주소를 기반으로 한 회원가입이 가능합니다                                             |

|                                                                로그인                                                                |
| :----------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/9c801cd1-f0dc-49fb-af35-f50adc7a6570" alt="로그인 화면" border="0" width="270"> |
|                                                          로그인 화면입니다                                                           |

|                                                                내새꾸 등록                                                                |
| :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/40d9372d-b6e0-4028-93a2-e2c574d4a82f" alt="고양이 등록 화면" border="0" width="270"> |
|                                       로그인 후 나의 고양이의 정보가 없을 경우<br>정보를 등록합니다                                       |

|                                                             각종 기록 등록                                                              |
| :-------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/c038a5d7-ea96-48c9-bc82-279d5d6430b0" alt="기록 등록 화면" border="0" width="270"> |
|                                           화장실, 식사, 놀이, 접종 기록을 등록할 수 있습니다                                            |

|                                                                기록 확인                                                                |
| :-------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/f3304887-a3e2-422f-bd6b-bb86b3b3af61" alt="기록 확인 화면" border="0" width="270"> |
|                                            등록한 기록을 월별로 확인하고 삭제할 수 있습니다                                             |

|                                                                 정보 수정                                                                 |
| :---------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/6605a1b6-707e-48b2-911e-1118095a3afb" alt="프로필 수정 화면" border="0" width="270"> |
|                                                 등록한 고양이의 정보를 수정할 수 있습니다                                                 |

## 💥 기술적 이슈와 해결 과정

### imgbb 무료 이미지 호스팅 서비스를 이용한 이미지 저장 과정

<details>
<summary>문제 상황</summary>

- 파이어베이스 스토리지 서비스를 이용하여 이미지 업로드를 하려 했으나 지불 정보 입력 오류로 인해 [imgBB](https://imgbb.com)라는 무료 이미지 호스팅 서비스를 사용하기로 하였습니다.<br>이때, imgBB에 넘겨주는 파일 타입이 `Blob` 타입이어야 했기 때문에 input태그로 받은 파일의 형식을 `Blob` 타입으로 바꿔주는 과정이 필요했습니다.<br>더불어, 파일의 해상도와 크기가 큰 파일을 그대로 업로드하니 속도가 오래 걸려 크기를 줄인 후 로딩 속도를 개선하고자 하였습니다.

</details>
<details>
<summary>해결방법과 코드</summary>

- input으로 받은 이미지 파일을 브라우저 API인 `fileReader` 이용하여 가로, 세로 크기를 불러온 후, `canvas`를 이용해 이미지의 가운데를 기준으로하여 가로와 세로가 최대 180px인 이미지로 재가공하였습니다.<br>이후, File 타입이었던 이미지를 Blob 타입으로 가공하여 반환 후 imgBB에 등록하였습니다.<br>이 과정에서 **2.3mb**였던 이미지를 **9kb**까지 축소하여 저장할 수 있게됐습니다.

  ```ts
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
  ```

</details>

## 🎯 향후 목표

- Next.js app router로 마이그레이션
- 전체적인 코드 리팩토링(input의 상태관리 등)
- sns 로그인 추가
- 기등록된 고양이 정보 불러오기
