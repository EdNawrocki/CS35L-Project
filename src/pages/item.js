import { useLocation, useNavigate } from "react-router-dom"
import { getFirestore, doc, deleteDoc } from "firebase/firestore"
import { useState ,React } from "react"
import Chart from 'chart.js/auto'
import Plot from 'react-plotly.js'

function Item() {
    // list of all pertinent objects is imported as: 
    //          location.state.itemHistory
    // implemented as an array of JS objects with the following properties; 
    // in other words, in brackets of call location.state.itemHistory.forEach((item) => {})
    // you can access: 
    //      item.name       -- item's name
    //      item.quantity   -- item's quantity
    //      item.user       -- email of user who added item
    //      item.timeStamp  -- time at which item was added

    // NOTE: I'm not sure how item.timeStamp property is implemented; 
    //       odds are it's a JS object defined by Firebase; 
    //       a call like console.log(location.state.item.timeStamp) might help if you need information
    //       about its implementation

    // declare constant functions
    const location = useLocation();     // take information from state passed by useNavigate()
    const db = getFirestore();          // git information about our DB
    const navigate = useNavigate();     // route user to a different page

    const [error, setError] = useState(false);      // state for error in deleting items

    const quantityList = [];
    let total = 0;                                      // tally the total quantity
    let count =0;
    location.state.itemHistory.forEach((item) => {
        total += Number(item.quantity);
        quantityList.push(total);
        count += 1;
    })

    function makeArr(arrSize){
        var arr = [];
        //var step = (stopVal - startVal) / (index -1);
        for (var i = 0; i < arrSize; i++){
            arr.push(i);
        }
        return arr;
    }

    const xAxis = makeArr(count);
    

    const handleDelete = () => {                            // on clicking 'stop tracking': 
        location.state.itemHistory.forEach((item) => {      // for each document of 'item'
            const docRef = doc(db, "items", item.id);
            deleteDoc(docRef)                               // try to delete it from DB
              .then(() => {
                console.log("Item ", item.id, " deleted.")  // if it works, log it
              })
              .catch(error => {
                setError(true);                             // if it fails, set error to true
              })
        });
        if (! error) {
            navigate("/viewitem");                          // if there was no error, navigate to viewitem
        }                                                   // note that DB might not update in time ==> refresh
    }
    
    let title;                                  // set 'title' to item name or user email
    if (location.state.isItemSearch) {
        title = location.state.item.name;
    } else {
        title = location.state.item.user;
    }

    //var temp = title;    
    return(
        <>
            <h1>{title}'s History:</h1>
            {location.state.itemHistory.map((item) => {         // return a list of item names and quantities
                return (
                    <li key={item.id}>{item.name}    {item.quantity}</li>
                );
            })}
            <br></br>
            <b>Current Stock:</b>
            <p>{location.state.isItemSearch && total}</p>
            {location.state.isItemSearch && <button onClick={handleDelete}>Stop Tracking Item {location.state.item.name}</button>}
            {error && <span>ERROR DELETING</span>}
            <Plot
            data= {[
                {
                x: xAxis,
                y: quantityList,
                type: 'scatter',
                }]
            }
            layout={ {width: 600, height: 400, 
                title: "Inventory Count of " + title + " over time" ,
                yaxis: {title: {
                text: "Quantity"
                    }
                }   
            }}/>
            
        </>
        
    );
}






export default Item;