"use client";

import { FormEvent, ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { NextPageWithLayout } from "pages/_app";
import { useCurrentTime } from "@/util/hooks/useCurrentTime";
import { VaccinationData } from "@/util/types";
import { uploadData } from "@/util/firebaseFunc";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import Input from "@/components/Input";
import TitleLayout from "@/components/TitleLayout";

const VaccinationIndex: NextPageWithLayout = () => {
  const { time, handleTime, updateCurrentTime } = useCurrentTime();
  const [valueOfVaccine, setValueOfVaccine] = useState("");
  const [etcVaccine, setEtcVaccine] = useState("");
  const [petId, setPetId] = useState("");

  const handleValueOfVaccine = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (valueOfVaccine !== "etc") {
      setEtcVaccine("");
      setValueOfVaccine(e.target.value);
    } else {
      setValueOfVaccine(e.target.value);
    }
  };

  const handleEtcVaccine = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEtcVaccine(e.target.value);
  };

  const uploadVaccination = (e: FormEvent) => {
    e.preventDefault();

    const data: VaccinationData = {
      date: time,
      valueOfVaccine,
      etcVaccine,
    };

    uploadData(petId + "_" + time, data, "vaccination");
  };

  useEffect(() => {
    setPetId(localStorage.getItem("pet")!);
  }, []);

  return (
    <main>
      <form onSubmit={uploadVaccination}>
        <InputWrapper>
          <label htmlFor="date">현재 시간</label>
          <DateInput
            value={time}
            onChange={handleTime}
            onClick={updateCurrentTime}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="value-of-vaccine">접종 종류</label>
          <div>
            <select
              defaultValue="default"
              name="value-of-vaccine"
              required
              onChange={handleValueOfVaccine}
            >
              <option value="default" disabled>
                백신 종류를 선택해주세요
              </option>
              <option value="di-vac">심장사상충</option>
              <option value="total-vac">종합백신</option>
              <option value="fpv-vac">범백</option>
              <option value="etc">기타</option>
            </select>
            {valueOfVaccine === "etc" && (
              <Input
                type="text"
                placeholder="기타 백신의 이름을 적어주세요."
                style={{ marginTop: "10px" }}
                value={etcVaccine}
                onChange={handleEtcVaccine}
              />
            )}
          </div>
        </InputWrapper>
        <Button type="submit" disabled={!time} filled={!!time}>
          등록하기
        </Button>
      </form>
    </main>
  );
};

export default VaccinationIndex;

VaccinationIndex.getLayout = function getLayout(page: ReactElement) {
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
