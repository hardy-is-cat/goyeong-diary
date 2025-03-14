"use client";

import { ReactElement, useRef, useState } from "react";
import styled from "styled-components";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import TitleLayout from "@/components/TitleLayout";
import { NextPageWithLayout } from "pages/_app";

const PlayingIndex: NextPageWithLayout = () => {
  const [date, setDate] = useState("");
  const [stopWatchState, setStopWatchState] = useState(false);
  const [playTime, setPlayTime] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleStopWatch = () => {
    if (!stopWatchState) {
      setStopWatchState(true);
      intervalRef.current = setInterval(() => {
        setPlayTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setStopWatchState(false);
      clearInterval(intervalRef.current);
    }
  };

  // 시작버튼 -> 스탑워치 상태 false면 스탑워치 상태 true
  // 정지버튼 -> 우선 stopwatch false -> confirm -> 확인(스탑워치상태 false, 스탑워치 초기화), 취소(스탑워치 상태 재시작)
  const resetStopWatch = () => {
    setStopWatchState(false);
    clearInterval(intervalRef.current);
    const isResetStopWatch = confirm("확인을 누르면 타이머가 정지됩니다.");
    if (isResetStopWatch) {
      setStopWatchState(false);
      setPlayTime(0);
    } else {
      setStopWatchState(true);
      intervalRef.current = setInterval(() => {
        setPlayTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  return (
    <main>
      <form action="#">
        <InputWrapper>
          <label htmlFor="date">현재 시간</label>
          <DateInput
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="time">스톱워치</label>
          <StopWatchButtonWrapper>
            <Button onClick={handleStopWatch}>
              {stopWatchState ? "일시정지" : "시작"}
            </Button>
            <Button onClick={resetStopWatch}>초기화</Button>
          </StopWatchButtonWrapper>
        </InputWrapper>
        <ResultBlock>
          총 {playTime >= 60 ? Math.floor(playTime / 60) : 0}분{" "}
          {playTime >= 60 ? playTime % 60 : playTime}초 동안 놀아줬어요!
        </ResultBlock>
        <Button disabled={!date} filled={!!date}>
          등록하기
        </Button>
      </form>
    </main>
  );
};

export default PlayingIndex;

PlayingIndex.getLayout = function getLayout(page: ReactElement) {
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
`;

const StopWatchButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ResultBlock = styled.div`
  padding: 20px 0;
  font-size: 24px;
  text-align: center;
`;
