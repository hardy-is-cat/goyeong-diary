import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "firebaseInit";
import fetchImgbb from "util/fetchImgbb";
import styled from "styled-components";

import Button from "@/components/Button";
import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";

function AddPetIndex() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [picFile, setPicFile] = useState<File | null>();
  const [picURL, setPicURL] = useState("");
  const router = useRouter();

  const pictureRef = useRef<HTMLInputElement>(null);

  const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setPicFile(file);
      setPicURL(URL.createObjectURL(file));
    }
  };

  const resetPicture = () => {
    if (!pictureRef.current) return;
    pictureRef.current.value = "";
    setPicFile(null);
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
