import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate, Routes, Route } from "react-router-dom";

import Item from "./item"

function ViewItem() {
    const PULL_FROM_DB = true;            // set true for data base pulling, DELETE FOR FINAL PRODUCT

    const navigate = useNavigate();

    const itemsRef = collection(db, "items");

    const [itemList, setItemList] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);

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
            fixedList.push({ name: "test0", quantity: x*Math.floor(Math.random() * 10000), id: 50+i});
        }
        setItemList(fixedList);
    }

    function handleClick(item) {
        const itemHistory = [];
        itemList.forEach((a) => {
            if (a.name === item.name) {
                itemHistory.push(a);
            }
        })
        navigate("/item",{state:{itemHistory: itemHistory, item: item}});
        <Route path="/item">
            <Item />
        </Route>
    }

    const handleSearch = (e)=>{
        e.preventDefault();
        setError(false);

        const itemHistory = [];
        itemList.map((a) => {
            if (a.name === search) {
                itemHistory.push(a);
            }
        })
        if (itemHistory.length === 0) {
            setError(true);
            return;
        }
        navigate("/item",{state:{itemHistory: itemHistory, item: itemHistory[0]}});
        <Route path="/item">
            <Item />
        </Route>
    }

    return(
        <div>
            <form onSubmit={handleSearch} >
                <input type="text" placeholder="Item Name" onChange={e=>setSearch(e.target.value)} />
                <button type="submit">Search</button>
                {error && <span>Item not found!</span>}
            </form>
            <table>
                {itemList.map((item) => {
                    return (
                        <div key={item.id}>
                            <button onClick={ () => {handleClick(item)} }>{item.name}</button>
                            <span>{item.quantity}</span>
                        </div>
                    );
                })}
            </table>
        </div>
    )
}

export default ViewItem;