import React, {useContext, useEffect} from 'react'
import {IoIosShareAlt} from 'react-icons/io'
import {UserContext} from '../context/userContext'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {Link, useHistory,
  Route,
  Switch,
  useRouteMatch} from 'react-router-dom'
import Availability from '../components/Availability'

function ItemCard(props) {
  const {userData} = useContext(UserContext)
  const [data, setData] = React.useState({})
  const history = useHistory()
  const { path, url } = useRouteMatch();


  const deleteItem = async () => {
    try {
      const toDelete = await axiosWithAuth().delete(
        `/api/owner/items/${props.match.params.id}`
      )
      const response = toDelete.data
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    history.push('/')
  }

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/items/${props.match.params.id}`)
      .then((res) => {
        setData(res.data)
        console.log(res);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const rentItem = async () => {
    try {
      const toRent = await axiosWithAuth().post(
        `/api/items/${props.match.params.id}`
      )
      const response = toRent.data
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    history.push('/')
  }

  const editInformation = () => {
    if (userData.owner && userData.userId === props.location.state.owner_id) {
      return (
        <div className='item-card-update-items'>
          <Link
            to={{
              pathname: '/dashboard',
              state: userData.userId,
            }}
          >
            <button className='item-card-edit-btn'>Edit</button>
          </Link>

          <button onClick={deleteItem} className='item-card-delete-btn'>
            Delete
          </button>
        </div>
      )
    }
  }

  return (
    <>
      <div className='centerWrapper'>
        <div className='item-heading'>
          <div className='item-heading-title'>{data.itemName}</div>
          <div className='item-heading-sharebtn'>
            <button className='item-share-btn'>
              <IoIosShareAlt className='item-share-icon' />
              Share
            </button>
            <button onClick={rentItem} className='item-rent-btn'>
              Rent Now
            </button>
          </div>
        </div>
        <div className='item-content'>
          <div className='item-image-container'>
            <img src={data.imageUrl} alt='' />
          </div>
          <section>
            <div className='item-info-sidebar'>
              <div className='item-rental-container'>
                <div className='item-sidebar-box'>
                  <h1 className='item-rental-sidebar-title'>
                    {data.rentalTerm}
                  </h1>
                  <div className='item-sidebar-box'>
                    <span className='item-rental-cost'>{data.price}</span>
                    <span className='item-rental-term'>
                      {' '}
                      / {data.rentalTerm}
                    </span>
                  </div>
                </div>
                <div className='item-sidebar-box-owner'>
                  <div className='item-sidebar-box '>
                    <h1 className='item-rental-sidebar-title'>
                      MEET THE OWNER
                    </h1>
                    <div className='avatarbox'>
                      <img
                        src=' https://firebasestorage.googleapis.com/v0/b/rentitems-prod.appspot.com/o/users%2FyyI5LG8uO0VbtOT1xnN4Qj8IPNB3?alt=media&token=bb3655e8-15fc-4a40-ac3a-28bd330ca9d0'
                        className='item-rental-avatar'
                        alt='owner avatar'
                      />
                      <div className='avatar-info'>
                        <h3>John Doe</h3>
                        <h3> 30 reviews</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='item-sidebar-box-last'>
                  <h1 className='item-rental-sidebar-title'>ABOUT THIS ITEM</h1>
                  <div className='item-sidebar-box'>
                    <div className='item-pickup-info'>
                      <img
                        src='https://rentitems.com/assets/images/icons/delivery.svg'
                        alt='delivery icon'
                      />
                      <Link to="/">Check availability </Link>
                    </div>
                    <div className='item-pickup-info'>
                      <img
                        src='https://rentitems.com/assets/images/icons/surface1.svg'
                        alt='delivery icon'
                      />
                      <p>Learn more</p>
                    </div>
                    {editInformation()}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section>
          <div className='item-description'>
            <Link to={`${url}/description`}>ITEM DESCRIPTION</Link>
            <p><Availability /></p>
            <Switch>
        <Route path={`${path}/description`}>
          <Availability item={props.match.params.id} />
        </Route>
        </Switch>
          </div>
          <div className='item-review'>
            <h3>ITEM REVIEWS</h3>
            <p>There are no reviews for this product.</p>
          </div>
        </section>
      </div>
    </>
  )
}

export default ItemCard
