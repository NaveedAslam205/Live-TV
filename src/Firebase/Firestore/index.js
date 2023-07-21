import app from "../firebase";
import {
    collection,
    getFirestore,
    getDocs,
    doc,
    query,
} from "firebase/firestore";

const db = getFirestore(app);


export const getChannels = async () => {
    try {
        const q = query(collection(db, "Channels"));
        let channels = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            channels.push(doc.data());

        });
        return { success: true, data: channels }
    } catch (e) {
        console.log(e)
        return { success: false, data: null }

    }
}