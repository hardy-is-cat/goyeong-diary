import Button from "@/components/Button";
import DiaryTable from "@/components/DiaryTable";
import TitleLayout from "@/components/TitleLayout";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { storage } from "firebaseInit";
import { NextPageWithLayout } from "pages/_app";
import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

const DiaryIndex: NextPageWithLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState("toilet");
  const [petId, setPetId] = useState("");
  const [data, setData] = useState<DocumentData[]>([]);

  const loadData = async (selectedMenu: string, petId: string) => {
    const collectionRef = collection(storage, selectedMenu);
    const querySnapshot = await getDocs(collectionRef);
    const matchingDocumentArr = querySnapshot.docs
      .filter((doc) => doc.id.includes(petId))
      .map((doc) => doc.data());
    setData(matchingDocumentArr);
  };

  useEffect(() => {
    if (!selectedMenu) return;

    const storagePetId = localStorage.getItem("pet");
    if (!storagePetId) return;
    setPetId(storagePetId);

    loadData(selectedMenu, storagePetId);
  }, [selectedMenu]);

  return (
    <>
      <TabMenuWrapper>
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
      </TabMenuWrapper>
      <DiaryTable selectedMenu={selectedMenu} data={data} />
    </>
  );
};

export default DiaryIndex;

DiaryIndex.getLayout = function getLayout(page: ReactElement) {
  return <TitleLayout>{page}</TitleLayout>;
};

const TabMenuWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;
