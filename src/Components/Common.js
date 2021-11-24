import { Col } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Common = ({ data }) => {
  let checkPathName = window.location.pathname
  let checkRoute = checkPathName.includes('/artist/')

  return (
    <>
      <Col lg={6} md={6} sm={12} xs={12} key={data.id}>
        <div className='song-name-div'>
          <p>
            <b>Song Title:</b> {data.title}
          </p>
          <p>
            <b>Artist Name:</b>{' '}
            {!checkRoute ? (
              <Link to={`/artist/${data.artist.name}`}>{data.artist.name}</Link>
            ) : (
              data.artist.name
            )}
          </p>
        </div>
      </Col>
    </>
  )
}

export default Common
