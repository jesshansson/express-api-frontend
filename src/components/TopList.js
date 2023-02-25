import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from 'utils/utils'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const TopList = () => {
  const book = useSelector((store) => store.library.bookSearch)
  const [bookList, setBookList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${BASE_URL}/books/top-rated`)
      .then((res) => res.json())
      .then((data) => setBookList(data))
      .catch((error) => alert(error, 'error'))
      .finally(() => setLoading(false));
  }, [book])

  if (loading) {
    return (
      <p> Loading...</p>
    )
  } else {
    return (
      <TopRatedWrapper>
        <section className="results">
          <Title>Top rated books</Title>
          {bookList.length > 0 && bookList.map((item) => {
            return (
              <article className="searchWrapper" key={item.isbn}>
                <BookDetails className="details">
                  <BookTitle>{item.title}</BookTitle>
                  <p>Written by: {item.authors.split('-').join(', ')}</p>
                  <p>Rating: {item.average_rating} <span>&#9733;</span></p>
                  <p>Pages: {item.num_pages}</p>
                  <p>Language: {item.language_code}</p>
                </BookDetails>

              </article>
            )
          })}
        </section>
        <StyledLink to="/">⇽ Go back</StyledLink>
      </TopRatedWrapper>

    )
  }
}

const TopRatedWrapper = styled.section`
margin: 30px;`

const BookTitle = styled.h3`
`

const BookDetails = styled.div`
margin: 40px 0px`

const Title = styled.h1`
  font-family: 'Caveat', cursive;
  font-size: 35px;
  color: #577996;
  margin: 0px`

const StyledLink = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  color: #577996;
  transition: ease-out 0.2s;

  &:hover {
    transform: scale(1.05);

  }
  `