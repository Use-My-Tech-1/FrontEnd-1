import React, {useEffect} from "react";
import axios from 'axios';

function Availability({item}) {
  const [description, setDescription] = React.useState('')
  useEffect(() => {
      const ItemDescription = () => {
          return axios.get(`https://use-tech.herokuapp.com/api/items/${item}`)
          .then((res)=> setDescription(res.data.description))
          .catch((err) => console.log(err))
      }
      ItemDescription()
  }, [item])
  return (
    <div>
      <p className="item-description">{description}</p>
    </div>
  );
}

export default Availability;