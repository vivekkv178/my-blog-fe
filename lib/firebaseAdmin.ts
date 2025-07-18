/* eslint-disable @eslint/no-explicit-any */
import { initializeApp, cert, getApps } from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_FIRESTORE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
};

export const firebaseAdminApp =
  getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

export const db = getFirestore(firebaseAdminApp);

export const addDocument = async ({ collectionName, document }) => {
  try {
    const addResponse = await db.collection(collectionName).add(document);
    return addResponse;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const setDocument = async ({ collectionName, documentId, document }) => {
  try {
    const addResponse = await db
      .collection(collectionName)
      .doc(documentId)
      .set(document);
    return addResponse;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const listDocumentsFromCollection = async (collectionName) => {
  try {
    const querySnapshot = await db.collection(collectionName).get();
    let data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({
        doc_id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

export const getDocument = async ({ collectionName, documentId }) => {
  try {
    const docRef = db.collection(collectionName).doc(documentId);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      return docSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
};

export const getSubDocument = async ({
  collectionName,
  parentDocumentId,
  subCollectionName,
  subDocumentId,
}) => {
  try {
    const parentDocRef = db.collection(collectionName).doc(parentDocumentId);
    const subCollectionRef = parentDocRef.collection(subCollectionName);
    const subDocumentSnapshot = await subCollectionRef.doc(subDocumentId).get();

    if (subDocumentSnapshot.exists) {
      return subDocumentSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting subdocument: ", error);
    throw error;
  }
};
