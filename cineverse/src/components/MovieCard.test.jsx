import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MovieCard from './MovieCard.jsx'

test('renders movie title and rating', () => {
  render(
    <MemoryRouter>
      <MovieCard
        movie={{
          id: 12,
          title: 'Arrival',
          poster_path: '/arrival.jpg',
          vote_average: 8.2,
          release_date: '2016-11-11',
        }}
      />
    </MemoryRouter>,
  )

  expect(screen.getByRole('link', { name: /arrival poster arrival/i })).toHaveAttribute(
    'href',
    '/movie/12',
  )
  expect(screen.getByText('8.2')).toBeInTheDocument()
})
