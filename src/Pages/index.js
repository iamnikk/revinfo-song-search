import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Input, Row, Col, Spin } from 'antd'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'
import { BASE_URL } from '../utils/API'
import Common from '../Components/Common'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Home = () => {
  const [songs, setSongs] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isFound, setIsFound] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const updateSearchText = (e) => {
    setSearchText(e.target.value)
  }

  const searchSongs = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}a/ra/songs.json?pattern=${searchText}`
      )
      setSongs(response.data)
      setIsLoading(false)
      if (response.data.length > 0) {
        setIsFound(false)
      }
    } catch (error) {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    searchSongs()
  }, [searchText])

  return (
    <>
      <div className='my-nav-main'>
        <div className='my-nav-head'>
          <h1>Search your Favourite Music</h1>
        </div>
        <div className='my-nav-search'>
          <Input
            size='large'
            placeholder='search'
            prefix={<SearchOutlined />}
            onChange={updateSearchText}
            style={{ width: '350px' }}
          />
        </div>
      </div>

      {isLoading ? (
        <p style={{ textAlign: 'center' }}>
          <Spin indicator={antIcon} />
        </p>
      ) : (
        <>
          {songs.length <= 0 && searchText.length == 0 && (
            <p style={{ textAlign: 'center' }}>We have 10,000+ Songs</p>
          )}
          {songs.length <= 0 && !isFound && searchText.length > 0 ? (
            <p style={{ textAlign: 'center' }}>No result found</p>
          ) : (
            <Row className='song-name-sec'>
              <Col span={16} offset={4}>
                <Row gutter={[16, 16]} className=''>
                  {songs.map((song) => (
                    <Common data={song} />
                  ))}
                </Row>
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  )
}

export default Home
