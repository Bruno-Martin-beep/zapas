import React from 'react'
import { useSelector } from 'react-redux';
import { selectCurrentShoe } from '../../features/modelsListSlice';
import { selectShoeList } from '../../features/shoeListSlice';

const AddToBag = ({ handleDone }) => {
  const bag = useSelector(selectShoeList);
  const currentModel = useSelector(selectCurrentShoe);

  return (
    <div className="Add-to-bag" onClick={() => handleDone()}>
        <h3>{bag.some((shoe) => shoe.index === currentModel?.index)
          ? "Save"
          : "Add to bag"}</h3>
      </div>
  )
}

export default AddToBag