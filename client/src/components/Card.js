import React from 'react'
import PropTypes from 'prop-types'

const Card = ({item}) => {
	return (
		<div className="card">
			<div className="user">
        <img className="avatar" src={item.profile_image_url} alt="A"></img>
        <div className="name">@{item.screen_name}</div>
      </div>
      <div className="info">
        {/* <p className="date">{item.created_at}</p> */}
        <p className="tweet">{item.text}</p>
      </div>
		</div>
	)
}

Card.propTypes = {

}

export default Card
