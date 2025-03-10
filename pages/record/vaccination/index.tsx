"use client";

import { ReactElement, useState } from "react";
import styled from "styled-components";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import Input from "@/components/Input";
import TitleLayout from "@/components/TitleLayout";
import { NextPageWithLayout } from "pages/_app";

const VaccinationIndex: NextPageWithLayout = () => {
  const [date, setDate] = useState("");
  const [valueOfVaccine, setValueOfVaccine] = useState("");
  const [etcVaccine, setEtcVaccine] = useState("");

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
        <Button disabled={!date} filled={!!date}>
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
