import React from 'react'
import {GoLocation} from 'react-icons/go'
import {FaDollarSign} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Item({data}) {
  const SmallerPreview = (text, max) => {
    const smaller =
      text && text.length > max
        ? text.slice(0, max).split(' ').slice(0, -1).join(' ')
        : text

    return smaller
  }

  return (
    <>
      <div className='item'>
        <div className='product'>
          <img src={data.imageUrl} alt='' className='item--product-image' />
          <div className='item-location-info'>
            <GoLocation className='item-location-icon' />
            <h2 className='item-location'>
              {SmallerPreview(data.itemName, 40)}
            </h2>
          </div>
        </div>
        <div className='item-infomation'>
          <div className='item-price'>
            <span className='item-dollar-icon'>
              <FaDollarSign />
            </span>
            {data.price}
            <span className='rental-term'>/{`${data.rentalTerm}`}</span>
          </div>
          <p>{SmallerPreview(data.description, 50)}...</p>
          <div className='items-buttons'>
            <button className='item-rent-btn'>
              <Link
                to={{
                  pathname: `/item/${data.id}`,
                  state: data,
                }}
              >
                Rent Now
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item
