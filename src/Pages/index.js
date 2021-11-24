import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row, Select, Spin } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import Common from '../Components/Common'
import { BASE_URL } from '../utils/API'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const { Option } = Select

const Home = () => {
  const [songs, setSongs] = useState([])
  const [searchData, setSearchData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onChange = async (e) => {
    let checkData = e === undefined ? '' : e
    try {
      const response = await axios.get(
        `${BASE_URL}a/ra/songs.json?pattern=${checkData}`
      )
      setSearchData(response.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(true)
    }
  }

  function onBlur() {
    // console.log('blur')
  }

  function onFocus() {
    // console.log('focus')
  }

  const onSearch = async (e) => {
    setSearchText(e)
    try {
      const response = await axios.get(
        `${BASE_URL}a/ra/songs.json?pattern=${e}`
      )
      setSongs(response.data)
    } catch (error) {
      setIsLoading(true)
    }
  }

  return (
    <>
      <div className='my-nav-main'>
        <div className='my-nav-head'>
          <h1>Search your Favourite Music</h1>
        </div>
        <div className='my-nav-search'>
          <Select
            showSearch
            style={{ width: 350 }}
            placeholder='Search'
            optionFilterProp='children'
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            showArrow={false}
            allowClear
            size='large'
            // filterOption={(input, option) =>
            //   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
          >
            {songs.map((song) => (
              <Option value={song.title} key={song.id}>
                {song.title}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {isLoading ? (
        <p style={{ textAlign: 'center' }}>
          <Spin indicator={antIcon} />
        </p>
      ) : (
        <>
          {searchText.length > 0 && (
            <Row className='song-name-sec'>
              <Col span={16} offset={4}>
                <Row gutter={[16, 16]}>
                  {searchData.map((song) => (
                    <Common data={song} key={song.id} />
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
