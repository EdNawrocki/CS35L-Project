import { collection, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { useState, useContext } from "react"
import { db } from "../firebase"
import { AuthContext } from "../context/AuthContext"

function NewItem() {
    const {currentUser} = useContext(AuthContext)
    console.log(currentUser.email)
    
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState(0)

    const handleAdd = async(e) =>{
        e.preventDefault()

        await addDoc(collection(db, "items"), {
            name: name,
            quantity: quantity,
            user: currentUser.email,
            timeStamp: serverTimestamp(),
        });
    }

    return(
        <div>
            <form onSubmit={handleAdd}>
                <input type="name" placeholder="Item Name" onChange={e=>setName(e.target.value)} />
                <input type="quantity" placeholder="Quantity" onChange={e=>setQuantity(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewItem;