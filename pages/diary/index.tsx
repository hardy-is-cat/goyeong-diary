import Button from "@/components/Button";
import TitleLayout from "@/components/TitleLayout";
import { ToiletData } from "@/util/types";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { storage } from "firebaseInit";
import { NextPageWithLayout } from "pages/_app";
import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

const DiaryIndex: NextPageWithLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState("toilet");
  const [petId, setPetId] = useState("");
  // const [data, setData] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>()
  const [data, setData] = useState<DocumentData[]>([]);

  const loadData = async () => {
    const collectionRef = collection(storage, selectedMenu);
    const querySnapshot = await getDocs(collectionRef);
    // const matchingDocumentIds = querySnapshot.docs.map((doc) =>
    //   console.log(doc)
    // );
    // const matchingDocumentIds = querySnapshot.docs;
    const matchingDocumentIds = querySnapshot.docs.filter((doc) =>
      doc.id.includes(petId)
    );
    const docArr = matchingDocumentIds.map((doc) => doc.data());
    console.log(docArr);
    setData(docArr);
  };

  useEffect(() => {
    setPetId(localStorage.getItem("pet")!);
    loadData();
  }, [selectedMenu]);

  return (
    <main>
      <TabmenuWrapper>
        <Button
          filled={selectedMenu === "toilet"}
          onClick={() => setSelectedMenu("toilet")}
        >
          화장실
        </Button>
        <Button
          filled={selectedMenu === "feeding"}
          onClick={() => setSelectedMenu("feeding")}
        >
          식사
        </Button>
        <Button
          filled={selectedMenu === "playing"}
          onClick={() => setSelectedMenu("playing")}
        >
          놀이
        </Button>
        <Button
          filled={selectedMenu === "vaccination"}
          onClick={() => setSelectedMenu("vaccination")}
        >
          접종
        </Button>
      </TabmenuWrapper>
      <TableBlock>
        <thead>
          <th>날짜</th>
          <th>감자</th>
          <th>맛동산</th>
          <th>메모</th>
        </thead>
        <tbody>
          {data.map((doc) => {
            return (
              <tr>
                <td>{doc.date}</td>
                <td>{doc.pees}</td>
                <td>{doc.poops}</td>
                <td>{doc.memo.length === 0 && "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </TableBlock>
    </main>
  );
};

export default DiaryIndex;

DiaryIndex.getLayout = function getLayout(page: ReactElement) {
  return <TitleLayout>{page}</TitleLayout>;
};

const TabmenuWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

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
  }

  tbody {
    text-align: center;

    td {
      padding: 8px 0;
      border: 1px solid ${({ theme }) => theme.colors.black};
    }
  }
`;
