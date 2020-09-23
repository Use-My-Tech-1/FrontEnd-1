import React, {useContext, useEffect} from 'react'
import Item from './Item'
import {UserContext} from '../context/userContext'
import {axiosWithAuth} from '../utils/axiosWithAuth'

function ItemGallery() {
  const {userData} = useContext(UserContext)
  const [user, setUser] = React.useState([])
  const Welcome = userData.message ? userData.message : 'Welcome'

  useEffect(() => {
    axiosWithAuth()
      .get('/api/items')
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <div className='centerWrapper'>
        <h1 className='welcome--name'>{Welcome}</h1>
        <div className='rental-items'>
          {user?.map((item) => (
            <Item key={item.id} data={item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ItemGallery
