import { useLocation, useNavigate } from "react-router-dom"
import { getFirestore, doc, deleteDoc } from "firebase/firestore"
import { useState } from "react"

function Item() {
    const location = useLocation();
    const db = getFirestore();
    const navigate = useNavigate();

    const [error, setError] = useState(false);

    let total = 0;
    location.state.itemHistory.forEach((item) => {
        total += Number(item.quantity);
        return total;
    })

    const handleDelete = () => {
        location.state.itemHistory.forEach((item) => {
            const docRef = doc(db, "items", item.id);
            deleteDoc(docRef)
              .then(() => {
                console.log("Item ", item.id, " deleted.");
              })
              .catch(error => {
                setError(true);
              })
        });
        if (! error) {
            navigate("/viewitem");
        }
    }
    
    return(
        <div>
            <h1>{location.state.item.name}'s History:</h1>
            {location.state.itemHistory.map((item) => {
                return (
                    <li key="item.id">{item.name}    {item.quantity}</li>
                );
            })}
            <p>{total}</p>
            <button onClick={handleDelete}>Stop Tracking Item {location.state.item.name}</button>
            {error && <span>ERROR DELETING</span>}
        </div>
    );
}

export default Item;