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
            <table>
                {itemList.map((item) => {
                    return (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    )
}

export default ViewItem;