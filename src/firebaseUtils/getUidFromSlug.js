import { db } from "@/firebaseConfig.js";

export default function getUidFromSlug(slug) {
  return new Promise((resolve, reject) => {
    const userNamesRef = db.collection("usernames").doc(slug);
    userNamesRef.get().then((doc) => {
      if (doc.exists) {
        resolve(doc.data().uid);
      } else {
        reject("NO SUCH DOCUMENT");
      }
    });
  });
}
