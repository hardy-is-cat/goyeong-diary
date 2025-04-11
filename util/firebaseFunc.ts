import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import {
  FeedingData,
  PlayingData,
  ToiletData,
  VaccinationData,
  CatInfo,
} from "./types";
import { auth, storage } from "firebaseInit";

const updateCatsCollection = async (data: CatInfo) => {
  const catsCollectionRef = collection(storage, "cats");
  const user = auth.currentUser;
  try {
    const docRef = await addDoc(catsCollectionRef, {
      name: data.name,
      birth: data.birth,
      thumb: data.thumb || "https://i.ibb.co/Kc6tjcX5/default-profile.png",
      user: [user!.uid],
    });
    return docRef.id;
  } catch (error) {
    console.error("저장 중 오류 발생!", error);
  }
};

const updateUsersCollection = async (catId: string) => {
  const user = auth.currentUser;
  const docRef = doc(storage, "users", user!.uid);
  await updateDoc(docRef, { pet: catId }).catch((error) => {
    console.error("저장 중 오류 발생!", error);
  });
};

const uploadData = async (
  catId: string,
  data: ToiletData | FeedingData | PlayingData | VaccinationData,
  collectionName: "toilet" | "feeding" | "playing" | "vaccination"
) => {
  const docRef = doc(storage, collectionName, catId);
  try {
    await setDoc(docRef, data);
    alert("기록이 저장되었습니다");
    window.location.reload();
  } catch (error) {
    console.error("저장 중 오류 발생!", error);
  }
};

export { updateCatsCollection, updateUsersCollection, uploadData };
