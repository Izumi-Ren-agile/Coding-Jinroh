import React, { useEffect, useState } from 'react';
import '../css/App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export const DataFunc=(props)=>{
    const {collectionId,documentId,field}=props;
    const firebaseConfig = {
        apiKey: "AIzaSyCyffFMwAi7Ms8TYEa3G6_flcjhLzmWllI",
        authDomain: "coding-jinroh.firebaseapp.com",
        projectId: "coding-jinroh",
        storageBucket: "coding-jinroh.appspot.com",
        messagingSenderId: "564938563959",
        appId: "1:564938563959:web:bcc5dc6e1f0fa438784172"
      };
    
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
    
      // Get a list of data from your database
      async function getData(db) {
        const dataCol = collection(db, collectionId);
        const dataSnapshot = await getDocs(dataCol);
        const dataList = dataSnapshot.docs.filter(doc=>doc.id===(documentId||doc.id)).map(doc => doc.data());
        return dataList;
      }
      
      const [data, setData] = useState([]);

      useEffect(() => {
        // 非同期関数を呼び出して結果を状態に保存する
        const fetchData = async () => {
          const dataList = await getData(db);
          setData(dataList);
        };
    
        fetchData().catch(console.error); // エラーハンドリング
      }, []);
      
      return (
        
          <>
          <p>{data.map((col,index)=>{return col[field]})}</p>
          </>
      );
}