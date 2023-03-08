import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function ViewItem() {
    const PULL_FROM_DB = false;            // set true for data base pulling, DELETE FOR FINAL PRODUCT
    const itemsRef = collection(db, "items");

    const [itemList, setItemList] = useState([]);

    useEffect(() => {
                                        if (!PULL_FROM_DB) { return; }  // DELETE FOR FINAL PRODUCT
        const getItems = async () => {
            const data = await getDocs(itemsRef);
            setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getItems();
    }, [])

    if (! PULL_FROM_DB && itemList.length === 0) {      // DELETE WHOLE IF STATEMENT FOR FINAL PRODUCT
        const fixedList = [];
        for (let i = 0; i != 50; i++) {
            fixedList.push({ name: "test" + i.toString(), quantity: Math.floor(Math.random() * 10000), id: i })
        }
        setItemList(fixedList);
    }

    return(
        <div>
            <table>
                {itemList.map((item) => {
                    console.log(item);
                    return (
                        <tr key={item.id}>
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