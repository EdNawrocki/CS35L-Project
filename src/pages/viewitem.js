import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function ViewItem() {
    const itemsRef = collection(db, "items");

    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const data = await getDocs(itemsRef);
            setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getItems();
    })

    return(
        <div>
            {itemList.map((item) => {
                return <div>{item.name}</div>
            })}
        </div>
    )
}

export default ViewItem;