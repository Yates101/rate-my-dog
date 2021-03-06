import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Header from './Header'
import styled from 'styled-components'
import ReviewForm from './ReviewForm'

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow: scroll;

  &:last-child {
    background: #000;
  }  
`

const Main = styled.div`
  padding-left: 50px;
`

const Dog = (props) => {
  const [dog, setDog] = useState({})
  const [review, setReview] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const slug = props.match.params.slug
    
    axios.get(`/api/v1/dogs/${slug}`)
    .then( resp => {
      setDog(resp.data)
      setLoaded(true)
    })
    .catch( resp => console.log(resp))
  }, [])

  const handleChange = (e) => {
    e.preventDefault()

    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const csrfToken = document.querySelector('[name=csrf-token').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    
    const dog_id = dog.data.id
    axios.post('/api/v1/reviews', {review, dog_id})
    .then( resp => {
      debugger
    })
    .catch( resp => {})
  }

  return (
    <Wrapper>
      { 
        loaded &&
        <Fragment>
          <Column>
            <Main>
              <Header 
                attributes={dog.data.attributes}
                reviews={dog.included}
              />
              <div className="reviews"></div>
            </Main>
          </Column>
          <Column>
            <ReviewForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              attributes={dog.data.attributes}
              review={review}
            />
          </Column>
        </Fragment>
      }
    </Wrapper>
  )
}

export default Dog
