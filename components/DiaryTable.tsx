import { convertDate } from "@/util/convertDate";
import { getCurrentTime } from "@/util/hooks/useCurrentTime";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { deleteDiaryData } from "@/util/firebaseFunc";

type DiaryDataType = {
  selectedMenu: string;
  data: DocumentData[];
};

function DiaryTable({ selectedMenu, data }: DiaryDataType) {
  const [currentMonth, setCurrentMonth] = useState(
    getCurrentTime().slice(0, 7)
  );
  const [filteredData, setFilteredData] = useState<
    DocumentData[] | undefined
  >();
  const [onEdit, setOnEdit] = useState(false);

  const convertPlayingTime = (time: string) => {
    const minutes = Math.floor(+time / 60);
    const seconds = minutes > 0 ? +time - minutes * 60 : +time;
    return minutes > 0 ? `${minutes}분 ${seconds}초` : `${seconds}초`;
  };

  const calcMinMaxMonth = (data: DocumentData[]) => {
    if (data.length === 0) {
      // 저장된 데이터가 하나도 없을 경우
      return {
        minMonth: getCurrentTime().slice(0, 7),
        maxMonth: getCurrentTime().slice(0, 7),
      };
    } else {
      const dates = data.map((doc) => doc.date);
      const sortedDates: string[] = dates.sort((prev, curr) => {
        return new Date(prev).getTime() - new Date(curr).getTime();
      });
      const minMonth = sortedDates[0].slice(0, 7);
      // const maxMonth = sortedDates[sortedDates.length - 1].slice(0, 7);
      const maxMonth = getCurrentTime().slice(0, 7);
      return { minMonth, maxMonth };
    }
  };

  const tableData = () => {
    switch (selectedMenu) {
      case "toilet":
        return (
          <>
            <thead>
              <tr>
                <th>날짜</th>
                <th>감자</th>
                <th>맛동산</th>
                <th>메모</th>
                {onEdit && <th>삭제</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData?.length === 0 ? (
                <tr>
                  <td colSpan={5}>데이터가 없습니다.</td>
                </tr>
              ) : (
                filteredData?.map((doc) => {
                  return (
                    <tr key={doc.uid}>
                      <td>{convertDate(doc.date)}</td>
                      <td>{doc.pees}</td>
                      <td>{doc.poops}</td>
                      <td>{doc.memo || "-"}</td>
                      {onEdit && (
                        <td>
                          <DeleteButton
                            onClick={() => deleteDiaryData("toilet", doc.uid)}
                          >
                            삭제
                          </DeleteButton>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </>
        );
      case "feeding":
        const listOfFeeding: Record<string, string> = {
          "wet-food": "습식",
          "dry-food": "건사료",
          "boiled-food": "화식",
          etc: "기타",
        };
        return (
          <>
            <thead>
              <tr>
                <th>날짜</th>
                <th>종류</th>
                <th>양</th>
                <th>메모</th>
                {onEdit && <th>삭제</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData?.length === 0 ? (
                <tr>
                  <td colSpan={5}>데이터가 없습니다.</td>
                </tr>
              ) : (
                filteredData?.map((doc) => {
                  return (
                    <tr key={doc.uid}>
                      <td>{convertDate(doc.date)}</td>
                      <td>{listOfFeeding[doc.valueOfFeed]}</td>
                      <td>{doc.volumeOfFeed}g</td>
                      <td>{doc.memo || "-"}</td>
                      {onEdit && (
                        <td>
                          <DeleteButton
                            onClick={() => deleteDiaryData("feeding", doc.uid)}
                          >
                            삭제
                          </DeleteButton>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </>
        );
      case "playing":
        return (
          <>
            <thead>
              <tr>
                <th>날짜</th>
                <th>놀이시간</th>
                {onEdit && <th>삭제</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData?.length === 0 ? (
                <tr>
                  <td colSpan={5}>데이터가 없습니다.</td>
                </tr>
              ) : (
                filteredData?.map((doc) => {
                  return (
                    <tr key={doc.uid}>
                      <td>{convertDate(doc.date)}</td>
                      <td>{convertPlayingTime(doc.playTime)}</td>
                      {onEdit && (
                        <td>
                          <DeleteButton
                            onClick={() => deleteDiaryData("playing", doc.uid)}
                          >
                            삭제
                          </DeleteButton>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </>
        );
      case "vaccination":
        const listOfVaccine: Record<string, string> = {
          "di-vac": "심장사상충",
          "total-vac": "종합백신",
          "fpv-vac": "범백",
          etc: "기타",
        };
        return (
          <>
            <thead>
              <tr>
                <th>날짜</th>
                <th>종류</th>
                <th>메모</th>
                {onEdit && <th>삭제</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData?.length === 0 ? (
                <tr>
                  <td colSpan={5}>데이터가 없습니다.</td>
                </tr>
              ) : (
                filteredData?.map((doc) => {
                  return (
                    <tr key={doc.uid}>
                      <td>{convertDate(doc.date)}</td>
                      <td>{listOfVaccine[doc.valueOfVaccine]}</td>
                      <td>{doc.etcVaccine || "-"}</td>
                      {onEdit && (
                        <td>
                          <DeleteButton
                            onClick={() =>
                              deleteDiaryData("vaccination", doc.uid)
                            }
                          >
                            삭제
                          </DeleteButton>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </>
        );

      default:
        return (
          <thead>
            <tr>
              <th>데이터가 없습니다</th>
            </tr>
          </thead>
        );
    }
  };

  useEffect(() => {
    const filteredByMonth = data.filter((doc) =>
      doc.date.startsWith(currentMonth)
    );
    setFilteredData(filteredByMonth);
  }, [currentMonth, data]);

  return (
    <>
      <MonthPicker
        type="month"
        id="select-month"
        name="select-month"
        min={calcMinMaxMonth(data).minMonth}
        max={getCurrentTime().slice(0, 7)}
        value={currentMonth}
        onChange={(e) => setCurrentMonth(e.target.value)}
      />
      <TableBlock $onEdit={onEdit}>{tableData()}</TableBlock>
      <EditButton onClick={() => setOnEdit(!onEdit)}>
        {onEdit ? "편집 종료" : "기록 편집"}
      </EditButton>
    </>
  );
}

export default DiaryTable;

const MonthPicker = styled.input`
  width: 100%;
`;

const TableBlock = styled.table<{ $onEdit: boolean }>`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.black};
  margin-bottom: 10px;

  thead {
    font-weight: 700;
    background-color: ${({ theme }) => theme.colors.lightGray};

    th {
      padding: 8px 0;
      border: 1px solid ${({ theme }) => theme.colors.black};
    }

    th:nth-of-type(1) {
      width: 40%;
    }
    th:nth-of-type(2) {
      width: 15%;
    }
    th:nth-of-type(3) {
      width: 15%;
    }
    th:nth-of-type(4) {
      width: ${({ $onEdit }) => ($onEdit ? "15%" : "30%")};
    }
  }

  tbody {
    text-align: center;

    td {
      padding: 8px 4px;
      border: 1px solid ${({ theme }) => theme.colors.black};
      vertical-align: middle;
    }
  }
`;

const DeleteButton = styled(Button)`
  width: fit-content;
  padding: 6px 8px;
  margin-left: auto;
  margin-right: auto;
  font-size: 14px;
`;

const EditButton = styled(Button)`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
`;
