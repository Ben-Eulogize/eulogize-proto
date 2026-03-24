import { themeModel } from '../../../src/ts/database'
import expect from 'expect'
import { MOCK_THEME_DATA_1 } from './mock/mockTheme'

describe('ThemeModel', () => {
  let results: any
  let themeId: string
  const mockTheme = MOCK_THEME_DATA_1
  beforeEach(async () => {
    results = await themeModel.create(mockTheme)
    themeId = results.id
  })

  describe('create', () => {
    it('should create the theme and return the theme with id', () => {
      expect(results).toEqual({
        ...mockTheme,
        id: expect.anything(),
        updatedAt: expect.anything(),
        createdAt: expect.anything(),
      })
    })
  })

  describe('getAll', () => {
    beforeEach(async () => {
      results = await themeModel.getAll()
    })

    it('should return all themes', () => {
      console.log('Length', results.length)
      expect(results.length).toBeGreaterThan(1)
    })
  })

  describe('findById', () => {
    beforeEach(async () => {
      results = await themeModel.findById(themeId)
    })

    it('should return created theme', () => {
      expect(results).toEqual({
        ...mockTheme,
        id: themeId,
        updatedAt: expect.anything(),
        createdAt: expect.anything(),
      })
    })
  })

  describe('updateById', () => {
    const categories = ['new-mock-category-1', 'new-mock-category-2']
    beforeEach(async () => {
      results = await themeModel.updateById(themeId, {
        ...mockTheme,
        categories,
      })
    })

    it('should return updated theme', () => {
      const { updatedAt, createdAt, ...assertResults } = results
      expect(assertResults).toEqual({
        ...mockTheme,
        id: themeId,
        categories,
      })
    })
  })
})
