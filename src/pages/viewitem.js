import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate, Routes, Route } from "react-router-dom";

import Item from "./item"

function ViewItem() {
    const navigate = useNavigate();

    const itemsRef = collection(db, "items");

    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const data = await getDocs(itemsRef);
            setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getItems();
    }, [])

    function handleClick(item) {
        navigate("/item",{state:{item: item}});
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