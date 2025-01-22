"use client";

import { useState } from "react";
import styled from "styled-components";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import PageTitle from "@/components/PageTitle";
import Input from "@/components/Input";

function FeedingIndex() {
  const [dateValue, setDateValue] = useState("");
  const [valueOfFood, setValueOfFood] = useState("");
  const [volumeOfFood, setVolumeOfFood] = useState("");
  const [etcMemo, setEtcMemo] = useState("");

  const handleDate = (date: string) => {
    setDateValue(date);
  };

  const handleVolumeOfFood = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeOfFood(e.target.value);
  };

  return (
    <main>
      <PageTitle />
      <form action="#" style={{ padding: "20px 30px" }}>
        <InputWrapper>
          <label htmlFor="date">현재 시간</label>
          <DateInput name="date" handleDate={handleDate} />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="type-of-feed">식사 종류</label>
          <div>
            <select
              name="type-of-feed"
              required
              onChange={(e) => setValueOfFood(e.target.value)}
            >
              <option value="" disabled selected>
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
        <InputWrapper>
          <label htmlFor="memo">특이사항</label>
          <div>
            <textarea
              placeholder="특이사항을 메모해보세요."
              value={etcMemo}
              onChange={(e) => setEtcMemo(e.target.value)}
            />
            <Button>사진등록</Button>
          </div>
        </InputWrapper>
        <Button
          disabled={!dateValue || !valueOfFood || !volumeOfFood}
          filled={!!dateValue && !!valueOfFood && !!volumeOfFood}
        >
          등록하기
        </Button>
      </form>
    </main>
  );
}

export default FeedingIndex;

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
