import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate, Routes, Route } from "react-router-dom";

import Item from "./item"

function ViewItem() {
    const PULL_FROM_DB = false;            // set true for data base pulling, DELETE FOR FINAL PRODUCT

    const navigate = useNavigate();

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
            let x = Math.random() > .5 ? -1 : 1;
            fixedList.push({ name: "test" + i.toString(), quantity: x*Math.floor(Math.random() * 10000), id: i })
        }
        for (let i = 0; i != 10; i++) {
            let x = Math.random() > .5 ? -1 : 1;
            fixedList.push({ name: "test0", quantity: x*Math.floor(Math.random() * 10000), id: 50});
        }
        setItemList(fixedList);
    }

    function handleClick(item) {
        const itemHistory = [];
        itemList.map((a) => {
            if (a.name === item.name) {
                itemHistory.push(a);
            }
        })
        navigate("/item",{state:{itemHistory: itemHistory, item: item}});
            <Route path="/item">
                <Item />
            </Route>

    }

    return(
        <div>
            <table>
                {itemList.map((item) => {
                    return (
                        <div key={item.id}>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                            </tr>
                            <button onClick={ () => {handleClick(item)} }>View Item</button>
                        </div>
                    );
                })}
            </table>
        </div>
    )
}

export default ViewItem;