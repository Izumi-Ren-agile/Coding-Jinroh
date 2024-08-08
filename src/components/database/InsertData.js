import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";

export const InsertData = (props) => {
  const { collectionId,jsonObject } = props;

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

  // Add JSON object to a specific collection
  async function addData(db, jsonObject) {
    try {
      const dataCol = collection(db, collectionId);
      const docRef = await addDoc(dataCol, jsonObject);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch existing data from the collection
    const fetchData = async () => {
      const dataCol = collection(db, collectionId);
      const dataSnapshot = await getDocs(dataCol);
      const dataList = dataSnapshot.docs;
      setData(dataList);
    };

    // Add the new JSON object
    addData(db, jsonObject).catch(console.error);

    fetchData().catch(console.error); // Fetch existing data and update state
  }, [jsonObject]);
};

export default InsertData;