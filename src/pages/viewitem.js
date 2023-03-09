import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate, Routes, Route } from "react-router-dom";

import Item from "./item"

function ViewItem() {
    const navigate = useNavigate();

    const itemsRef = collection(db, "items");

    const [itemList, setItemList] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        const getItems = async () => {
            const data = await getDocs(itemsRef);
            setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getItems();
    }, [])

    function handleClick(item) {
        const itemHistory = [];
        itemList.forEach((a) => {
            if (a.name === item.name) {
                console.log("Tracking ", a.id)
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

        let itemSearch = true;
        const itemHistory = [];
        const userHistory = [];
        itemList.map((a) => {
            if (a.name === search) {
                console.log("Tracking ", a.id)
                itemHistory.push(a);
            }
            else if (a.user === search) {
                console.log("Tracking ", a.user)
                userHistory.push(a);
            }
        })
        if (itemHistory.length === 0) {
            itemSearch = false;
            if (userHistory.length === 0) {
                setError(true);
                return;
            }
        }
        let history;
        if (itemSearch) {
            history = itemHistory;
        }
        else {
            history = userHistory;
        }
        navigate("/item",{state:{itemHistory: history, item: history[0], isItemSearch: itemSearch}});
        <Route path="/item">
            <Item />
        </Route>
    }

    return(
        <div>
            <form onSubmit={handleSearch} >
                <input type="text" placeholder="Item/User Name" onChange={e=>setSearch(e.target.value)} />
                <button type="submit">Search</button>
                {error && <span>Item not found!</span>}
            </form>
            <table>
                {itemList.map((item) => {
                    return (
                        <div key={item.id}>
                            <button onClick={ () => {handleClick(item)} }>{item.name}</button>
                            <span>  {item.quantity}</span>
                            <span>  {item.user}</span>
                        </div>
                    );
                })}
            </table>
        </div>
    )
}

export default ViewItem;