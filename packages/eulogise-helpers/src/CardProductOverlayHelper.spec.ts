import { CardProductOverlayHelper } from './CardProductOverlayHelper'

describe('CardProductOverlayHelper', () => {
  let results: any
  describe('getOverlayBackground()', () => {
    const color = '#abc'

    describe('topHeightPercent === 0', () => {
      const overlayFadePosition: { top: number; bottom: number } = {
        top: 0,
        bottom: 80,
      }
      const overlayEndPosition: { top: number; bottom: number } = {
        top: 0,
        bottom: 90,
      }
      beforeEach(() => {
        results = CardProductOverlayHelper.getOverlayFadeBackground({
          color,
          overlayFadePosition,
          overlayEndPosition,
        })
      })

      it('should return a correct background', () => {
        expect(results).toEqual(
          `linear-gradient(to bottom,  #abc 0%, #abc 88.88888888888889% , transparent 100%)`,
        )
      })
    })

    describe('bottomHeightPercent === 100', () => {
      const overlayFadePosition: { top: number; bottom: number } = {
        top: 10,
        bottom: 100,
      }
      const overlayEndPosition: { top: number; bottom: number } = {
        top: 20,
        bottom: 100,
      }
      beforeEach(() => {
        results = CardProductOverlayHelper.getOverlayFadeBackground({
          color,
          overlayFadePosition,
          overlayEndPosition,
        })
      })

      it('should return a correct background', () => {
        expect(results).toEqual(
          `linear-gradient(to bottom,  ${color} -12.5%, ${color} 100% )`,
        )
      })
    })

    describe('topHeightPercent === 0, bottomHeightPercent === 100', () => {
      const overlayFadePosition: { top: number; bottom: number } = {
        top: 10,
        bottom: 100,
      }
      const overlayEndPosition: { top: number; bottom: number } = {
        top: 20,
        bottom: 100,
      }
      beforeEach(() => {
        results = CardProductOverlayHelper.getOverlayFadeBackground({
          color,
          overlayFadePosition,
          overlayEndPosition,
        })
      })

      it('should return a correct background', () => {
        expect(results).toEqual(
          `linear-gradient(to bottom,  ${color} -12.5%, ${color} 100% )`,
        )
      })
    })

    describe('topHeightPercent > 0', () => {
      const overlayFadePosition: { top: number; bottom: number } = {
        top: 20,
        bottom: 80,
      }
      const overlayEndPosition: { top: number; bottom: number } = {
        top: 10,
        bottom: 90,
      }
      beforeEach(() => {
        results = CardProductOverlayHelper.getOverlayFadeBackground({
          color,
          overlayFadePosition,
          overlayEndPosition,
        })
      })

      it('should return a correct background', () => {
        expect(results).toEqual(
          `linear-gradient(to bottom, transparent 0%, ${color} 12.5%, ${color} 87.5% , transparent 100%)`,
        )
      })
    })
  })
})
