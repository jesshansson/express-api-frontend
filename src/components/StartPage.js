/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-closing-tag-location */

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from 'utils/utils'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { library } from '../reducers/library'
import { BookSearch } from './BookSearch'
// import { PaigeWrapper } from './GlobalStyles'

export const StartPage = () => {
  const [books, setBooks] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const bookSearchResult = useSelector((store) => store.library.bookSearch)

  const bookSearchInput = (e) => {
    e.preventDefault();
    dispatch(library.actions.setBookSearch(input))
    setInput('')
  }

  useEffect(() => {
    setLoading(true)
    fetch(`${BASE_URL}/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => alert(error, 'error'))
      .finally(() => setLoading(false));
  }, [])

  if (loading) {
    return (
      <p>loading...</p>
    )
  } else {
    return (

      <StartWrapper>
        {books
        && <section className="container">
          <Title>Welcome to your digital library!</Title>
          <div className="inputWrapper">
            <form onSubmit={bookSearchInput}>
              <Input
                id="bookSearchInput"
                required
                type="text"
                placeholder="Search book title"
                value={input}
                onChange={(event) => setInput(event.target.value)} />
              <Button type="submit" onClick={bookSearchInput}>Search</Button>
            </form>
          </div>
          {bookSearchResult.length > 1 ? <BookSearch /> : ''}
        </section>}
        <StyledLink to="/toplist">★ Top rated books ★</StyledLink>
      </StartWrapper>

    )
  }
}
const StartWrapper = styled.section`
  background-color: #FFFBEB ;
  height: 100vh;
  margin: 30px;
`
const StyledLink = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  color: #577996;
  transition: ease-out 0.2s;

  &:hover {
    transform: scale(1.05);

  }
  `

const Button = styled.button`
  background-color: #B7C4CF;
  border-radius: 3px;
  border: 1px solid;
  padding: 10px ;
  cursor: pointer;
  box-shadow: 3px 2px 2px #B7C4CF; 
  transition: ease-out 0.2s;

  &:hover {
    transform: scale(1.05);
  }`

const Input = styled.input`
  padding: 10px;
  border: 1px solid black;
  box-shadow: 3px 2px 2px #B7C4CF;
  border-radius: 3px;
  transition: ease-out 0.2s;
  margin: 0px 20px 30px 0px;

&:hover {
  transform: scale(1.05);
}`

const Title = styled.h1`
  font-family: 'Caveat', cursive;
  font-size: 35px;
  color: #577996;
  //margin: 30px 0px`