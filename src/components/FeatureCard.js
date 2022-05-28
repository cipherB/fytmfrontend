import React from 'react'

const FeatureCard = ({icon, feature, description}) => {
  return (
    <div className='feature-card' >
      <div className='feature-card-icon'>
        {icon}
      </div>
      <div className='feature-card-contain'>
        <p className='feature-card-title' >{feature} </p>
        <p className='feature-card-description' >{description} </p>
      </div>
    </div>
  )
}

export default FeatureCard