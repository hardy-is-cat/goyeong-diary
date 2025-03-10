"use client";

import { ReactElement, useState } from "react";
import styled from "styled-components";

import { doc, updateDoc } from "firebase/firestore";
import { storage } from "firebaseInit";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import Input from "@/components/Input";
import TitleLayout from "@/components/TitleLayout";
import { NextPageWithLayout } from "pages/_app";

const FeedingIndex: NextPageWithLayout = () => {
  const [date, setDate] = useState("");
  const [valueOfFood, setValueOfFood] = useState("");
  const [volumeOfFood, setVolumeOfFood] = useState("");
  const [etcMemo, setEtcMemo] = useState("");

  const handleVolumeOfFood = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeOfFood(e.target.value);
  };

  const uploadData = async () => {
    try {
      const docRef = doc(storage, "cats", "hardy");
      await updateDoc(docRef, {
        name: "hardy",
        age: 6,
      });
      alert("업로드 완료");
    } catch (error) {
      console.error("Error replacing document: ", error);
    }
  };

  return (
    <main>
      <InputWrapper>
        <label htmlFor="date">현재 시간</label>
        <DateInput
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="type-of-feed">식사 종류</label>
        <div>
          <select
            name="type-of-feed"
            defaultValue="default"
            required
            onChange={(e) => setValueOfFood(e.target.value)}
          >
            <option value="default" disabled>
              식사 종류를 선택해주세요
            </option>
            <option value="wet-food">습식</option>
            <option value="dry-food">건식</option>
            <option value="boiled-food">화식</option>
            <option value="etc">기타</option>
          </select>
        </div>
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="volume">양</label>
        <Input
          id="volume"
          type="number"
          placeholder="식사량을 기록하세요."
          value={volumeOfFood}
          onChange={handleVolumeOfFood}
        />
        <span style={{ paddingTop: "10px", paddingLeft: "8px" }}>g</span>
      </InputWrapper>
      {/* <InputWrapper>
          <label htmlFor="memo">특이사항</label>
          <div>
            <textarea
              placeholder="특이사항을 메모해보세요."
              value={etcMemo}
              onChange={(e) => setEtcMemo(e.target.value)}
            />
            <Button>사진등록</Button>
          </div>
        </InputWrapper> */}
      <Button
        disabled={!date || !valueOfFood || !volumeOfFood}
        filled={!!date && !!valueOfFood && !!volumeOfFood}
        onClick={uploadData}
      >
        등록하기
      </Button>
    </main>
  );
};

export default FeedingIndex;

FeedingIndex.getLayout = function getLayout(page: ReactElement) {
  return <TitleLayout>{page}</TitleLayout>;
};

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

  textarea {
    width: 100%;
    height: 60px;
    margin-bottom: 6px;
  }
`;
