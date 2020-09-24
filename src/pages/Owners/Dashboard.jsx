import React, {useEffect} from 'react'
import RentedItems from './RentedItems'
import MyItems from './MyItems'
import {axiosWithAuth} from '../../utils/axiosWithAuth'

function Dashboard(props) {
  const [items, setItems] = React.useState()

  //   console.log(props);

  useEffect(() => {
    console.log('userEffect')
    axiosWithAuth()
      .get('api/owner/items')
      .then((res) => {
        setItems(res.data)
      })
      .catch((error) => console.error(error))
  }, [])

  console.log(items)
  const itemsAvailable = items?.filter((item) => item.available === false)

  return (
    <div>
      <div className='centerWrapper '>
        <div className='dashboard-title'>
          <h2>Dashboard</h2>
        </div>
        <div className='dashboard'>
          <div className='dashboard-items'>
            {items?.map((item) => (
              <MyItems key={item.id} data={item} />
            ))}
          </div>
          <div className='dashboard-sidebar'>
            <h2>Rented Items</h2>
            {itemsAvailable?.map((item) => (
              <RentedItems key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
