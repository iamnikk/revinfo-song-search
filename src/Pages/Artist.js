import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row, Spin } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Common from '../Components/Common'
import { BASE_URL } from '../utils/API'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Artist = () => {
  const [artistSongs, setArtistSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { artistName } = useParams()

  const getArtistDetail = async () => {
    let temp = artistName.split(' ')
    temp = temp.join(',')
    try {
      const response = await axios.get(
        `${BASE_URL}a/ra/songs/byartists.json?artists=${temp}`
      )
      setArtistSongs(response.data)
      setIsLoading(false)
    } catch (err) {}
  }

  useEffect(() => {
    getArtistDetail()
  })

  return (
    <>
      {isLoading ? (
        <p style={{ textAlign: 'center' }}>
          <Spin indicator={antIcon} />
        </p>
      ) : (
        <Row className='song-name-sec'>
          <Col span={16} offset={4}>
            <Row gutter={[16, 16]} className=''>
              {artistSongs.map((artistSong) => (
                <Common data={artistSong} key={artistSong.id} />
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </>
  )
}

export default Artist
