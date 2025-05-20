import { ReactElement, useEffect, useState } from "react";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { storage } from "firebaseInit";
import { NextPageWithLayout } from "pages/_app";
import styled from "styled-components";

import Button from "@/components/Button";
import DiaryTable from "@/components/DiaryTable";
import Loading from "@/components/Loading";
import TitleLayout from "@/components/TitleLayout";

const DiaryIndex: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  };

  useEffect(() => {
    if (!selectedMenu) return;

    const storagePetId = localStorage.getItem("petId");
    if (!storagePetId) return;
    setPetId(storagePetId);

    loadData(selectedMenu, storagePetId);
  }, [selectedMenu]);

  return (
    <MainWrapper>
      <TabMenuWrapper>
        <Button
          filled={selectedMenu === "toilet"}
          onClick={() => {
            setSelectedMenu("toilet");
            setLoading(true);
          }}
        >
          화장실
        </Button>
        <Button
          filled={selectedMenu === "feeding"}
          onClick={() => {
            setSelectedMenu("feeding");
            setLoading(true);
          }}
        >
          식사
        </Button>
        <Button
          filled={selectedMenu === "playing"}
          onClick={() => {
            setSelectedMenu("playing");
            setLoading(true);
          }}
        >
          놀이
        </Button>
        <Button
          filled={selectedMenu === "vaccination"}
          onClick={() => {
            setSelectedMenu("vaccination");
            setLoading(true);
          }}
        >
          접종
        </Button>
      </TabMenuWrapper>
      {loading ? (
        <Loading />
      ) : (
        <DiaryTable selectedMenu={selectedMenu} data={data} />
      )}
    </MainWrapper>
  );
};

export default DiaryIndex;

DiaryIndex.getLayout = function getLayout(page: ReactElement) {
  return <TitleLayout>{page}</TitleLayout>;
};

const MainWrapper = styled.main`
  max-width: 430px;
  min-height: 100vh;
  padding: 80px 30px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);

  input[type="month"] {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const TabMenuWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
