import { db } from "../services/firebase";
import {
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";

const tripsCollection = collection(db, "trips");

// ✅ CREATE
export const addTripToDB = async (trip, userId) => {
    await addDoc(tripsCollection, {
        ...trip,
        userId,
        createdAt: new Date(),
    });
};


export const subscribeToTrips = (userId, callback) => {
    const q = query(
        collection(db, "trips"),
        where("userId", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const trips = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        callback(trips);
    });

    return unsubscribe;
};

// ✅ READ
export const getTripsFromDB = async (userId) => {
    const q = query(tripsCollection, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

// ✅ DELETE
export const deleteTripFromDB = async (id) => {
    await deleteDoc(doc(db, "trips", id));
};

// ✅ UPDATE
export const updateTripInDB = async (id, updatedData) => {
    await updateDoc(doc(db, "trips", id), updatedData);
};