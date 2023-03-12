import { useLocation, useNavigate } from "react-router-dom"
import { getFirestore, doc, deleteDoc } from "firebase/firestore"
import { useState ,React } from "react"
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
    let count =0;                                       //tally number of index
    location.state.itemHistory.forEach((item) => {
        total += Number(item.quantity);
        quantityList.push(total);
        count += 1;
    })

    function makeArr(arrSize){      //helper function to generate list for xaxis values
        var arr = [];
        for (var i = 0; i < arrSize; i++){
            arr.push(i);
        }
        return arr;
    }

    const xAxis = makeArr(count);   //create xaxis list
    

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

    return(
        <>
            <h1 className="itempage_h">{title}'s History: </h1>
            <table className="items">
                 <tr>
                     <th className = "col third">Item</th>
                     <th className = "col two_third">Changelog</th>
                     <th className = "col row">{location.state.isItemSearchUser && "User"}</th>
                 </tr>
            </table>
            {location.state.itemHistory.map((item) => {         // return a list of item names and quantities
                return (
                    <table className="items" key={item.id}>
                        <tr>
                        <td className="col third">{item.name}</td>    
                        <td className="col two_third">{item.quantity}  </td>  
                        <td className="col row">{location.state.isItemSearch && item.user}</td>
                        </tr></table>
                );
            })}
            <br></br>
            <table className="itempage_h">
            {location.state.isItemSearch &&<b>Current Stock: </b>}
            
            {location.state.isItemSearch && total}
            </table>
            {location.state.isItemSearch && <button onClick={handleDelete}>Stop Tracking Item {location.state.item.name}</button>}
            {error && <span>ERROR DELETING</span>}
            {location.state.isItemSearch && <Plot    //plot data if search by item, else(search by user) don't show plot
            data= {[
                {
                x: xAxis,
                y: quantityList,
                type: 'scatter',
                }]
            }
            layout={ {width: 700, height: 450, 
                title: "Inventory Count of " + title + " over time" ,
                yaxis: {title: {
                text: "Total Quantity"
                    }
                },
                xaxis: {title: {
                    text: "Time"
                        }
                    }     
            }}/>}
            
        </>
        
    );
}

export default Item;