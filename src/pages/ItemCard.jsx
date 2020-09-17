import React from 'react'
import {IoIosShareAlt} from 'react-icons/io'

function ItemCard() {
  return (
    <>
      <div className='centerWrapper'>
        <div className='item-heading'>
          <div className='item-heading-title'>Yamaha</div>
          <div className='item-heading-sharebtn'>
            <button className='item-share-btn'>
              <IoIosShareAlt className='item-share-icon' />
              Share
            </button>
            <button className='item-rent-btn'>Rent Now</button>
          </div>
        </div>
        <div className='item-content'>
          <div className='item-image-container'>
            <img
              src='https://cdnm2-kraftmusic.netdna-ssl.com/media/catalog/product//y/a/yam-p125b_ipad.jpg'
              alt=''
            />
          </div>
          <section>
            <div className='item-info-sidebar'>
              <div className='item-rental-container'>
                <div className='item-sidebar-box'>
                  <h1 className='item-rental-sidebar-title'>RENTAL RATE</h1>
                  <div className='item-sidebar-box'>
                    <span className='item-rental-cost'>$69</span>
                    <span className='item-rental-term'> / month</span>
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
                      <p>Check availability </p>
                    </div>
                    <div className='item-pickup-info'>
                      <img
                        src='https://rentitems.com/assets/images/icons/surface1.svg'
                        alt='delivery icon'
                      />
                      <p>Learn more</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section>
          <div className='item-description'>
            <h3>ITEM DESCRIPTION</h3>
            <p>
              Clavinova Yamaha CLP-625 bought on March 2020. It includes Yamaha
              bench and headphones HPH150 B
            </p>
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
