import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  FeedingData,
  PlayingData,
  ToiletData,
  VaccinationData,
  CatInfo,
} from "./types";
import { auth, storage } from "firebaseInit";

const addCatsCollection = async (data: CatInfo) => {
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

const updateCatsDoc = async (
  updateCatData: Partial<CatInfo>,
  catId: string
) => {
  const docRef = doc(storage, "cats", catId);
  try {
    await updateDoc(docRef, updateCatData);
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

const deleteDiaryData = async (collectionName: string, uid: string) => {
  try {
    const userConfirm = confirm("기록을 삭제하시겠습니까?");
    if (userConfirm) {
      await deleteDoc(doc(storage, collectionName + "/" + uid));
      location.reload();
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  addCatsCollection,
  updateCatsDoc,
  updateUsersCollection,
  uploadData,
  deleteDiaryData,
};
