import { collection, doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { useState, useContext } from "react"
import { db } from "../firebase"
import { AuthContext } from "../context/AuthContext"

function NewItem() {
    const {currentUser} = useContext(AuthContext)       // get current user from context
    
    const [name, setName] = useState("")                // state for item name input
    const [quantity, setQuantity] = useState(0)         // state for item quantity input

    const [error, setError] = useState(false)

    const handleAdd = async(e) =>{              // upon clicking 'Add Item'...
        e.preventDefault()                          // make sure something was inputted
        setError(false)
        if(name.length == 0 || quantity ==0)
        {
            setError(true)
        }
        else{   
        await addDoc(collection(db, "items"), {     // add that item to the DB with properties: 
            name: name,                                 // name of item
            quantity: quantity,                         // quantity of item
            user: currentUser.email,                    // user email of item adder
            timeStamp: serverTimestamp(),               // time added
        });}
        setName("");
        setQuantity(0);
        e.target.reset();
    }

    return(
        <div className="newItem">
            <div className="AddItem"><h1>Add / Update an Item </h1></div>
            
            <form className="newItem" onSubmit={handleAdd}>
                <div className="FormWrapper">
                <input className="newItem" type="name" placeholder="Item Name" onChange={e=>setName(e.target.value)} />
                <input className="newItem" type="quantity" placeholder="Quantity" onChange={e=>setQuantity(e.target.value)} />
                <button className="newItem" type="submit">Submit</button>
                
                </div>
                </form>
            

        </div>
    )
}

export default NewItem;