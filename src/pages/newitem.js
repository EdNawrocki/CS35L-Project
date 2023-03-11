import { collection, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { useState, useContext } from "react"
import { db } from "../firebase"
import { AuthContext } from "../context/AuthContext"

function NewItem() {
    const {currentUser} = useContext(AuthContext)       // get current user from context
    
    const [name, setName] = useState("")                // state for item name input
    const [quantity, setQuantity] = useState(0)         // state for item quantity input

    const handleAdd = async(e) =>{              // upon clicking 'Add Item'...
        e.preventDefault()                          // make sure something was inputted

        await addDoc(collection(db, "items"), {     // add that item to the DB with properties: 
            name: name,                                 // name of item
            quantity: quantity,                         // quantity of item
            user: currentUser.email,                    // user email of item adder
            timeStamp: serverTimestamp(),               // time added
        });
    }

    return(
        <div className="newItem">
            <form className="newItem" onSubmit={handleAdd}>
                <input className="newItem" type="name" placeholder="Item Name" onChange={e=>setName(e.target.value)} />
                <input className="newItem" type="quantity" placeholder="Quantity" onChange={e=>setQuantity(e.target.value)} />
                <button className="newItem" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewItem;