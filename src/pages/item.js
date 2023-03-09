import { useLocation } from "react-router-dom"

function Item() {
    const location = useLocation();
    console.log(location.state.item);
}

export default Item;