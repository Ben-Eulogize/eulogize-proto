import React, { useState } from 'react'
import type { Moment } from 'moment'
import moment from 'moment'
import styled from 'styled-components'
import {
  DateField,
  DISABLED_DATE_BEFORE_TODAY,
  FormContext,
  FormHelper,
  MemorialDataPullFormFields,
  MemorialDataPullFormRules,
  TextField,
  TimePicker,
} from '@eulogise/client-components'
import {
  useAllActiveCardProducts,
  useAvailableEulogiseCardProducts,
  useProductState,
  useCaseState,
  useEulogiseDispatch,
  useModalState,
  useSlideshowState,
  useAllGenericCardProductTypes,
} from '../../../store/hooks'
import {
  EulogiseProduct,
  IAllActiveCardProducts,
  ICardProductData,
  ICase,
  ICaseEditFields,
  ICaseState,
  IGenericCardProductData,
  IMemorialDataPullModalOption,
  IModalState,
  ISlideshowData,
  ISlideshowState,
  SERVICE_START_TIME_PICKER_FORMAT,
  SERVICE_START_TIME_PICKER_LABEL_TEXT,
} from '@eulogise/core'
import {
  applyThemeToAllProducts,
  applyThemeToProduct,
} from '../../../store/CardProduct/actions'
import {
  markHasSkippedOrFilledMemorialFormAsTrue,
  updateCaseById,
} from '../../../store/CaseState/actions'
import { CardProductHelper, CaseHelper } from '@eulogise/helpers'
import { COLOR } from '@eulogise/client-core'

interface IMemorialDataPullFormProps {
  formRef: any
  genericProductType?: IGenericCardProductData
  onCreated: () => void
  onCreating: () => void
  onFailed: () => void
}

const StyledMemorialDataPullForm = styled.form``

const MemorialDataPullForm: React.FC<IMemorialDataPullFormProps> = ({
  formRef,
  onCreated,
  onCreating,
  onFailed,
}) => {
  const dispatch = useEulogiseDispatch()

  const { activeItem: activeCase }: ICaseState = useCaseState()
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  const caseId = activeCase?.id
  const {
    deceased: { fullName: defaultDeceasedFullName, primaryImage },
    service: { location, serviceStartTime: currentServiceStartTimeString },
  } = activeCase as ICase
  const dateOfBirth = CaseHelper.getDateOfBirthDisplayInTime(activeCase!)
  const dateOfDeath = CaseHelper.getDateOfDeathDisplayInTime(activeCase!)
  const dateOfService = CaseHelper.getDateOfServiceDisplayInTime(activeCase!)

  const [isFormDirty, setIsFormDirty] = useState<boolean>(false)
  const [fields, setFields] = useState<MemorialDataPullFormFields>({
    deceasedFullName: defaultDeceasedFullName,
    dateOfBirth: dateOfBirth || '',
    dateOfDeath: dateOfDeath || '',
    dateOfService: dateOfService || '',
    location,
    serviceStartTime: currentServiceStartTimeString,
  })

  const { options }: IModalState = useModalState()
  const { product, slug } = options as IMemorialDataPullModalOption

  const { activeItem: activeSlideshow }: ISlideshowState = useSlideshowState()

  const allAvailableCardProducts: Array<EulogiseProduct> =
    useAvailableEulogiseCardProducts()
  let activeCardProduct: ICardProductData | ISlideshowData
  let allActiveCardProducts: IAllActiveCardProducts
  if (product === EulogiseProduct.ALL) {
    allActiveCardProducts = useAllActiveCardProducts(allAvailableCardProducts)
  } else {
    const { activeItem } = useProductState({ product, slug })
    activeCardProduct = activeItem!
  }
  const genericProductType = slug
    ? CardProductHelper.getGenericProductTypeBySlug({
        slug,
        genericProductTypes,
      })
    : undefined

  const updateFields = (newFields: any) => {
    setFields({ ...fields, ...newFields })
  }

  return (
    <FormContext.Provider value={{ isFormDirty }}>
      <StyledMemorialDataPullForm
        ref={formRef}
        onSubmit={(ev) => {
          ev.preventDefault()
          setIsFormDirty(true)
          const { isValid } = FormHelper.validateMemorialDataPullForm(fields)
          if (isValid) {
            onCreating()
            const {
              deceasedFullName,
              dateOfBirth,
              dateOfDeath,
              dateOfService,
              location,
              serviceStartTime,
            } = fields

            const formattedFields: ICaseEditFields = {
              ...fields,
              dateOfBirth: fields.dateOfBirth,
              dateOfDeath: fields.dateOfDeath,
              dateOfService: fields.dateOfService,
              hasSkippedOrFilledMemorialDataPullForm: true,
              location,
              serviceStartTime,
            }
            if (!fields.dateOfBirth) {
              delete formattedFields.dateOfBirth
            }
            if (!fields.dateOfDeath) {
              delete formattedFields.dateOfDeath
            }

            if (!fields.location) {
              delete formattedFields.location
            }

            if (!fields.serviceStartTime) {
              delete formattedFields.serviceStartTime
            }

            if (!fields.dateOfService) {
              delete formattedFields.dateOfService
            }

            dispatch(markHasSkippedOrFilledMemorialFormAsTrue())
            dispatch(
              updateCaseById({
                caseId: caseId!,
                caseFields: formattedFields,
                success: () => {
                  if (CardProductHelper.isCardProduct(product)) {
                    // also apply a new theme to the product
                    dispatch(
                      applyThemeToProduct({
                        activeCase,
                        product,
                        slug,
                        genericProductType,
                        slideshow: activeSlideshow,
                        cardProduct: activeCardProduct as ICardProductData,
                        themeId: activeCardProduct.content.theme,
                        isPopulatingData: true,
                        populatedData: {
                          deceasedName: deceasedFullName,
                          dateOfService: dateOfService,
                          dateOfBirth: dateOfBirth,
                          dateOfDeath: dateOfDeath,
                          location,
                          serviceStartTime,
                          primaryImage,
                          onSuccess: () => onCreated(),
                        },
                      }),
                    )
                  }

                  if (product === EulogiseProduct.ALL) {
                    dispatch(
                      applyThemeToAllProducts({
                        activeCase,
                        slideshow: activeSlideshow,
                        cardProducts: allActiveCardProducts,
                        // randomly pick booklet for the theme id since all are the same theme
                        themeId:
                          allActiveCardProducts[EulogiseProduct.BOOKLET]
                            ?.content.theme!,
                        isPopulatingData: true,
                        populatedData: {
                          deceasedName: deceasedFullName,
                          dateOfService,
                          dateOfBirth,
                          dateOfDeath,
                          location,
                          serviceStartTime,
                          primaryImage,
                        },
                        onSuccess: () => onCreated(),
                      }),
                    )
                  }
                  onCreated()
                },
              }),
            )
          }
          onFailed()
        }}
      >
        <TextField
          labelText="Deceased Name"
          labelTextColor={COLOR.CORE_PURPLE}
          placeholder="Deceased Name"
          value={fields.deceasedFullName}
          rules={MemorialDataPullFormRules.deceasedFullName}
          onChange={(ev: { target: { value: any } }) => {
            updateFields({ deceasedFullName: ev.target.value })
          }}
          required
        />
        <DateField
          disabledDate={DISABLED_DATE_BEFORE_TODAY}
          labelText="Date of Service"
          value={fields.dateOfService}
          getPopupContainer={() => formRef.current}
          labelTextColor={COLOR.CORE_PURPLE}
          onChange={(dateOfService: string | null) => {
            updateFields({ dateOfService })
          }}
        />
        <DateField
          labelText="Date of Birth"
          defaultPickerValue={moment('19000101')}
          value={fields.dateOfBirth}
          type="dob"
          rules={MemorialDataPullFormRules.dateOfBirth}
          labelTextColor={COLOR.CORE_PURPLE}
          getPopupContainer={() => formRef.current}
          onChange={(dateOfBirth: string | null) => {
            updateFields({ dateOfBirth })
          }}
          required
        />
        <DateField
          labelText="Date of Death"
          value={fields.dateOfDeath}
          rules={MemorialDataPullFormRules.dateOfDeath}
          labelTextColor={COLOR.CORE_PURPLE}
          getPopupContainer={() => formRef.current}
          onChange={(dateOfDeath: string | null) => {
            updateFields({ dateOfDeath })
          }}
          required
        />
        <TextField
          labelText="Service Address/Location"
          placeholder="Service Address/Location"
          labelTextColor={COLOR.CORE_PURPLE}
          value={fields.location}
          rules={MemorialDataPullFormRules.location}
          onChange={(ev: { target: { value: any } }) => {
            updateFields({ location: ev.target.value })
          }}
          required
        />
        <TimePicker
          getPopupContainer={() => formRef.current}
          format={SERVICE_START_TIME_PICKER_FORMAT}
          onChange={(_time: Moment, timeString: string) => {
            updateFields({ serviceStartTime: timeString })
          }}
          labelText={SERVICE_START_TIME_PICKER_LABEL_TEXT}
          labelTextColor={COLOR.CORE_PURPLE}
          defaultValue={
            currentServiceStartTimeString
              ? moment(
                  currentServiceStartTimeString,
                  SERVICE_START_TIME_PICKER_FORMAT,
                )
              : null
          }
        />
      </StyledMemorialDataPullForm>
    </FormContext.Provider>
  )
}

export default MemorialDataPullForm
