import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate, Routes, Route } from "react-router-dom";

import Item from "./item"

function ViewItem() {
    const navigate = useNavigate();             // func for redirecting user

    const itemsRef = collection(db, "items");   // set 'itemsRef' to collection of documents in 'items'

    const [itemList, setItemList] = useState([]);   // state for list of items
    const [search, setSearch] = useState("");       // state for search phrase
    const [error, setError] = useState(false);      // state for error searching

    useEffect(() => {       // on refresh, attempt to store list of DB items into 'itemList'
        const getItems = async () => {
            const data = await getDocs(itemsRef);
            setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getItems();
    }, [])

    function handleClick(item) {    // upon clicking 'item's button...
        const itemHistory = [];
        itemList.forEach((a) => {       // set 'itemHistory' to be all instances of 'item'
            if (a.name === item.name) {
                console.log("Tracking ", a.id)
                itemHistory.push(a);
            }
        })
        navigate("/item",{state:{itemHistory: itemHistory, item: item, isItemSearch: true}});   // navigate user to item passing it 'itemHistory' and item clicked
        <Route path="/item">
            <Item />
        </Route>
    }

    const handleSearch = (e)=>{ // upon clicking 'search'...
        // NOTE: if there are items with a name that is also a valid user email, it will assume they were looking for the item
        e.preventDefault();         // make sure something was inputted
        setError(false);            // reset error to false

        let itemSearch = true;      // keep track of whether user searched for item or user
        const itemHistory = [];
        const userHistory = [];
        itemList.map((a) => {
            if (a.name === search) {        // populate 'itemHistory' with all instances of item with name
                console.log("Tracking ", a.id)
                itemHistory.push(a);
            }
            else if (a.user === search) {   // populate 'userHistory' with all instances of item with user
                console.log("Tracking ", a.user)
                userHistory.push(a);
            }
        })
        if (itemHistory.length === 0) {     // if no items found with name
            itemSearch = false;                 // they must not have been searching for an item name
            if (userHistory.length === 0) {         // if no items found with user
                setError(true);                         // their search is invalid
                return;
            }
        }
        let history;                        // set history to be the itemHistory or the userHistory based on which one succeeded
        if (itemSearch) {
            history = itemHistory;
        }
        else {
            history = userHistory;
        }
        navigate("/item",{state:{itemHistory: history, item: history[0], isItemSearch: itemSearch}});   // navigate to items page passing history array and what type of search it was
        <Route path="/item">
            <Item />
        </Route>
    }

    return(
        <div>
            <form onSubmit={handleSearch} >
                <input type="text" placeholder="Item/User Name" onChange={e=>setSearch(e.target.value)} />
                <button type="submit">Search</button>
                {error && <span>Item/User not found!</span>}
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