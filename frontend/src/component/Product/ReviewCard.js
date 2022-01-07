import React from 'react';
import RatingStar from "react-rating-stars-component";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
    
    // CSS and Values for Stars
    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 18 : 20,
        value: review.rating,
        isHalf: true,
    }

    return (
        <div className='reviewCard'>
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <RatingStar {...options} />
            <span className="reviewCardComment">{review.comment}</span>
            
        </div>
    )
}

export default ReviewCard
