"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ToggleButton from "@/components/ToggleButton";
import { goyeongDiaryFirestore } from "firebaseInit";

import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";

export default function Home() {
  const getCats = async () => {
    const querySnapshot = await getDocs(
      collection(goyeongDiaryFirestore, "cats")
    );
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  };
  getCats();

  const setCats = async () => {
    try {
      const setCat = await setDoc(doc(goyeongDiaryFirestore, "cats", "maru"), {
        sex: "male",
        age: 3,
      });
      console.log("추가 완료");
    } catch (error) {
      console.error("Error adding doc: ", error);
    }
  };

  return (
    <>
      <Button onClick={setCats}>고양이 추가</Button>
      <Input
        placeholder="ID"
        disabled={false}
        type="text"
        helperText="helperText"
      />
      <Input
        placeholder="ID"
        disabled={true}
        type="text"
        helperText="helperText"
      />
      <Input
        placeholder="ID"
        disabled={false}
        type="text"
        helperText="helperText"
        state="correct"
      />
      <Button>해위</Button>
      <Button filled>해위</Button>
      <Button disabled>해위</Button>
      <select name="고양이선택" id="select-cat" defaultValue="기본값" required>
        <option value="기본값" disabled>
          선택해주세요
        </option>
        <option value="하디1">하디 1</option>
        <option value="하디2">하디 2</option>
        <option value="하디3">하디 3</option>
      </select>
      <ToggleButton />
    </>
  );
}
