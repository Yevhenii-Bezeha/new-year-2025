import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { Activity } from "../types/activity";

const COLLECTION_NAME = "activities";

export const activitiesService = {
  async getActivities(): Promise<Activity[]> {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Activity[];
  },

  async addActivity(activity: Omit<Activity, "id">): Promise<Activity> {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...activity,
      createdAt: new Date().toISOString(),
    });
    return {
      id: docRef.id,
      ...activity,
    };
  },

  async updateActivity(
    id: string,
    activity: Omit<Activity, "id">
  ): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...activity,
      updatedAt: new Date().toISOString(),
    });
  },

  async deleteActivity(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },

  async updateLastUsed(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      lastUsedAt: new Date().toISOString(),
      usageCount: increment(1),
    });
  },
};
