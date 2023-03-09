import { useLocation } from "react-router-dom"

function Item() {
    const location = useLocation();
    
    return(
        <div>
            <h1>{location.state.item.name}'s History:</h1>
            {location.state.itemHistory.map((item) => {
                return (
                    <li>{item.name}    {item.quantity}</li>
                );
            })}
        </div>
    );
}

export default Item;