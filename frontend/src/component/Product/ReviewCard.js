import React from 'react';
import { Rating } from "@material-ui/lab";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
    
    // CSS and Values for Stars
    const options = {
        readOnly: true,
        precision: 0.5,
        value: review.rating,
    }

    return (
        <div className='reviewCard'>
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className="reviewCardComment">{review.comment}</span>
            
        </div>
    )
}

export default ReviewCard
