import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "firebaseInit";
import fetchImgbb from "util/fetchImgbb";
import styled from "styled-components";

import Button from "@/components/Button";
import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";
import resizingImage from "util/resizingImage";

function AddPetIndex() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [picFile, setPicFile] = useState<File | null>();
  const [picURL, setPicURL] = useState("");
  const [compressPicBlob, setCompressPicBlob] = useState<Blob | null>(null);
  const [compressPicURL, setCompressPicURL] = useState("");
  const router = useRouter();

  const pictureRef = useRef<HTMLInputElement>(null);

  const handlePicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // 파일이 없거나 이전 파일과 같으면 리턴처리
    if (!file) {
      alert("파일선택 취소");
      if (pictureRef.current) {
        pictureRef.current.value = "";
      }
      return;
    }
    if (file === picFile) {
      alert("이전 파일과 같음");
      return;
    }

    setPicFile(file);
    setPicURL(URL.createObjectURL(file));
    console.log("압축 전 파일 사이즈", file.size);
  };

  const resetPicture = () => {
    if (!pictureRef.current) return;
    pictureRef.current.value = "";
    setPicFile(null);
    setCompressPicURL("");
  };

  const uploadPet = async (e: FormEvent) => {
    e.preventDefault();
    let imgbbThumbUrl: undefined | string;

    // imgbb 이미지 업로드
    if (!!picFile) {
      await fetchImgbb(picFile).then((res) => {
        imgbbThumbUrl = res.data.thumb.url;
      });
    }

    // firebase 업로드
    const catsCollectionRef = collection(storage, "cats");
    await addDoc(catsCollectionRef, {
      name,
      birth,
      thumb: imgbbThumbUrl || "https://i.ibb.co/Kc6tjcX5/default-profile.png",
      // user: []
    })
      .then((docRef) => {
        console.log(docRef.id, "에 저장됐습니다!");
        setPicURL("");
        URL.revokeObjectURL(picURL);
      })
      .catch((error) => {
        console.error("저장 중 오류 발생!", error);
      });

    alert("내새꾸 등록이 완료됐습니다!");
    router.push("/");
  };

  useEffect(() => {
    if (!picFile) return;

    const compressedImg = async () => {
      const blob = await resizingImage(picFile);
      const url = URL.createObjectURL(blob);
      setCompressPicBlob(blob);
      setCompressPicURL(url);
      return () => URL.revokeObjectURL(url);
    };

    compressedImg();
  }, [picFile]);

  return (
    <>
      <PageTitle />
      <FormWrapper onSubmit={uploadPet}>
        <InputWrapper>
          <label htmlFor="name">이름</label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="date">생일</label>
          <input
            type="date"
            name="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="pet-profile">사진</label>
          <Input
            type="file"
            name="pet-profile"
            onChange={handlePicture}
            accept="image/*"
            capture="environment"
            ref={pictureRef}
          />
        </InputWrapper>
        {picFile && (
          <>
            <p>압축 전</p>
            <PreviewBlock>
              <img src={picURL} alt="프로필 사진 프리뷰" />
            </PreviewBlock>
            <Button
              filled
              onClick={resetPicture}
              style={{ marginBottom: "10px" }}
            >
              이미지삭제
            </Button>
          </>
        )}
        {compressPicURL && (
          <>
            <p>압축 후</p>
            <img src={compressPicURL} alt="프로필 사진 프리뷰" />
          </>
        )}
        <Button type="submit" filled disabled={!name || !birth}>
          등록
        </Button>
      </FormWrapper>
    </>
  );
}

export default AddPetIndex;

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  & > *:nth-child(2) {
    flex-grow: 1;
  }

  label {
    width: 80px;
    margin-top: 12px;
  }

  [type="file"] {
    font-size: 14px;
  }
`;

const FormWrapper = styled.form`
  margin: 20px 30px;
`;

const PreviewBlock = styled.div`
  position: relative;
  width: 180px;
  padding-bottom: 180px;
  margin: 0 auto 10px;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-position: center center;
    object-fit: none;
  }
`;
// import { FormEvent, useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
// import { addDoc, collection } from "firebase/firestore";
// import { storage } from "firebaseInit";
// import fetchImgbb from "util/fetchImgbb";
// import styled from "styled-components";

// import Button from "@/components/Button";
// import Input from "@/components/Input";
// import PageTitle from "@/components/PageTitle";
// import resizingImage from "util/resizingImage";

// function AddPetIndex() {
//   const [name, setName] = useState("");
//   const [birth, setBirth] = useState("");
//   // const [picFile, setPicFile] = useState<File | null>();
//   const [picURL, setPicURL] = useState("");
//   const [compressPicBlob, setCompressPicBlob] = useState<Blob | null>(null);
//   const [compressPicURL, setCompressPicURL] = useState("");
//   const router = useRouter();

//   const pictureRef = useRef<HTMLInputElement>(null);

//   const handlePicture = async () => {
//     const file = pictureRef.current?.files?.[0];

//     // 파일이 없거나 이전 파일과 같으면 리턴처리
//     if (!file) {
//       alert("파일선택 취소");
//       return;
//     }

//     // setPicURL(URL.createObjectURL(file));
//     console.log("압축 전 파일 사이즈", file.size);

//     const blob = await resizingImage(file);
//     const url = URL.createObjectURL(blob);
//     setCompressPicBlob(blob);
//     setCompressPicURL(url);
//   };

//   const resetPicture = () => {
//     if (!pictureRef.current) return;
//     pictureRef.current.value = "";
//   };

//   // const uploadPet = async (e: FormEvent) => {
//   //   e.preventDefault();
//   //   let imgbbThumbUrl: undefined | string;

//   //   // imgbb 이미지 업로드
//   //   if (!!picFile) {
//   //     await fetchImgbb(picFile).then((res) => {
//   //       imgbbThumbUrl = res.data.thumb.url;
//   //     });
//   //   }

//   //   // firebase 업로드
//   //   const catsCollectionRef = collection(storage, "cats");
//   //   await addDoc(catsCollectionRef, {
//   //     name,
//   //     birth,
//   //     thumb: imgbbThumbUrl || "https://i.ibb.co/Kc6tjcX5/default-profile.png",
//   //     // user: []
//   //   })
//   //     .then((docRef) => {
//   //       console.log(docRef.id, "에 저장됐습니다!");
//   //       setPicURL("");
//   //       URL.revokeObjectURL(picURL);
//   //     })
//   //     .catch((error) => {
//   //       console.error("저장 중 오류 발생!", error);
//   //     });

//   //   alert("내새꾸 등록이 완료됐습니다!");
//   //   router.push("/");
//   // };

//   // useEffect(() => {
//   //   const file = pictureRef.current?.files?.[0]
//   //   if (!file) return;

//   //   const compressedImg = async () => {
//   //     const blob = await resizingImage(file);
//   //     const url = URL.createObjectURL(blob);
//   //     setCompressPicBlob(blob);
//   //     setCompressPicURL(url);
//   //     return () => URL.revokeObjectURL(url);
//   //   };

//   //   compressedImg();
//   // }, [pictureRef]);

//   return (
//     <>
//       <PageTitle />
//       {/* <FormWrapper onSubmit={uploadPet}> */}
//       <FormWrapper>
//         <InputWrapper>
//           <label htmlFor="name">이름</label>
//           <Input
//             id="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </InputWrapper>
//         <InputWrapper>
//           <label htmlFor="date">생일</label>
//           <input
//             type="date"
//             name="date"
//             value={birth}
//             onChange={(e) => setBirth(e.target.value)}
//           />
//         </InputWrapper>
//         <InputWrapper>
//           <label htmlFor="pet-profile">사진</label>
//           <Input
//             type="file"
//             name="pet-profile"
//             onChange={handlePicture}
//             accept="image/*"
//             capture="environment"
//             ref={pictureRef}
//           />
//           {compressPicURL && (
//             <>
//               <p>압축 후</p>
//               <img src={compressPicURL} alt="프로필 사진 프리뷰" />
//               <Button
//                 filled
//                 onClick={resetPicture}
//                 style={{ marginBottom: "10px" }}
//               >
//                 이미지삭제
//               </Button>
//             </>
//           )}
//         </InputWrapper>
//         <Button type="submit" filled disabled={!name || !birth}>
//           등록
//         </Button>
//       </FormWrapper>
//     </>
//   );
// }

// export default AddPetIndex;

// const InputWrapper = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: flex-start;
//   margin-bottom: 10px;

//   &:last-child {
//     margin-bottom: 0;
//   }

//   & > *:nth-child(2) {
//     flex-grow: 1;
//   }

//   label {
//     width: 80px;
//     margin-top: 12px;
//   }

//   [type="file"] {
//     font-size: 14px;
//   }
// `;

// const FormWrapper = styled.form`
//   margin: 20px 30px;
// `;

// const PreviewBlock = styled.div`
//   position: relative;
//   width: 180px;
//   padding-bottom: 180px;
//   margin: 0 auto 10px;

//   img {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     border-radius: 50%;
//     object-position: center center;
//     object-fit: none;
//   }
// `;
