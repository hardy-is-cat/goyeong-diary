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
                {onEdit && <th style={{ width: "60px" }}>삭제</th>}
                <th style={{ width: "160px" }}>날짜</th>
                <th style={{ width: "60px" }}>감자</th>
                <th style={{ width: "60px" }}>맛동산</th>
                <th style={{ width: "180px" }}>메모</th>
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
                      {onEdit && (
                        <td className="delete-cell">
                          <DeleteButton
                            onClick={() => deleteDiaryData("toilet", doc.uid)}
                          >
                            삭제
                          </DeleteButton>
                        </td>
                      )}
                      <td>{convertDate(doc.date)}</td>
                      <td>{doc.pees}</td>
                      <td>{doc.poops}</td>
                      <td>{doc.memo || "-"}</td>
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
                {onEdit && <th style={{ width: "60px" }}>삭제</th>}
                <th style={{ width: "160px" }}>날짜</th>
                <th style={{ width: "60px" }}>종류</th>
                <th style={{ width: "60px" }}>양</th>
                <th style={{ width: "180px" }}>메모</th>
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
                      {onEdit && (
                        <td className="delete-cell">
                          <DeleteButton
                            onClick={() => deleteDiaryData("feeding", doc.uid)}
                          >
                            삭제
                          </DeleteButton>
                        </td>
                      )}
                      <td>{convertDate(doc.date)}</td>
                      <td>{listOfFeeding[doc.valueOfFeed]}</td>
                      <td>{doc.volumeOfFeed}g</td>
                      <td>{doc.memo || "-"}</td>
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
                {onEdit && <th style={{ width: "60px" }}>삭제</th>}
                <th style={{ width: "160px" }}>날짜</th>
                <th style={{ width: "60px" }}>놀이시간</th>
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
                      {onEdit && (
                        <td className="delete-cell">
                          <DeleteButton
                            onClick={() => deleteDiaryData("playing", doc.uid)}
                          >
                            삭제
                          </DeleteButton>
                        </td>
                      )}
                      <td>{convertDate(doc.date)}</td>
                      <td>{convertPlayingTime(doc.playTime)}</td>
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
                {onEdit && <th style={{ width: "60px" }}>삭제</th>}
                <th style={{ width: "160px" }}>날짜</th>
                <th style={{ width: "80px" }}>종류</th>
                <th style={{ width: "180px" }}>메모</th>
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
                      {onEdit && (
                        <td className="delete-cell">
                          <DeleteButton
                            onClick={() =>
                              deleteDiaryData("vaccination", doc.uid)
                            }
                          >
                            삭제
                          </DeleteButton>
                        </td>
                      )}
                      <td>{convertDate(doc.date)}</td>
                      <td>{listOfVaccine[doc.valueOfVaccine]}</td>
                      <td>{doc.etcVaccine || "-"}</td>
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
      <TableWrapper>
        <TableBlock $onEdit={onEdit}>{tableData()}</TableBlock>
      </TableWrapper>
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

const TableWrapper = styled.div`
  width: 100%;
  max-height: 60vh;
  margin-bottom: 12px;
  overflow-x: auto;
`;

const TableBlock = styled.table<{ $onEdit: boolean }>`
  width: 100%;
  margin-bottom: 10px;
  table-layout: fixed;
  border-collapse: separate;

  thead {
    font-weight: 700;
    position: sticky;
    top: 0;
    left: 1px;

    tr {
      background-color: ${({ theme }) => theme.colors.lightGray};
    }

    th {
      padding: 8px 0;
      border: 1px solid ${({ theme }) => theme.colors.black};
      border-left: none;
    }

    th:first-child {
      border-left: 1px solid ${({ theme }) => theme.colors.black};
    }
  }

  tbody {
    text-align: center;

    td {
      padding: 10px 4px;
      border: 1px solid ${({ theme }) => theme.colors.black};
      border-left: none;
      border-top: none;
      vertical-align: middle;
    }

    td.delete-cell {
      padding: 4px;
    }

    td:first-child {
      border-left: 1px solid ${({ theme }) => theme.colors.black};
    }
  }
`;

const DeleteButton = styled(Button)`
  width: 100%;
  padding: 4px 8px;
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
