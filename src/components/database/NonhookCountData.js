import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

/**
 * 指定されたコレクションIDのコレクションに含まれているドキュメントの総数を数える
 * @param {string} collectionId コレクションのID
 * @returns {Promise<number>} コレクションの総数
 */
export const NonhookCountData = async (collectionId) => {
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

  try {
    const dataCol = collection(db, collectionId);
    const dataSnapshot = await getDocs(dataCol);
    return dataSnapshot.size; // ドキュメントの総数を取得
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return 0;
  }
};

export default NonhookCountData;
