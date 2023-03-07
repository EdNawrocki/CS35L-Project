import { useState, useEffect} from "react"
import {collection, doc, getDocs} from 'firebase/firestore'
import { db } from "../firebase"
import {Link, useParams} from 'react-router-dom';

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

    console.log(itemList);

    return(
        <div>
            {itemList.map((item) => {
                return (//<div>{item.name}</div>;
                    <Link to={`/items/${item.id}`} key={item.id}>
                        <div>{item.name}</div>
                    </Link>
                );
            })}
        </div>
    );
}

export default ViewItem;

function DisplayStats() {
    const {itemId} = useParams();
    const itemRef = doc(db, "items", itemId);

    const [itemStats, setItemStats] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            const stats = await getDocs(itemRef);
            setItemStats(stats.docs[0].data());
        };
        
    getStats();
    }, [itemRef]);

    return(
    <div>
        <h1>{itemStats.name}</h1>
        <p>{itemStats.quantity}</p>
        <p>{itemStats.timeStamp}</p>
        <p>{itemStats.user}</p>
    </div>
    )
}

export {DisplayStats};