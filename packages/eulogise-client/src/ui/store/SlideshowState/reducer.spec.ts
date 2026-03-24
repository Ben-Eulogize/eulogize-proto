import { SlideshowReducer } from './reducer'
import {
  MOCK_SLIDESHOW_1,
  createMockSlideshowData,
  createMockTitleSlide,
} from '@eulogise/mock'
import {
  ResourceFileStatus,
  ISlideshowData,
  ISlide,
  SlideshowActionTypes,
} from '@eulogise/core'
import { SlideshowInitialState } from './initialState'

describe('SlideshowState - Reducer', () => {
  let results: any

  describe('UPDATE_SLIDE_BY_INDEX', () => {
    const slide1: ISlide = createMockTitleSlide('slide 1')
    const slide2: ISlide = createMockTitleSlide('slide 2')
    const slide3: ISlide = createMockTitleSlide('slide 3')
    const slideshowData: ISlideshowData = createMockSlideshowData({
      slides: [slide1, slide2, slide3],
    })
    const updatedSlide: ISlide = createMockTitleSlide('updated slide 1')
    const slideIndex: number = 1

    beforeEach(() => {
      results = SlideshowReducer(
        {
          ...SlideshowInitialState,
          activeItem: slideshowData,
        },
        {
          type: SlideshowActionTypes.UPDATE_SLIDE_BY_INDEX,
          payload: {
            slide: updatedSlide,
            slideIndex,
          },
        },
      )
    })

    it('should update the slides', () => {
      expect(results.activeItem.content.slides).toEqual([
        slide1,
        updatedSlide,
        slide3,
      ])
    })
  })

  describe('FETCH_SLIDESHOWS_BY_CASE_ID', () => {
    beforeEach(() => {
      results = SlideshowReducer(
        { ...SlideshowInitialState, isFetching: true },
        {
          type: SlideshowActionTypes.FETCH_SLIDESHOWS_BY_CASE_ID,
        },
      )
    })

    it('should set isFetching to true', () => {
      expect(results.isFetching).toEqual(true)
    })
  })

  describe('FETCH_SLIDESHOWS_BY_CASE_ID_SUCCESS', () => {
    const items: Array<ISlideshowData> = [MOCK_SLIDESHOW_1]

    beforeEach(() => {
      results = SlideshowReducer(SlideshowInitialState, {
        type: SlideshowActionTypes.FETCH_SLIDESHOWS_BY_CASE_ID_SUCCESS,
        payload: { items },
      })
    })

    it('should update "items" and "activeItem"', () => {
      expect(results.items).toEqual(items)
      expect(results.activeItem).toEqual(MOCK_SLIDESHOW_1)
      expect(results.isFetching).toEqual(false)
    })
  })

  describe('FETCH_SLIDESHOWS_BY_CASE_ID_FAILED', () => {
    beforeEach(() => {
      results = SlideshowReducer(
        { ...SlideshowInitialState, isFetching: true },
        {
          type: SlideshowActionTypes.FETCH_SLIDESHOWS_BY_CASE_ID_FAILED,
        },
      )
    })

    it('should set isFetching to false', () => {
      expect(results.isFetching).toEqual(false)
    })
  })

  describe('GENERATE_SLIDESHOW', () => {
    const slideshow1: ISlideshowData = createMockSlideshowData({
      id: 'slideshow-1',
    })
    const slideshow2: ISlideshowData = createMockSlideshowData({
      id: 'slideshow-2',
    })

    beforeEach(() => {
      results = SlideshowReducer(
        {
          ...SlideshowInitialState,
          items: [slideshow1, slideshow2],
          activeItem: slideshow1,
        },
        {
          type: SlideshowActionTypes.GENERATE_SLIDESHOW,
        },
      )
    })

    describe('file status', () => {
      it('should be "PROCESSING"', () => {
        expect(results.activeItem.fileStatus).toEqual(
          ResourceFileStatus.PROCESSING,
        )
        expect(results.items[0].fileStatus).toEqual(
          ResourceFileStatus.PROCESSING,
        )
      })
    })
  })

  describe('GENERATE_SLIDESHOW_SUCCESS', () => {
    const slideshow1: ISlideshowData = createMockSlideshowData({
      id: 'slideshow-1',
    })
    const slideshow2: ISlideshowData = createMockSlideshowData({
      id: 'slideshow-2',
    })

    beforeEach(() => {
      results = SlideshowReducer(
        {
          ...SlideshowInitialState,
          items: [slideshow1, slideshow2],
          activeItem: slideshow1,
        },
        {
          type: SlideshowActionTypes.GENERATE_SLIDESHOW_SUCCESS,
        },
      )
    })

    describe('file status', () => {
      it('should be "PROCESSING"', () => {
        expect(results.activeItem.fileStatus).toEqual(
          ResourceFileStatus.PROCESSING,
        )
        expect(results.items[0].fileStatus).toEqual(
          ResourceFileStatus.PROCESSING,
        )
      })
    })
  })

  describe('GENERATE_SLIDESHOW_FAILED', () => {
    const slideshow1: ISlideshowData = createMockSlideshowData({
      id: 'slideshow-1',
    })
    const slideshow2: ISlideshowData = createMockSlideshowData({
      id: 'slideshow-2',
    })

    beforeEach(() => {
      results = SlideshowReducer(
        {
          ...SlideshowInitialState,
          items: [slideshow1, slideshow2],
          activeItem: slideshow1,
        },
        {
          type: SlideshowActionTypes.GENERATE_SLIDESHOW_FAILED,
        },
      )
    })

    describe('file status', () => {
      it('should be "FAILED"', () => {
        expect(results.activeItem.fileStatus).toEqual(ResourceFileStatus.FAILED)
        expect(results.items[0].fileStatus).toEqual(ResourceFileStatus.FAILED)
      })
    })
  })
})
