"use client";

import { FormEvent, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "pages/_app";
import { useCurrentTime } from "@/util/hooks/useCurrentTime";
import { VaccinationData } from "@/util/types";
import { uploadData } from "@/util/firebaseFunc";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import TitleLayout from "@/components/TitleLayout";

const VaccinationIndex: NextPageWithLayout = () => {
  const { time, handleTime, updateCurrentTime } = useCurrentTime();
  const [valueOfVaccine, setValueOfVaccine] = useState("");
  const [etcMemo, setEtcMemo] = useState("");
  const [petId, setPetId] = useState("");

  const uploadVaccination = (e: FormEvent) => {
    e.preventDefault();

    const data: VaccinationData = {
      date: time,
      valueOfVaccine,
      etcVaccine: etcMemo,
    };

    uploadData(petId + "_" + time, data, "vaccination");
  };

  useEffect(() => {
    setPetId(localStorage.getItem("pet")!);
  }, []);

  return (
    <MainWrapper>
      <form onSubmit={uploadVaccination}>
        <InputWrapper>
          <label htmlFor="date">현재 시간</label>
          <DateInput
            id="date"
            name="date"
            value={time}
            onChange={handleTime}
            onClick={updateCurrentTime}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="value-of-vaccine">접종 종류</label>
          <div>
            <select
              id="value-of-vaccine"
              name="value-of-vaccine"
              defaultValue="default"
              required
              onChange={(e) => setValueOfVaccine(e.target.value)}
            >
              <option value="default" disabled>
                백신 종류를 선택해주세요
              </option>
              <option value="di-vac">심장사상충</option>
              <option value="total-vac">종합백신</option>
              <option value="fpv-vac">범백</option>
              <option value="etc">기타</option>
            </select>
          </div>
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="memo">특이사항</label>
          <textarea
            id="memo"
            name="memo"
            placeholder="특이사항을 메모해보세요."
            value={etcMemo}
            onChange={(e) => setEtcMemo(e.target.value)}
          />
        </InputWrapper>
        <Button type="submit" disabled={!time} filled={!!time}>
          등록하기
        </Button>
      </form>
    </MainWrapper>
  );
};

export default VaccinationIndex;

VaccinationIndex.getLayout = function getLayout(page: ReactElement) {
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
`;
