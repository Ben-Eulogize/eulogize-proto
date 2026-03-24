import { EulogiseRegion, EulogiseCountry, ICase } from '@eulogise/core'
import { CaseHelper, CaseSearchType } from './CaseHelper'
import { faker } from '@faker-js/faker'

describe('CaseHelper', () => {
  let region: any
  let results: any

  describe('getSearchType()', () => {
    it('should return EMAIL if input is an email', () => {
      expect(CaseHelper.getSearchType('test@gmail.com')).toEqual(
        CaseSearchType.EMAIL,
      )
      expect(CaseHelper.getSearchType('test+1@gmail.com')).toEqual(
        CaseSearchType.EMAIL,
      )
    })

    it('should return UUID if input is a UUID', () => {
      expect(CaseHelper.getSearchType(faker.string.uuid())).toEqual(
        CaseSearchType.UUID,
      )
    })
  })

  describe('getEnabledProducts()', () => {
    const enabledProducts = {
      SLIDESHOW: true,
      BOOKLET: true,
    }
    const eulogiseCase: ICase = {
      enabledProducts,
    } as unknown as ICase

    beforeEach(() => {
      results = CaseHelper.getEnabledProducts({ activeCase: eulogiseCase })
    })

    it('should return enabled products', () => {
      expect(results).toEqual(enabledProducts)
    })
  })

  describe('getNoOfEnabledProducts()', () => {
    const enabledProducts = {
      SLIDESHOW: true,
      BOOKLET: true,
      BOOKMARK: false,
    }
    const eulogiseCase: ICase = {
      enabledProducts,
    } as unknown as ICase

    beforeEach(() => {
      results = CaseHelper.getNoOfEnabledProducts({ activeCase: eulogiseCase })
    })

    it('should return no of enabled products', () => {
      expect(results).toEqual(2)
    })
  })

  describe('getRegionByCountry()', () => {
    it('should get AU region if input is a AU paper size country', () => {
      region = CaseHelper.getRegionByCountry({
        country: EulogiseCountry.AUSTRALIA,
      })
      expect(region).toEqual(EulogiseRegion.AU)
    })

    it('should get AU region if input is a AU paper size country', () => {
      region = CaseHelper.getRegionByCountry({
        country: EulogiseCountry.EUROPEAN_UNION,
      })
      expect(region).toEqual(EulogiseRegion.AU)
    })

    it('should get US region if input is a US paper size country', () => {
      region = CaseHelper.getRegionByCountry({
        country: EulogiseCountry.UNITED_STATES,
      })
      expect(region).toEqual(EulogiseRegion.USA)
    })

    it('should get US region if input is a US paper size country', () => {
      region = CaseHelper.getRegionByCountry({
        country: EulogiseCountry.CANADA,
      })
      expect(region).toEqual(EulogiseRegion.USA)
    })

    it('should get USA region if input is another country that not defined in the list', () => {
      region = CaseHelper.getRegionByCountry({
        country: EulogiseCountry.REST_OF_THE_WOLRD,
      })
      expect(region).toEqual(EulogiseRegion.USA)
    })
  })
})
