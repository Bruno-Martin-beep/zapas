import { useSelector } from "react-redux";
import { selectShoeList } from "../../features/shoeListSlice";
import "./subTotal.scss";

const SubTotal = () => {
  const bag = useSelector(selectShoeList);
  return (
    <div className="subtotal-cont">
      <p>SubTotal</p>
      <p>${bag.reduce((prev, shoe) => prev + shoe.price, 0)}</p>
    </div>
  );
};

export default SubTotal;
