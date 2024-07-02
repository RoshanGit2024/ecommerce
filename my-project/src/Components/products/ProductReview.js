import React, { useState } from 'react'
import Avatar from '../user/Avatar'
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";

function ProductReview({ reviews }) {
  const [showReviews, setShowReviews] = useState(false)

  const toggleReview = () => {
    setShowReviews(!showReviews)
  }
  return (
    <div className="reviews w-75">
      <h3 className='mx-5'>Other's Reviews:</h3>
      <hr />
      {reviews && reviews.slice(0, showReviews ? reviews.length : 1).map(review => (
        <div key={review._id} className="review-card my-3 mx-5 border-gray-700">
          <div className="rating-outer">
            <div className="rating-inner" style={{ width: `${review.rating / 5 * 100}%` }}></div>
          </div>
          <span className="review-time">{String(review.postedAt).substring(0, 10)}</span>
          {review.user ? <div className='name-profle'>
            {review.user.avatar && review.user.avatar ? (<img src={review.user.avatar} alt={review.user.name} className="profile-pic" />) : (
              <Avatar style={{ height: '45px', width: '45px' }} name={review.user.name} />
            )}
            <p className="review_user font-bold ml-2">{review.user.name}</p>
          </div> : <div><span className='text-danger'>user not availabe</span></div>}
          <p className="review_comment mt-2">{review.comment}</p>
          <hr />
        </div>
      ))}
      {reviews.length > 1 && (
        <button onClick={toggleReview} className='btn btn-danger mx-5 my-2'>
          {showReviews ? 'show less' : 'show all reviews'}{showReviews ? <RxEyeClosed size={25} className='mx-1' /> : <RxEyeOpen size={25} className='mx-1' />}
        </button>
      )}
    </div>
  )
}

export default ProductReview
