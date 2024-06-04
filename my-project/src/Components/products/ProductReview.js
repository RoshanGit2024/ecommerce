import React from 'react'

function ProductReview({reviews}) {
  return (
    <div className="reviews w-75">
    <h3 className='mx-5'>Other's Reviews:</h3>
    <hr />
    {reviews && reviews.map(review=>(
         <div key={review._id} className="review-card my-3 mx-5 border-gray-700">
         <div className="rating-outer">
           <div className="rating-inner" style={{width:`${review.rating/5*100}%`}}></div>
         </div>
         <span className="review-time">{String(review.postedAt).substring(0,10)}</span>
         <div className='name-profle'>
         <img src={review.user.avatar} alt={review.user.name} className="profile-pic" />
         <p className="review_user font-bold">{review.user.name}</p>
         </div>
         <p className="review_comment mt-2">{review.comment}</p>
         <hr />
    </div>
    ))}
  </div>
  )
}

export default ProductReview
