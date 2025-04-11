import { convertDate } from "@/util/convertDate";
import { DocumentData } from "firebase/firestore";
import styled from "styled-components";

type DiaryDataType = {
  selectedMenu: string;
  data: DocumentData[];
};

function DiaryTable({ selectedMenu, data }: DiaryDataType) {
  const convertPlayingTime = (time: string) => {
    const minutes = Math.floor(+time / 60);
    const seconds = minutes > 0 ? +time - minutes * 60 : +time;
    return minutes > 0 ? `${minutes}분 ${seconds}초` : `${seconds}초`;
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
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={4}>데이터가 없습니다.</td>
                </tr>
              )}
              {data.map((doc) => {
                return (
                  <tr key={"toilet" + doc.date}>
                    <td>{convertDate(doc.date)}</td>
                    <td>{doc.pees}</td>
                    <td>{doc.poops}</td>
                    <td>{doc.memo || "-"}</td>
                  </tr>
                );
              })}
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
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={4}>데이터가 없습니다.</td>
                </tr>
              )}
              {data.map((doc) => {
                return (
                  <tr key={"feeding" + doc.date}>
                    <td>{convertDate(doc.date)}</td>
                    <td>{listOfFeeding[doc.valueOfFeed]}</td>
                    <td>{doc.volumeOfFeed}g</td>
                    <td>{doc.memo || "-"}</td>
                  </tr>
                );
              })}
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
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={4}>데이터가 없습니다.</td>
                </tr>
              )}
              {data.map((doc) => {
                return (
                  <tr key={"playing" + doc.date}>
                    <td>{convertDate(doc.date)}</td>
                    <td>{convertPlayingTime(doc.playTime)}</td>
                  </tr>
                );
              })}
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
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={4}>데이터가 없습니다.</td>
                </tr>
              )}
              {data.map((doc) => {
                return (
                  <tr key={"vaccination" + doc.date}>
                    <td>{convertDate(doc.date)}</td>
                    <td>{listOfVaccine[doc.valueOfVaccine]}</td>
                    <td>{doc.etcVaccine || "-"}</td>
                  </tr>
                );
              })}
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

  return <TableBlock>{tableData()}</TableBlock>;
}

export default DiaryTable;

const TableBlock = styled.table`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.black};

  thead {
    font-weight: 700;
    background-color: ${({ theme }) => theme.colors.lightGray};

    th {
      padding: 8px 0;
      border: 1px solid ${({ theme }) => theme.colors.black};
    }

    th:nth-of-type(1) {
      width: 35%;
    }
    th:nth-of-type(2) {
      width: 15%;
    }
    th:nth-of-type(3) {
      width: 15%;
    }
    th:nth-of-type(4) {
      width: 35%;
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
