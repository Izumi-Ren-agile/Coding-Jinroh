import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore/lite";

export const UpdateData = (props) => {
  const { collectionId, documentId, jsonObject } = props;

  const firebaseConfig = {
    apiKey: "AIzaSyCyffFMwAi7Ms8TYEa3G6_flcjhLzmWllI",
    authDomain: "coding-jinroh.firebaseapp.com",
    projectId: "coding-jinroh",
    storageBucket: "coding-jinroh.appspot.com",
    messagingSenderId: "564938563959",
    appId: "1:564938563959:web:bcc5dc6e1f0fa438784172",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Add or update JSON object with a specific document ID
  async function setData(db, jsonObject) {
    try {
      const docRef = doc(db, collectionId, documentId || '');
      await setDoc(docRef, jsonObject);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const [data, setDataList] = useState([]);

  useEffect(() => {
    // Fetch existing data from the collection
    const fetchData = async () => {
      const dataCol = collection(db, collectionId);
      const dataSnapshot = await getDocs(dataCol);
      const dataList = dataSnapshot.docs
        .filter((doc) => doc.id === (documentId || doc.id))
        .map((doc) => doc.data());
      setDataList(dataList);
    };

    // Set the new JSON object
    if (documentId) {
      setData(db, jsonObject).catch(console.error);
    } else {
      console.error("Error: documentId is required to set data.");
    }

    fetchData().catch(console.error); // Fetch existing data and update state
  }, [jsonObject]);
}

export default UpdateData;
