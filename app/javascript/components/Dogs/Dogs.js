import React, { useState,  useEffect, Fragment } from 'react'
import axios from 'axios'
import Dog from './Dog'
import styled from 'styled-components'

const Home = styled.div`
  text-align:center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`
const Header = styled.div`
padding:100px 100px 10px 100px;
  
h1 {
    font-size:42px;
}
`

const Subheader = styled.div`
  font-weight: 300;
  font-size: 26px;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;

  div {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
`

const Dogs = () => {
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    axios.get('/api/v1/dogs.json')
      .then( resp => setDogs(resp.data.data))
      .catch( resp => console.log(resp) )
  }, [dogs.length])

  const grid = dogs.map( item => {
    return (
      <Dog 
      key={item.attributes.name}
      attributes={item.attributes}
      />
    )
  })
  return (
    <Home>
      <Header>
        <h1>RateMyDog</h1>
        <Subheader>Honest, unbiased dog reviews.</Subheader>
      </Header>
      <Grid>
        {grid}
      </Grid>   
    </Home>
  )
}

export default Dogs
