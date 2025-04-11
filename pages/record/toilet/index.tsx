"use client";

import { FormEvent, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "pages/_app";
import { useCurrentTime } from "util/hooks/useCurrentTime";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import QuantityInput from "@/components/QuantityInput";
import PageTitle from "@/components/PageTitle";
import TitleLayout from "@/components/TitleLayout";
import { uploadData } from "util/firebaseFunc";
import { ToiletData } from "@/util/types";

const ToiletIndex: NextPageWithLayout = () => {
  const { time, handleTime, updateCurrentTime } = useCurrentTime();
  const [pees, setPees] = useState(0);
  const [poops, setPoops] = useState(0);
  const [etcMemo, setEtcMemo] = useState("");
  const [petId, setPetId] = useState("");

  const handlePees = (num: number) => {
    setPees(pees + num);
  };

  const handlePoops = (num: number) => {
    setPoops(poops + num);
  };

  const uploadToilet = (e: FormEvent) => {
    e.preventDefault();

    const data: ToiletData = {
      date: time,
      pees: pees,
      poops: poops,
      memo: etcMemo,
    };

    uploadData(petId + "_" + time, data, "toilet");
  };

  useEffect(() => {
    setPetId(localStorage.getItem("pet")!);
  }, []);

  return (
    <MainWrapper>
      <form onSubmit={uploadToilet}>
        <InputWrapper>
          <label htmlFor="date">시간</label>
          <DateInput
            value={time}
            onChange={handleTime}
            onClick={updateCurrentTime}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="pees">감자</label>
          <QuantityInput quantity={pees} handleQuantity={handlePees} />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="poops">맛동산</label>
          <QuantityInput quantity={poops} handleQuantity={handlePoops} />
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
          disabled={!time || (!pees && !poops)}
          filled={!!time && (!!pees || !!poops)}
        >
          등록하기
        </Button>
      </form>
    </MainWrapper>
  );
};

export default ToiletIndex;

ToiletIndex.getLayout = function getLayout(page: ReactElement) {
  return <TitleLayout>{page}</TitleLayout>;
};

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
