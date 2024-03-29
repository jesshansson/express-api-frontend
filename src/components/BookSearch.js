/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from 'utils/utils'
import styled from 'styled-components'

export const BookSearch = () => {
  const book = useSelector((store) => store.library.bookSearch)
  const [bookList, setBookList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${BASE_URL}/books/title/${book}`)
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
      <SearchWrapper>
        <section className="results">
          {bookList.length > 0 && bookList.map((item) => {
            return (
              <article className="searchWrapper" key={item.isbn}>
                <div className="details">
                  <BookTitle>{item.title}</BookTitle>
                  <p>Written by: {item.authors.split('-').join(', ')}</p>
                  <p>Rating: {item.average_rating} <span>&#9733;</span></p>
                  <p>Pages: {item.num_pages}</p>
                  <p>Language: {item.language_code}</p>
                </div>
              </article>
            )
          })}
        </section>
      </SearchWrapper>
    )
  }
}

const SearchWrapper = styled.section`
  background-color: #FFFBEB ;
  height: 100%;

`

const BookTitle = styled.h3`
`