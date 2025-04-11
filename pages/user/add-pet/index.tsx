import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "firebaseInit";
import { updateProfile } from "firebase/auth";
import styled from "styled-components";
import resizingImage from "@/util/resizingImage";
import fetchImgbb from "@/util/fetchImgbb";
import {
  updateCatsCollection,
  updateUsersCollection,
} from "@/util/firebaseFunc";

import Button from "@/components/Button";
import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";

function AddPetIndex() {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [picFile, setPicFile] = useState<File | null>();
  const [resizingPicBlob, setResizingPicBlob] = useState<Blob | null>(null);
  const [resizingPicURL, setResizingPicURL] = useState("");
  const pictureRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // 버튼과 input type="file" 연동
  // 버튼 클릭 이벤트
  const handleFileInput = () => {
    if (!picFile) {
      pictureRef.current?.click();
    } else {
      resetPicture();
    }
  };

  // input onChange 이벤트
  const selectPicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // 파일이 없거나 이전 파일과 같으면 리턴처리
    if (!file) return;

    setPicFile(file);

    const resizingBlob = await resizingImage(file);
    setResizingPicBlob(resizingBlob);

    const resizingURL = URL.createObjectURL(resizingBlob);
    setResizingPicURL(resizingURL);
  };

  const resetPicture = () => {
    if (!picFile) return;
    setPicFile(null);
    setResizingPicBlob(null);
    setResizingPicURL("");
  };

  const uploadPet = async (e: FormEvent) => {
    e.preventDefault();
    let imgbbThumbUrl = "";

    // imgbb 이미지 업로드
    if (resizingPicBlob) {
      await fetchImgbb(resizingPicBlob, picFile!.name).then((res) => {
        imgbbThumbUrl = res.data.image.url;
      });
    }

    // firebase 업로드
    const user = auth.currentUser;
    updateProfile(user!, { photoURL: imgbbThumbUrl });
    localStorage.setItem("photoURL", imgbbThumbUrl);
    await updateCatsCollection({
      name,
      birth,
      thumb: imgbbThumbUrl || "https://i.ibb.co/Kc6tjcX5/default-profile.png",
      user: [user!.uid],
    }).then(async (catId) => {
      await updateUsersCollection(catId!);
      // setUserInfo((prev) => ({
      //   ...prev,
      //   pet: catId!,
      // }));
      localStorage.setItem("pet", `[${catId}]`);
    });

    alert("내새꾸 등록이 완료됐습니다!");
    router.push("/");
  };

  useEffect(() => {
    return () => {
      if (resizingPicURL) {
        URL.revokeObjectURL(resizingPicURL);
      }
    };
  }, [resizingPicURL]);

  return (
    <>
      <PageTitle />
      <MainWrapper>
        <form onSubmit={uploadPet}>
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
            <Button
              className="input-picture-button"
              filled
              onClick={handleFileInput}
            >
              {resizingPicURL ? "삭제하기" : "사진 업로드"}
            </Button>
            <Input
              type="file"
              name="pet-profile"
              onChange={selectPicture}
              accept="image/*"
              capture="environment"
              ref={pictureRef}
              style={{ display: "none" }}
            />
          </InputWrapper>
          {resizingPicURL && (
            <>
              <PreviewBlock>
                <img src={resizingPicURL} alt="프로필 사진 프리뷰" />
              </PreviewBlock>
            </>
          )}
          <Button type="submit" filled disabled={!name || !birth}>
            등록
          </Button>
        </form>
      </MainWrapper>
    </>
  );
}

export default AddPetIndex;

const MainWrapper = styled.main`
  max-width: 430px;
  min-height: 100vh;
  padding: 80px 30px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

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

  & .input-picture-button {
    width: inherit;
  }

  label {
    width: 80px;
    margin-top: 12px;
  }
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
