/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-closing-tag-location */

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { library } from '../reducers/library'
import { BookSearch } from './BookSearch'

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
    fetch('https://project-express-api-oitd5nga3a-lz.a.run.app/books')
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

      <main>
        {books
        && <section className="container">
          <h1>Welcome to your digital library!</h1>
          <div className="inputWrapper">
            <form onSubmit={bookSearchInput}>
              <input
                id="bookSearchInput"
                required
                type="text"
                placeholder="Search book title"
                value={input}
                onChange={(event) => setInput(event.target.value)} />
              <button type="submit" onClick={bookSearchInput}>Search</button>
            </form>
          </div>
          {bookSearchResult.length > 1 ? <BookSearch /> : ''}
        </section>}
      </main>

    )
  }
}