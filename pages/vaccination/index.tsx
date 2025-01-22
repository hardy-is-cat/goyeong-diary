"use client";

import Button from "@/components/Button";
import DateInput from "@/components/DateInput";
import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import styled from "styled-components";

function VaccinationIndex() {
  const [dateValue, setDateValue] = useState("");
  const [valueOfVaccine, setValueOfVaccine] = useState("");
  const [etcVaccine, setEtcVaccine] = useState("");

  const handleDate = (date: string) => {
    setDateValue(date);
  };

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
      <PageTitle />
      <form action="#" style={{ padding: "20px 30px" }}>
        <InputWrapper>
          <label htmlFor="date">현재 시간</label>
          <DateInput name="date" handleDate={handleDate} />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="value-of-vaccine">접종 종류</label>
          <div>
            <select
              name="value-of-vaccine"
              required
              onChange={handleValueOfVaccine}
            >
              <option value="" disabled selected>
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
        <Button disabled={!dateValue} filled={!!dateValue}>
          등록하기
        </Button>
      </form>
    </main>
  );
}

export default VaccinationIndex;

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
