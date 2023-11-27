import { db } from "$lib/firebase";
import { json } from "@sveltejs/kit";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

let demoDB = [];

export async function GET() {
    const collectionRef = collection(db, 'docData');
    const querySnapshot = await getDocs(query(collectionRef));
    const docs = querySnapshot.docs.map(doc => doc.data());
    const combinedDocs = [...demoDB, ...docs];
    return json(combinedDocs);
}

export async function POST(e) {
    const { request } = e;
    const { title, desc, tags, url, rating, ratingComment, category } = await request.json();
    const newDoc = {
        title,
        desc,
        url,
        rating,
        ratingComment,
        tags,
        category,
        owner: '',
        id: ''
    };

    demoDB.push(newDoc);
    return json(newDoc, { status: 201 });
}