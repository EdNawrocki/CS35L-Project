import { useLocation } from "react-router-dom"

function Item() {
    const location = useLocation();

    let total = 0;
    location.state.itemHistory.map((item) => {
        total += item.quantity;
    })
    
    return(
        <div>
            <h1>{location.state.item.name}'s History:</h1>
            {location.state.itemHistory.map((item) => {
                return (
                    <li>{item.name}    {item.quantity}</li>
                );
            })}
            <p>{total}</p>
        </div>
    );
}

export default Item;