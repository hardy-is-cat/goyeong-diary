"use client";

import { FormEvent, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "pages/_app";
import { uploadData } from "@/util/firebaseFunc";
import { FeedingData } from "@/util/types";
import { useCurrentTime } from "@/util/hooks/useCurrentTime";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import Input from "@/components/Input";
import TitleLayout from "@/components/TitleLayout";

const FeedingIndex: NextPageWithLayout = () => {
  const { time, handleTime, updateCurrentTime } = useCurrentTime();
  const [valueOfFeed, setValueOfFeed] = useState("");
  const [volumeOfFeed, setVolumeOfFeed] = useState("");
  const [etcMemo, setEtcMemo] = useState("");
  const [petId, setPetId] = useState("");

  const handleVolumeOfFeed = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeOfFeed(e.target.value);
  };

  const uploadFeeding = (e: FormEvent) => {
    e.preventDefault();

    const data: FeedingData = {
      date: time,
      valueOfFeed,
      volumeOfFeed,
      memo: etcMemo,
    };

    uploadData(petId + "_" + time, data, "feeding");
  };

  useEffect(() => {
    setPetId(localStorage.getItem("pet")!);
  }, []);

  return (
    <main>
      <form onSubmit={uploadFeeding}>
        <InputWrapper>
          <label htmlFor="date">현재 시간</label>
          <DateInput
            name="date"
            value={time}
            onChange={handleTime}
            onClick={updateCurrentTime}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="type-of-feed">식사 종류</label>
          <div>
            <select
              name="type-of-feed"
              defaultValue="default"
              required
              onChange={(e) => setValueOfFeed(e.target.value)}
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
            value={volumeOfFeed}
            onChange={handleVolumeOfFeed}
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
          </div>
        </InputWrapper>
        <Button
          type="submit"
          disabled={!time || !valueOfFeed || !volumeOfFeed}
          filled={!!time && !!valueOfFeed && !!volumeOfFeed}
        >
          등록하기
        </Button>
      </form>
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
