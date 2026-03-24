import { PassareClient } from './PassareClient'
import { MOCK_PASSARE_CASES } from './Passare.mock'

jest.setTimeout(30000)
describe.skip('PassareClient', () => {
  let results: any

  const caseId: string = MOCK_PASSARE_CASES[0].case_uuid
  const contactInformationId: string = '9c057b7f-1246-4fd2-8848-0d9c8983320c'

  describe('getOrganizations()', () => {
    beforeEach(async () => {
      results = await PassareClient.getOrganizations()
    })

    it('should return all organizations', () => {
      expect(results).toEqual([
        {
          organization_name: 'Public API Sandbox',
          organization_uuid: 'dae8b99d-f59c-4812-aef1-1dd3d9fe0148',
        },
      ])
    })
  })

  describe('getCasesByOrgId()', () => {
    const organizationId = 'dae8b99d-f59c-4812-aef1-1dd3d9fe0148'
    beforeEach(async () => {
      results = await PassareClient.getCasesByOrgId(organizationId)
    })

    it('should return all cases for an organization', () => {
      expect(results).toEqual({
        items_per_page: 10,
        page: 1,
        records: expect.arrayContaining([expect.any(Object)]),
        total_pages: expect.any(Number),
        total_records: expect.any(Number),
      })
    })
  })

  describe('getCaseById()', () => {
    beforeEach(async () => {
      results = await PassareClient.getCaseById(caseId)
    })

    it('should return a case by id', () => {
      expect(results).toEqual([
        {
          case_uuid: 'c4a45116-70f4-47b3-b63d-bb5819277790',
          decedent_person: {
            person: {
              decedent_uuid: '8d911770-a7cd-413c-8af4-b536b8d46df9',
              title: null,
              first_name: 'Barbara',
              middle_name: 'Hope',
              last_name: 'Stearns',
              suffix: null,
              gender: 'Female',
              birth_date: '1938-08-19',
            },
            address: {
              address_uuid: 'b044b706-eca8-41cb-ae63-9f7873f60010',
              city: 'Chicago',
              state: 'IL',
              county: 'Cook',
              country: 'US',
              borough: '',
              township: '',
              village: '',
              other_township: '',
              identifier: 'City',
              inside_city_limits: null,
              latitude: 0,
              longitude: 0,
            },
            death: '2020-07-25T00:00:00.000Z',
            highest_rank: null,
            obituary: {
              content:
                '<p>Barbara Hope Stearns, a beloved member of the culinary community, passed away on July 25, 2020, at the age of 81. Born on August 19, 1938, in the picturesque town of Aspen, Colorado, Barbara left an indelible mark on the world through her passion for food and her remarkable talent as a chef.</p>\r\n<p>\r\n</p><p>Throughout her life, Barbara demonstrated an unwavering dedication to her craft. After completing her education and earning a Master&#39;s Degree, she embarked on a culinary journey that took her to new heights. As an esteemed chef, Barbara graced the kitchens of prestigious restaurants and eventually found her calling at Microsoft, where she shared her culinary expertise with the company&#39;s employees and clientele.</p>\r\n<p>\r\n</p><p>Barbara&#39;s culinary creations were a testament to her creative genius and attention to detail. Her innovative recipes brought joy to countless palates and left a lasting impression on all who had the pleasure of savoring her dishes. Beyond her professional achievements, Barbara will also be remembered for her warm spirit, infectious laughter, and her ability to bring people together through the communal experience of food.</p>\r\n<p>\r\n</p><p>Barbara&#39;s memory will be cherished by her surviving relatives, most notably her beloved mother, Mildred Stearns. The Stearns family would like to extend their heartfelt appreciation to all who have expressed their condolences and supported them during this difficult time.</p>\r\n<p>\r\n</p><p>In honor of Barbara&#39;s remarkable life, a memorial service will be held at First Church on August 7, 2020, at 10:00 am. This joyful celebration of Barbara&#39;s legacy will allow friends, family, and colleagues to share stories, memories, and laughter as they reflect on the incredible impact she had on their lives.</p>\r\n<p>\r\n</p><p>Following the memorial service, a graveside service will be held at the picturesque Rose Garden Cemetery on the same day at 11:00 am. This tranquil setting will serve as a final farewell to Barbara, where her family and close friends can gather to pay their respects and find solace amidst the beauty of nature.</p>\r\n<p>\r\n</p><p>In loving memory of Barbara Hope Stearns, the family kindly requests that any memorial donations be made to Charity A by visiting http://www.google.com. These contributions will honor Barbara&#39;s compassionate spirit, allowing her legacy to continue making a positive difference in the lives of others.</p>\r\n<p>\r\n</p><p>Barbara&#39;s light will continue to shine brightly in the hearts of those who knew and loved her. Her culinary prowess, unwavering spirit, and warm presence will forever inspire and bring joy to the lives of many. May she rest in eternal peace.</p>\r\n<p>-----------------</p>\r\n<p>In Loving Memory of Barbara Hope Stearns</p>\r\n<p>\r\n</p><p>Gone is the light that shimmered from your soul,</p>\r\n<p>Barbara Hope Stearns, a name we&#39;ll always hold,</p>\r\n<p>With heavy hearts and tearful eyes we grieve,</p>\r\n<p>For the cherished memories we can never retrieve.</p>\r\n<p>\r\n</p><p>On a warm August day, nineteen-thirty-eight,</p>\r\n<p>Aspen, Colorado, was blessed by your fate,</p>\r\n<p>Born to Mildred Stearns, a mother full of grace,</p>\r\n<p>Your journey began, a life of boundless embrace.</p>\r\n<p>\r\n</p><p>With passion and dedication, you pursued your dreams,</p>\r\n<p>A Master&#39;s Degree, a chef of extraordinary esteem,</p>\r\n<p>Microsoft, your home, where culinary art thrived,</p>\r\n<p>Your talent and expertise, forever will be revived.</p>\r\n<p>\r\n</p><p>As the curtains closed on the twenty-fifth, July,</p>\r\n<p>Your gentle presence bid us all goodbye,</p>\r\n<p>Leaving behind a void none else can fill,</p>\r\n<p>But the memories we cherish will forever instill.</p>\r\n<p>\r\n</p><p>To honor your life, we gather today,</p>\r\n<p>A Memorial Service at First Church on August seventh,</p>\r\n<p>At ten in the morning, we&#39;ll share stories anew,</p>\r\n<p>Of a life filled with love, compassion, and breakthroughs.</p>\r\n<p>\r\n</p><p>Then, in the Rose Garden Cemetery, we&#39;ll convene,</p>\r\n<p>At eleven o&#39;clock, for the Graveside Service serene,</p>\r\n<p>Where tears will fall upon the earth&#39;s tender embrace,</p>\r\n<p>As we lay you to rest, in eternal solace and grace.</p>\r\n<p>\r\n</p><p>In your memory, donations to Charity A we request,</p>\r\n<p>For lives to be touched, for those in need to be blessed,</p>\r\n<p>Though you&#39;re gone, your spirit forever will shine,</p>\r\n<p>In our hearts, Barbara, you&#39;ll eternally enshrine.</p>\r\n<p>\r\n</p><p>Note: Memorial donations can be made to Charity A at http://www.google.com.</p>\r\n',
              primary_photo:
                'https://cap.passare.com/stored_file_file/47476001.jpg',
              secondary_photo: '',
              locked: true,
              last_updated: '2023-10-04T16:06:30.968Z',
              tribute_video: null,
            },
            veteran: false,
          },
          decedent_animal: null,
          events: [
            {
              name: 'Memorial Service',
              location_name: 'Rose Garden Cemetery',
              location_address: {
                address_uuid: 'a01644d2-5495-4207-a9c9-e086b2142b0c',
                address1: '123 Rose Ave',
                address2: null,
                address3: null,
                address4: null,
                city: 'Chicago',
                state: 'IL',
                zip: '60602',
                county: null,
                country: 'US',
                borough: '',
                township: '',
                village: '',
                other_township: '',
                identifier: 'City',
                inside_city_limits: null,
                latitude: 41.8835178,
                longitude: -87.6258728,
              },
              date: '2024/08/29',
              start_time: '13:00:00',
              end_time: '15:00:00',
              event_uuid: 'a4a448d7-40ce-4bbe-a3a2-a8a2462dec0a',
              last_updated: '2024-08-14T04:31:44.955Z',
              public: true,
              livestream_url: '',
              has_livestream: false,
            },
            {
              name: 'Memorial Service',
              location_name: 'First Church',
              location_address: {
                address_uuid: '3d25c952-04ab-4ec7-bce0-b49b0cb5944b',
                address1: '123 Church St',
                address2: null,
                address3: null,
                address4: null,
                city: 'Chicago',
                state: 'IL',
                zip: '60604',
                county: null,
                country: 'US',
                borough: '',
                township: '',
                village: '',
                other_township: '',
                identifier: 'City',
                inside_city_limits: null,
                latitude: 41.6930368,
                longitude: -87.6642955,
              },
              date: '2020/08/07',
              start_time: '10:15:00',
              end_time: '12:00:00',
              event_uuid: '08c1c0a8-3975-4a90-9493-6dae562a0f07',
              last_updated: '2024-08-12T22:17:48.971Z',
              public: true,
              livestream_url: '',
              has_livestream: false,
            },
          ],
          memorial_donations: [
            {
              name: 'Charity A',
              website: 'http://www.google.com',
              memorial_donation_uuid: '2fca1fec-f3b0-4604-a44a-5daedc2249c2',
              last_updated: '2020-07-28T18:36:36.761Z',
            },
          ],
          case_identifier: 'keep-001',
          case_assigned_to: 'Marcus Wilson',
          case_types: ['at_need'],
          custom_fields: [],
          case_url: 'https://cap.passare.com/cases/1891436',
          pc_payment_link: null,
          pet_business: null,
          client_service_type_name: 'Burial w/ Graveside',
          case_status: 'New',
          send_survey: false,
        },
      ])
    })
  })

  describe('getCaseObituaryByCaseId()', () => {
    beforeEach(async () => {
      results = await PassareClient.getCaseObituaryByCaseId(caseId)
    })

    it('should return a case obituary of the case id', () => {
      expect(results).toEqual([
        {
          case_uuid: caseId,
          obituary: {
            content:
              '<p>Barbara Hope Stearns, a beloved member of the culinary community, passed away on July 25, 2020, at the age of 81. Born on August 19, 1938, in the picturesque town of Aspen, Colorado, Barbara left an indelible mark on the world through her passion for food and her remarkable talent as a chef.</p>\r\n<p>\r\n</p><p>Throughout her life, Barbara demonstrated an unwavering dedication to her craft. After completing her education and earning a Master&#39;s Degree, she embarked on a culinary journey that took her to new heights. As an esteemed chef, Barbara graced the kitchens of prestigious restaurants and eventually found her calling at Microsoft, where she shared her culinary expertise with the company&#39;s employees and clientele.</p>\r\n<p>\r\n</p><p>Barbara&#39;s culinary creations were a testament to her creative genius and attention to detail. Her innovative recipes brought joy to countless palates and left a lasting impression on all who had the pleasure of savoring her dishes. Beyond her professional achievements, Barbara will also be remembered for her warm spirit, infectious laughter, and her ability to bring people together through the communal experience of food.</p>\r\n<p>\r\n</p><p>Barbara&#39;s memory will be cherished by her surviving relatives, most notably her beloved mother, Mildred Stearns. The Stearns family would like to extend their heartfelt appreciation to all who have expressed their condolences and supported them during this difficult time.</p>\r\n<p>\r\n</p><p>In honor of Barbara&#39;s remarkable life, a memorial service will be held at First Church on August 7, 2020, at 10:00 am. This joyful celebration of Barbara&#39;s legacy will allow friends, family, and colleagues to share stories, memories, and laughter as they reflect on the incredible impact she had on their lives.</p>\r\n<p>\r\n</p><p>Following the memorial service, a graveside service will be held at the picturesque Rose Garden Cemetery on the same day at 11:00 am. This tranquil setting will serve as a final farewell to Barbara, where her family and close friends can gather to pay their respects and find solace amidst the beauty of nature.</p>\r\n<p>\r\n</p><p>In loving memory of Barbara Hope Stearns, the family kindly requests that any memorial donations be made to Charity A by visiting http://www.google.com. These contributions will honor Barbara&#39;s compassionate spirit, allowing her legacy to continue making a positive difference in the lives of others.</p>\r\n<p>\r\n</p><p>Barbara&#39;s light will continue to shine brightly in the hearts of those who knew and loved her. Her culinary prowess, unwavering spirit, and warm presence will forever inspire and bring joy to the lives of many. May she rest in eternal peace.</p>\r\n<p>-----------------</p>\r\n<p>In Loving Memory of Barbara Hope Stearns</p>\r\n<p>\r\n</p><p>Gone is the light that shimmered from your soul,</p>\r\n<p>Barbara Hope Stearns, a name we&#39;ll always hold,</p>\r\n<p>With heavy hearts and tearful eyes we grieve,</p>\r\n<p>For the cherished memories we can never retrieve.</p>\r\n<p>\r\n</p><p>On a warm August day, nineteen-thirty-eight,</p>\r\n<p>Aspen, Colorado, was blessed by your fate,</p>\r\n<p>Born to Mildred Stearns, a mother full of grace,</p>\r\n<p>Your journey began, a life of boundless embrace.</p>\r\n<p>\r\n</p><p>With passion and dedication, you pursued your dreams,</p>\r\n<p>A Master&#39;s Degree, a chef of extraordinary esteem,</p>\r\n<p>Microsoft, your home, where culinary art thrived,</p>\r\n<p>Your talent and expertise, forever will be revived.</p>\r\n<p>\r\n</p><p>As the curtains closed on the twenty-fifth, July,</p>\r\n<p>Your gentle presence bid us all goodbye,</p>\r\n<p>Leaving behind a void none else can fill,</p>\r\n<p>But the memories we cherish will forever instill.</p>\r\n<p>\r\n</p><p>To honor your life, we gather today,</p>\r\n<p>A Memorial Service at First Church on August seventh,</p>\r\n<p>At ten in the morning, we&#39;ll share stories anew,</p>\r\n<p>Of a life filled with love, compassion, and breakthroughs.</p>\r\n<p>\r\n</p><p>Then, in the Rose Garden Cemetery, we&#39;ll convene,</p>\r\n<p>At eleven o&#39;clock, for the Graveside Service serene,</p>\r\n<p>Where tears will fall upon the earth&#39;s tender embrace,</p>\r\n<p>As we lay you to rest, in eternal solace and grace.</p>\r\n<p>\r\n</p><p>In your memory, donations to Charity A we request,</p>\r\n<p>For lives to be touched, for those in need to be blessed,</p>\r\n<p>Though you&#39;re gone, your spirit forever will shine,</p>\r\n<p>In our hearts, Barbara, you&#39;ll eternally enshrine.</p>\r\n<p>\r\n</p><p>Note: Memorial donations can be made to Charity A at http://www.google.com.</p>\r\n',
            last_updated: '2023-10-04T16:06:30.968Z',
            locked: true,
            primary_photo:
              'https://cap.passare.com/stored_file_file/47476001.jpg',
            secondary_photo: '',
            tribute_video: null,
          },
        },
      ])
    })
  })

  describe('getCaseAcquaintancesByCaseId()', () => {
    beforeEach(async () => {
      results = await PassareClient.getCaseAcquaintancesByCaseId(caseId)
    })

    it('should return a case acquaintances of the case id', () => {
      expect(results).toEqual({
        acquaintances: expect.arrayContaining([expect.any(Object)]),
      })
    })
  })

  describe('getCaseContractsByCaseId()', () => {
    beforeEach(async () => {
      results = await PassareClient.getCaseContractsByCaseId(caseId)
    })

    it('should return a case contracts of the case id', () => {
      expect(results).toEqual([
        {
          uuid: 'db88dbcb-1f17-4782-9ef9-59646771be4b',
          contract_date: '2024-01-31T00:00:00.000Z',
          contract_total: 4280,
          signed_at: '2024-01-31T17:50:39.972Z',
          signed_by: {
            user_uuid: '5bfa0e9c-63ec-4b26-acee-13a6145e1694',
            first_name: 'Marcus',
            last_name: 'Wilson',
            correspondence_emails: 'marcus.wilson@passare.com',
            funeral_home_name: 'Current User Org',
            avatar_image: null,
          },
          sent_to_accounting_at: '2024-04-16T21:16:42.618Z',
          sent_to_accounting_by: {
            user_uuid: '5bfa0e9c-63ec-4b26-acee-13a6145e1694',
            first_name: 'Marcus',
            last_name: 'Wilson',
            correspondence_emails: 'marcus.wilson@passare.com',
            funeral_home_name: 'Current User Org',
            avatar_image: null,
          },
          exported_on: null,
          addendums: [
            {
              uuid: 'd88d4a19-58dd-4412-ad43-96cd368bb15e',
              signed_at: '2024-01-31T17:51:17.004Z',
              signed_by: {
                user_uuid: '5bfa0e9c-63ec-4b26-acee-13a6145e1694',
                first_name: 'Marcus',
                last_name: 'Wilson',
                correspondence_emails: 'marcus.wilson@passare.com',
                funeral_home_name: 'Current User Org',
                avatar_image: null,
              },
              exported_on: null,
            },
            {
              uuid: 'a40cce8a-9bf3-4827-817b-7f2126f33862',
              signed_at: null,
              signed_by: null,
              exported_on: null,
            },
          ],
          case_type: 'at_need',
        },
      ])
    })
  })

  describe('getCaseServicesByCaseId()', () => {
    beforeEach(async () => {
      results = await PassareClient.getCaseServicesByCaseId(
        MOCK_PASSARE_CASES[0].case_uuid,
      )
    })

    it('should return a case services of the case id', () => {
      expect(results).toEqual([
        {
          case_uuid: caseId,
          events: expect.arrayContaining([expect.any(Object)]),
        },
      ])
    })
  })

  describe('getContactInformationById()', () => {
    beforeEach(async () => {
      results = await PassareClient.getContactInformationById(
        contactInformationId,
      )
    })

    it('should return a contact information by id', () => {
      expect(results).toEqual({
        contact_information_uuid: contactInformationId,
        email: null,
      })
    })
  })

  describe('find cases that have events', () => {
    it('should return case id', async () => {
      for (let pCase of MOCK_PASSARE_CASES) {
        console.log('searching for events on', pCase.case_uuid)
        results = await PassareClient.getCaseServicesByCaseId(pCase.case_uuid)
        console.log('results', results)
        if (results?.[0].events.length > 0) {
          for (let event of results[0].events) {
            console.log('Found event on', pCase.case_uuid, event)
          }
          console.log('Found events on', pCase.case_uuid)
          return
        }
      }
    })
  })
})
