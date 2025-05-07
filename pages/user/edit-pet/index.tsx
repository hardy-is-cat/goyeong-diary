import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { auth, storage } from "firebaseInit";
import { updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import styled from "styled-components";
import resizingImage from "@/util/resizingImage";
import fetchImgbb from "@/util/fetchImgbb";
import { updateCatsDoc } from "@/util/firebaseFunc";

import Button from "@/components/Button";
import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";

function AddPetIndex() {
  const [userName, setUserName] = useState("");
  const [petName, setPetName] = useState("");
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

  const updatePetData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imgbbThumbUrl = "";

    // 새 프로필 사진 있으면 imgbb 이미지 업로드. 아니면 기존 이미지 url
    if (resizingPicBlob) {
      await fetchImgbb(resizingPicBlob, picFile!.name).then((res) => {
        imgbbThumbUrl = res.data.image.url;
      });
    } else {
      imgbbThumbUrl = localStorage.getItem("photoURL")!;
    }

    // firebase 회원정보 변경, cats 컬렉션 해당 문서 업데이트
    const user = auth.currentUser;
    const petId = localStorage.getItem("pet")!;

    updateProfile(user!, { displayName: userName, photoURL: imgbbThumbUrl });
    localStorage.setItem("displayName", userName);
    localStorage.setItem("photoURL", imgbbThumbUrl);

    updateCatsDoc(
      {
        name: petName,
        birth,
        thumb: imgbbThumbUrl,
      },
      petId
    )
      .then(() => {
        alert("프로필이 수정되었습니다!");
        router.push("/");
      })
      .catch((error) => console.error("수정 중 오류 발생: ", error));
  };

  const getCatInfo = async (petId: string | null) => {
    if (petId) {
      const catsDocRef = doc(storage, "cats", petId!);
      const catInfoDoc = await getDoc(catsDocRef);
      const catData = catInfoDoc.data();
      if (catData) {
        setBirth(catData.birth);
        setPetName(catData.name);
      }
    }
  };

  useEffect(() => {
    const displayName = localStorage.getItem("displayName");
    const petId = localStorage.getItem("pet");

    if (displayName) {
      setUserName(displayName);
    }

    getCatInfo(petId);

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
        <form onSubmit={updatePetData}>
          <InputWrapper>
            <label htmlFor="userName">닉네임</label>
            <Input
              id="userName"
              name="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="petName">이름</label>
            <Input
              id="petName"
              name="petName"
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
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
          <Button
            type="submit"
            filled
            disabled={!userName || !petName || !birth}
          >
            수정
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
