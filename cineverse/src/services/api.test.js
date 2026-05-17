import axios from 'axios'
import { fetchTrendingMovies, searchMovies } from './api.js'

const { get } = vi.hoisted(() => ({
  get: vi.fn(),
}))

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({ get })),
  },
}))

beforeEach(() => {
  get.mockReset()
})

test('fetches trending movies', async () => {
  get.mockResolvedValueOnce({ data: { results: [{ id: 1, title: 'Heat' }] } })

  await expect(fetchTrendingMovies()).resolves.toEqual([{ id: 1, title: 'Heat' }])
  expect(get).toHaveBeenCalledWith('/trending/movie/week')
})

test('searches movies with query', async () => {
  get.mockResolvedValueOnce({ data: { results: [{ id: 2, title: 'Dune' }] } })

  await expect(searchMovies('Dune')).resolves.toEqual([{ id: 2, title: 'Dune' }])
  expect(axios.create).toHaveBeenCalled()
  expect(get).toHaveBeenCalledWith('/search/movie', {
    params: { query: 'Dune', include_adult: false },
  })
})
