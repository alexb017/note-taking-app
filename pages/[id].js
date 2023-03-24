import db from "@/components/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function EditNote({ data }) {
    return (
        <div className="edit-note-modal">
            <h1>{data.id}</h1>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    //const { id } = context.query;
    const data = params;
    // // Fetch necessary data for the blog post using params.id
    // const data = await getDoc(doc(db, "notes", params.id));

    // if (data.exists()) {
    //     console.log("Document data:", data.data());
    // } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    // }

    return {
        props: {
            data,
        },
    };
}