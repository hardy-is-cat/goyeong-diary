"use client";

import { ReactElement, useState } from "react";
import styled from "styled-components";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import QuantityInput from "@/components/QuantityInput";
import TitleLayout from "@/components/TitleLayout";
import { NextPageWithLayout } from "pages/_app";

const ToiletIndex: NextPageWithLayout = () => {
  const [date, setDate] = useState("");
  const [pees, setPees] = useState(0);
  const [poops, setPoops] = useState(0);
  const [etcMemo, setEtcMemo] = useState("");

  const handlePees = (num: number) => {
    setPees(pees + num);
  };

  const handlePoops = (num: number) => {
    setPoops(poops + num);
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
            <Button>사진등록</Button>
          </div>
        </InputWrapper>
        <Button
          disabled={!date || (!pees && !poops)}
          filled={!!date && (!!pees || !!poops)}
        >
          등록하기
        </Button>
      </form>
    </main>
  );
};

export default ToiletIndex;

ToiletIndex.getLayout = function getLayout(page: ReactElement) {
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
