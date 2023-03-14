import { useLocation, useNavigate } from "react-router-dom"
import { getFirestore, doc, deleteDoc } from "firebase/firestore"
import { useState ,React } from "react"
import Chart from 'chart.js/auto'
import Plot from 'react-plotly.js'
import styled from 'styled-components';

const Container = styled.div`

display: grid;
grid-template-rows:  1fr 15vh;
grid-template-columns:50vw 1fr;
grid-template-areas:
"H G"
"S S";
gap: 10px;

.History{ grid-area: H; background-color: #094CF8C2; color: #FFFFFF; }
.HistoryText {margin-left: 20px; font-family: Georgia, serif; }
.Graph{grid-area: G;}

.Stop{grid-area: S;}

button.Stop {
    width: 100%;
    height: 15vh;
    border: none;
    background-color: #f7b308;
    color: white;
    font-weight: bold;
    cursor: pointer;
    align-items: center;
}

button.Stop:hover {background-color: #f7db08;}

`

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
            <Container>
                <div className="History"><div className="HistoryText">
                    <h1>{title}&apos;s History:</h1>
            {location.state.itemHistory.map((item) => {         // return a list of item names and quantities
                return (
                    <li key={item.id}>{item.name}    {item.quantity}    {location.state.isItemSearch && item.user}</li>
                );
            })}
            <br></br>
            {location.state.isItemSearch && <b>Current Stock:</b>}
                    <p>{location.state.isItemSearch && total}</p>
                </div></div>
            <div className="Stop">{location.state.isItemSearch && <button className="Stop" onClick={handleDelete}><h1>Stop Tracking Item {location.state.item.name}</h1></button>}
            {error && <span>ERROR DELETING</span>}</div>
                
                <div className="Graph">
                {location.state.isItemSearch && <Plot
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
                },
                xaxis: {title: {
                    text: "Time"
                        }
                    }   
                        }} />}
                    </div>
            </Container>
        </>
        
    );
}






export default Item;