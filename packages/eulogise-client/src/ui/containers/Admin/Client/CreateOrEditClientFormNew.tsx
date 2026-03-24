import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import copyToClipboard from 'copy-to-clipboard'
import {
  Button,
  ButtonType,
  Checkbox,
  CopyAssetIcon,
  Input,
  Notification,
  QRCodeIcon,
  Radio,
  Select,
  Tooltip,
} from '@eulogise/client-components'
import { Form } from 'antd'
import { AdminHelper, onCreateClientCancel } from '../../../helpers/AdminHelper'
import {
  IClientFormInitialValues,
  IClientFormSubmitValuesNew,
} from './ClientForm.types'
import {
  EulogiseCountry,
  EulogiseRegion,
  IClientData,
  IClientFamilyInviteOptions,
  IEulogiseUser,
  IModalState,
  EulogiseProduct,
  INITIAL_FEATURES,
  INITIAL_DEFAULT_PRODUCTS,
  ModalId,
  EulogiseUserRole,
  SIGN_UP_HEADER_CONTENT,
  AllowPurchasingProductOptionKey,
  EulogiseEditorPaymentConfig,
  PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES,
  EulogizeShippingAvailableCountries,
} from '@eulogise/core'
import { FuneralDirectorList } from './FuneralDirectorList'
import { ClientLogoDragger } from './ClientLogoDragger'
import { CreateFuneralDirectorModal } from './CreateFuneralDirectorModal'
import { EULOGISE_COUNTRIES_REGIONS_OPTIONS } from '../../../components/CountryGlobalIcon/CountryGlobalIcon'
import { COLOR, STYLE } from '@eulogise/client-core'
import { ClientEmailAssetDragger } from './ClientEmailAssetDragger'
import { ClientBrandDragger } from './ClientBrandDragger'
import { showModalAction } from '../../../store/ModalState/actions'
import {
  useAllGenericCardProductTypes,
  useEulogiseDispatch,
  useModalState,
} from '../../../store/hooks'
import ViewClientBrandsModal from '../../Modal/ViewClientBrandsModal/ViewClientBrandsModal'
import { ClientHelper } from '@eulogise/helpers'
import { AccountHelper } from '../../../../../../eulogise-helpers/src/AccountHelper'
import { checkClientHandleAvailability } from '../../../store/ClientState/actions'
import { QRCodeModal } from '../../Modal/QRCodeModal/QRCodeModal'

const FORM_ITEM_FIELD_MARGIN = '5px 0;'

const StyledButtonsContainer = styled.div`
  display: flex;
  margin-top: 10px;
  .client-form-cancel {
    margin-left: 20px;
  }
`

const StyledAddFuneralDirectorButtonContainer = styled.div`
  margin-bottom: 24px;
`

const ButtonContainerLeft = styled.div`
  flex: 1;
`

const ButtonContainerRight = styled.div``

const StyledSelect = styled(Select)`
  display: inline-block;
  border-bottom: 1px solid;
  width: 100%;
  margin: ${FORM_ITEM_FIELD_MARGIN};
`

type ICreateOrEditClientFormNewProps = {
  formRef?: any
  onFormSubmit: (values: IClientFormSubmitValuesNew) => void
  initialValues?: Partial<IClientFormInitialValues>
  submitText?: string
  clientId?: string
  clientLogo?: string
  funeralDirectors?: Array<IEulogiseUser>
  onRemoveFuneralDirector?: (user: IEulogiseUser) => void
  onChangeFuneralDirector?: (user: IEulogiseUser) => void
  isLoadingFuneralDirectors?: boolean
  onCreatedFuneralDirector?: (user: IEulogiseUser) => void
  isCountryDisabled?: boolean
  clientEmailAsset?: string
  initialAdditionalAddressAmount?: number
  client?: IClientData
  onSetClient?: (c: IClientData) => void
}

const StyledCreateOrEditClientFormNew = styled(Form)`
  max-width: 700px;
  margin: 30px auto;
`
const StyledFieldContainer = styled.div`
  display: flex;
  width: 100%;
`

const StyledFieldNameText = styled.div`
  margin: 10px 0;
  min-width: 120px;
`

const StyledFormItem = styled(Form.Item)`
  width: 100%;
`

const StyledFormSubItem = styled(Form.Item)`
  margin-bottom: 0;
`

const StyledFormItemPlaceholder = styled(Form.Item)`
  position: absolute;
  margin-top: 35px;
  margin-left: 130px;
  color: ${COLOR.TEXT_DISABLED_COLOR};
`

const StyledDeleteAddressButtonContainer = styled.div`
  margin-right: 36px;
`

const StyledCheckboxGroupContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 24px;
  border-top: 2px solid ${COLOR.DARK_BLUE};
  border-bottom: 2px solid ${COLOR.DARK_BLUE};
`

const StyledAllowPurchasingCheckBoxGroupContainer = styled.div`
  width: 100%;
  padding-top: 24px;
  border-top: 2px solid ${COLOR.DARK_BLUE};
  border-bottom: 2px solid ${COLOR.DARK_BLUE};
`

const StyledTributesCoreVisibilitySectionContainer = styled.div`
  width: 100%;
  padding-top: 24px;
  border-top: 2px solid ${COLOR.DARK_BLUE};
  border-bottom: 2px solid ${COLOR.DARK_BLUE};
`

const StyledFuneralDirectorsListContainer = styled.div`
  width: 100%;
  padding-top: 24px;
  border-bottom: 2px solid ${COLOR.DARK_BLUE};
`

const StyledFamilyInviteOptionTitleText = styled.div`
  margin: 4px 0;
  min-width: 150px;
`

const StyledAddAdditionalAddressContainer = styled.div`
  display: flex;
  margin: 0 0 30px 0;
`

const StyledLogoContainer = styled.div``

const StyledLogoTitle = styled.div`
  margin: 12px 12px;
  padding: 4px 0;
  color: ${COLOR.BLACK};
  font-size: 24px;
  flex: 1;
`

const StyledClientBrandsTitleContainer = styled.div`
  display: flex;
`

const StyledClientBrandDeleteButtonContainer = styled.div`
  margin-top: 20px;
`

const StyledCheckboxGroup = styled(Checkbox.Group)``

const StyledRadioGroup = styled(Radio.Group)`
  margin: calc(${STYLE.GUTTER} / 2) 0;
`

const StyledAllowPurchasingText = styled.div`
  margin: 0 0 8px 0;
  min-width: 150px;
  height: 32px;
`

const StyledAllowPurchasingOptionContainer = styled.div`
  padding: 0 0 0 57px;
  display: flex;
  height: 48px;
`

const StyledTributesCoreVisibilityContainer = styled.div`
  padding: 0 0 0 150px;
  display: flex;
  height: 48px;
`

const StyledAllowPurchasingProductText = styled.div`
  margin: 5px 0 0 0;
  min-width: 92px;
`

const StyledAllowPurchaseFormItem = styled(Form.Item)`
  padding: 0 4px;
`

const StyledIndeterminateCheckbox = styled(Checkbox)`
  .ant-checkbox-indeterminate .ant-checkbox-inner {
    border-color: ${COLOR.CORE_PURPLE};
    &::after {
      background-color: ${COLOR.CORE_PURPLE};
    }
  }
`

const StyledDefaultIndicator = styled.span`
  font-size: 11px;
  color: ${COLOR.CORE_PURPLE};
  margin-left: 4px;
`

const StyledTributesCoreVisibilityProductNameText = styled.div`
  width: 200px;
  padding-right: 40px;
`

const FAMILY_INVITE_OPTIONS = [
  { label: 'Editor', value: IClientFamilyInviteOptions.EDITOR },
  {
    label: 'Editor (has to pay)',
    value: IClientFamilyInviteOptions.EDITOR_HAS_TO_PAY,
  },
  { label: 'Contributor', value: IClientFamilyInviteOptions.CONTRIBUTOR },
  { label: 'Coeditor', value: IClientFamilyInviteOptions.COEDITOR },
  {
    label: `Don't Send Email`,
    value: IClientFamilyInviteOptions.DO_NOT_SEND_EMAIL,
  },
]

const isPhotobookShippableForCountry = (country?: EulogiseCountry) => {
  return Boolean(
    country && PHOTOBOOK_SHIPPING_AVAILABLE_COUNTRIES.includes(country),
  )
}

const isPrintingShippableForCountry = (country?: EulogiseCountry) => {
  return Boolean(
    country && EulogizeShippingAvailableCountries.includes(country),
  )
}

const setProductAvailabilityStatus = ({
  productField,
  product,
  isEnabled,
}: {
  productField: any
  product: EulogiseProduct
  isEnabled: boolean
}) => {
  if (Array.isArray(productField)) {
    if (isEnabled) {
      return productField.includes(product)
        ? productField
        : [...productField, product]
    }
    return productField.filter((p: EulogiseProduct) => p !== product)
  }
  return {
    ...(productField ?? {}),
    [product]: isEnabled,
  }
}

const isProductEnabledInField = ({
  productField,
  product,
}: {
  productField: any
  product: EulogiseProduct
}) => {
  if (Array.isArray(productField)) {
    return productField.includes(product)
  }
  return Boolean(productField?.[product])
}

const getAllowPurchasingWithCountryShippingRestrictions = ({
  allowPurchasing,
  shouldDisablePhotobook,
  shouldDisablePrinting,
}: {
  allowPurchasing: any
  shouldDisablePhotobook: boolean
  shouldDisablePrinting: boolean
}) => {
  const nextAllowPurchasing = {
    ...(allowPurchasing ?? {}),
  }
  if (shouldDisablePhotobook) {
    nextAllowPurchasing.photoBooks = {
      ...(allowPurchasing?.photoBooks ?? {}),
      [AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER]: false,
      [AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER]: false,
    }
  }
  if (shouldDisablePrinting) {
    nextAllowPurchasing.printing = {
      ...(allowPurchasing?.printing ?? {}),
      [AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER]: false,
      [AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER]: false,
    }
  }
  return nextAllowPurchasing
}

export const CreateOrEditClientFormNew = ({
  onFormSubmit,
  formRef,
  initialValues,
  submitText = 'Create',
  clientId,
  clientLogo,
  funeralDirectors,
  onRemoveFuneralDirector,
  onChangeFuneralDirector,
  isLoadingFuneralDirectors,
  onCreatedFuneralDirector,
  isCountryDisabled = false,
  clientEmailAsset,
  initialAdditionalAddressAmount = 0,
  client,
  onSetClient,
}: ICreateOrEditClientFormNewProps) => {
  const normalizedInitialValues = initialValues ?? {}
  const shouldDisablePhotobookOnInitialLoad =
    Boolean(normalizedInitialValues.country) &&
    !isPhotobookShippableForCountry(normalizedInitialValues.country)
  const shouldDisablePrintingOnInitialLoad =
    Boolean(normalizedInitialValues.country) &&
    !isPrintingShippableForCountry(normalizedInitialValues.country)

  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<
    Partial<IClientFormInitialValues>
  >(normalizedInitialValues)
  const { items: genericProductTypes } = useAllGenericCardProductTypes()
  const [isShowQRCodeModal, setIsShowQRCodeModal] = useState<boolean>(false)
  const [isShowCreateModal, setIsShowCreateModal] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [additionalAddressAmount, setAdditionalAddressAmount] =
    useState<number>(initialAdditionalAddressAmount)
  const dispatch = useEulogiseDispatch()

  useEffect(() => {
    if (formRef && typeof formRef === 'object') {
      formRef.current = form
    }
  }, [form, formRef])

  const [copiedHandle, setCopiedHandle] = useState<boolean>(false)
  const modalState: IModalState = useModalState()
  const { openModalIds } = modalState
  const isViewClientBrandsModalOpened: boolean =
    openModalIds?.includes(ModalId.VIEW_CLIENT_BRANDS) ?? false

  const encodePrimaryAddressArray = ({
    lineOne = '',
    lineTwo = '',
    lineThree = '',
  }): Array<string> => {
    return [lineOne, lineTwo, lineThree]
  }

  const encodeAdditionalAddressArray = ({
    additionalAddressAmount,
    formSubmitValues,
  }: {
    additionalAddressAmount: number
    formSubmitValues: any
  }): Array<Array<string>> => {
    if (additionalAddressAmount < 1) {
      return []
    }
    let additionalAddressArray: Array<Array<string>> = []
    for (let index = 0; index < additionalAddressAmount; index++) {
      const lineOneAddress =
        formSubmitValues[`additionalAddress${index + 1}Line1`] ?? ''
      const lineTwoAddress =
        formSubmitValues[`additionalAddress${index + 1}Line2`] ?? ''
      const lineThreeAddress =
        formSubmitValues[`additionalAddress${index + 1}Line3`] ?? ''
      let additionalAddress = [lineOneAddress, lineTwoAddress, lineThreeAddress]
      additionalAddressArray.push(additionalAddress)
    }
    return additionalAddressArray
  }

  const mapProductFieldToArray = (
    productField: any,
  ): Array<EulogiseProduct> => {
    if (Array.isArray(productField)) {
      return productField
    }
    return Object.entries(productField ?? {})
      .filter(([, isSelected]) => Boolean(isSelected))
      .map(([product]) => product as EulogiseProduct)
  }

  const mapProductFieldToAvailabilityMap = (productField: any) => {
    if (Array.isArray(productField)) {
      return productField.reduce(
        (acc: Record<string, boolean>, product: string) => ({
          ...acc,
          [product]: true,
        }),
        {},
      )
    }
    return productField ?? {}
  }

  const getProductLabel = (product: string) => {
    const productOptions = AccountHelper.getAllProductOptions({
      region: EulogiseRegion.USA,
      genericProductTypes,
    })
    return (
      productOptions.find((option) => option.value === product)?.label ??
      product
    )
  }

  const syncFormValues = () => {
    setFormValues(form.getFieldsValue(true))
  }

  const handleAvailableCheckboxChange = (
    product: EulogiseProduct,
    checked: boolean,
  ) => {
    if (!checked) {
      const currentDefaults = form.getFieldValue('defaultProducts') ?? {}
      form.setFieldsValue({
        defaultProducts: { ...currentDefaults, [product]: false },
      })
    }

    if (product === EulogiseProduct.PHOTOBOOK) {
      const allowPurchasing = form.getFieldValue('allowPurchasing') ?? {}
      const photoBooks = allowPurchasing?.photoBooks ?? {}

      if (checked) {
        form.setFieldsValue({
          allowPurchasing: {
            ...allowPurchasing,
            photoBooks: {
              ...photoBooks,
              [AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER]: true,
            },
          },
        })
      } else {
        form.setFieldsValue({
          allowPurchasing: {
            ...allowPurchasing,
            photoBooks: {
              ...photoBooks,
              [AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER]: false,
              [AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER]: false,
            },
          },
        })
      }
    }

    syncFormValues()
  }

  const handleDefaultCheckboxChange = (
    product: EulogiseProduct,
    checked: boolean,
  ) => {
    if (!checked) {
      return
    }

    const currentAvailable = form.getFieldValue('availableProducts') ?? {}
    if (!currentAvailable[product]) {
      form.setFieldsValue({
        availableProducts: { ...currentAvailable, [product]: true },
      })
    }

    if (product === EulogiseProduct.PHOTOBOOK) {
      const allowPurchasing = form.getFieldValue('allowPurchasing') ?? {}
      const photoBooks = allowPurchasing?.photoBooks ?? {}
      if (!photoBooks[AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER]) {
        form.setFieldsValue({
          allowPurchasing: {
            ...allowPurchasing,
            photoBooks: {
              ...photoBooks,
              [AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER]: true,
            },
          },
        })
      }
    }

    syncFormValues()
  }

  const handlePhotobookPurchasingCheckboxChange = (
    optionKey: AllowPurchasingProductOptionKey,
    checked: boolean,
  ) => {
    const fhCanOrder =
      optionKey === AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
        ? checked
        : form.getFieldValue([
            'allowPurchasing',
            'photoBooks',
            AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER,
          ])
    const familyCanOrder =
      optionKey === AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER
        ? checked
        : form.getFieldValue([
            'allowPurchasing',
            'photoBooks',
            AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER,
          ])

    if (fhCanOrder || familyCanOrder) {
      return
    }

    // No photobook purchasing enabled, disable photobook availability and default
    const currentAvailable = form.getFieldValue('availableProducts') ?? {}
    const currentDefaults = form.getFieldValue('defaultProducts') ?? {}
    form.setFieldsValue({
      availableProducts: {
        ...currentAvailable,
        [EulogiseProduct.PHOTOBOOK]: false,
      },
      defaultProducts: {
        ...currentDefaults,
        [EulogiseProduct.PHOTOBOOK]: false,
      },
    })
    syncFormValues()
  }

  const formSubmit = async (rawValues: IClientFormSubmitValuesNew) => {
    const allFormValues = form.getFieldsValue(true)
    const values = {
      ...rawValues,
      availableProducts:
        allFormValues.availableProducts ?? rawValues.availableProducts,
      defaultProducts:
        allFormValues.defaultProducts ?? rawValues.defaultProducts,
    }
    const isPhotobookAvailable = isProductEnabledInField({
      productField: values?.availableProducts,
      product: EulogiseProduct.PHOTOBOOK,
    })
    const isPhotobookDefault = isProductEnabledInField({
      productField: values?.defaultProducts,
      product: EulogiseProduct.PHOTOBOOK,
    })
    const photobookPurchasing = values?.allowPurchasing?.photoBooks
    const isPhotobookPurchasingEnabled =
      photobookPurchasing?.[
        AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
      ] ||
      photobookPurchasing?.[AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER]
    const country = values?.country
    const isPhotobookShippable = isPhotobookShippableForCountry(country)
    const isPhotobookCheckboxEnabledInNonShippableCountry =
      !isPhotobookShippable &&
      (isPhotobookAvailable ||
        isPhotobookDefault ||
        Boolean(isPhotobookPurchasingEnabled))
    if (isPhotobookCheckboxEnabledInNonShippableCountry) {
      const countryLabel = country ?? 'the selected country'
      Notification.error(
        `Photobooks are not shippable in ${countryLabel}. Please untick Photobook avaibility in both allowing purchase and tributes sections`,
      )
      return
    }

    const printingPurchasing = values?.allowPurchasing?.printing
    const isPrintingPurchasingEnabled =
      printingPurchasing?.[
        AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER
      ] ||
      printingPurchasing?.[AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER]
    const isPrintingShippable = isPrintingShippableForCountry(country)
    if (!isPrintingShippable && isPrintingPurchasingEnabled) {
      const countryLabel = country ?? 'the selected country'
      Notification.error(
        `Printing is not shippable in ${countryLabel}. Please untick Printing availability in allowing purchase section`,
      )
      return
    }

    if (!isPhotobookAvailable && isPhotobookPurchasingEnabled) {
      Notification.error(
        'Photobooks must be available before enabling purchasing.',
      )
      return
    }

    const availableProductsMap = mapProductFieldToAvailabilityMap(
      values?.availableProducts,
    )
    const defaultProductsField = values?.defaultProducts
    let invalidDefaultProductKey: string | undefined
    if (Array.isArray(defaultProductsField)) {
      invalidDefaultProductKey = defaultProductsField.find(
        (product: string) => !availableProductsMap?.[product],
      )
    } else {
      invalidDefaultProductKey = Object.entries(
        defaultProductsField ?? {},
      ).find(
        ([product, isDefault]) => isDefault && !availableProductsMap?.[product],
      )?.[0]
    }

    if (invalidDefaultProductKey) {
      Notification.error(
        `${getProductLabel(
          invalidDefaultProductKey,
        )} must be available before it can be default.`,
      )
      return
    }

    const isDefaultAccessEditor =
      values?.clientSignUpDefaultUserRole === EulogiseUserRole.EDITOR
    if (isDefaultAccessEditor) {
      const editorPaymentSelection = values?.editorPaymentConfig
      const hasSelectedEditorPaymentOption =
        editorPaymentSelection ===
          EulogiseEditorPaymentConfig.EDITOR_DOES_NOT_NEED_TO_PAY ||
        editorPaymentSelection === EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY
      if (!hasSelectedEditorPaymentOption) {
        Notification.error(
          'Please select whether the editor has to pay before saving.',
        )
        return
      }
    }

    const sanitizedValues = isDefaultAccessEditor
      ? values
      : {
          ...values,
          editorPaymentConfig: undefined,
        }

    const buildSubmitValues = (inputValues: any) => {
      const additionalAddress = encodeAdditionalAddressArray({
        additionalAddressAmount,
        formSubmitValues: inputValues,
      })

      const handle = inputValues.handle
      const defaultProductsArray = mapProductFieldToArray(
        inputValues.defaultProducts,
      )
      const availableProductsArray = mapProductFieldToArray(
        inputValues.availableProducts,
      )

      return {
        title: inputValues.title,
        handle: handle?.trim().length > 0 ? handle : undefined,
        clientLogoDragger: inputValues.clientLogoDragger,
        clientEmailAssetDragger: inputValues.clientEmailAssetDragger,
        clientSignUpDefaultUserRole: inputValues.clientSignUpDefaultUserRole,
        editorPaymentConfig:
          inputValues.clientSignUpDefaultUserRole === EulogiseUserRole.EDITOR
            ? inputValues.editorPaymentConfig
            : undefined,
        defaultClientSignUpText: inputValues.defaultClientSignUpText,
        country: inputValues.country,
        primaryAddress: encodePrimaryAddressArray({
          lineOne: inputValues.primaryAddressLine1,
          lineTwo: inputValues.primaryAddressLine2,
          lineThree: inputValues.primaryAddressLine3,
        }),
        clientBrandsDragger: inputValues.clientBrandsDragger,
        createCaseFamilyInviteOptions:
          inputValues.createCaseFamilyInviteOptions,
        additionalAddress: additionalAddress,
        ...(clientId ? { clientId } : {}),
        embeddedIframes: inputValues.embeddedIframes,
        allowPurchasing: inputValues.allowPurchasing,
        defaultProducts:
          AccountHelper.convertArrayToProductAvailabilityStatus(
            defaultProductsArray,
          ),
        availableProducts:
          AccountHelper.convertArrayToProductAvailabilityStatus(
            availableProductsArray,
          ),
        features: ClientHelper.convertArrayToFeatures(inputValues.features),
      }
    }
    const formattedValues = buildSubmitValues(
      sanitizedValues,
    ) as unknown as IClientFormSubmitValuesNew

    setIsSubmitting(true)
    await onFormSubmit(formattedValues)
    setIsSubmitting(false)
  }

  const clientHandleValidator = async (_: any, handle: string) => {
    if (!handle || handle === initialValues?.handle) return Promise.resolve()
    const exists = await new Promise((resolve) => {
      dispatch(
        checkClientHandleAvailability({
          handle,
          success: (exists: boolean) => {
            return resolve(exists)
          },
        }),
      )
    })
    console.log('exists', exists)
    if (exists) {
      return Promise.reject(new Error(`"${handle}" is already in use`))
    }
    return Promise.resolve()
  }

  const renderAdditionalAddressSection = () => {
    const additionalAddressIndexesArray = Array.from(
      { length: additionalAddressAmount },
      (_, i) => i + 1,
    )
    return (
      <>
        {additionalAddressIndexesArray.map((addressIndex) => {
          return (
            <>
              <StyledFieldContainer
                key={`additional-address-${addressIndex}-container`}
              >
                <StyledFieldNameText>
                  Address {addressIndex}
                </StyledFieldNameText>
                <StyledFormItem
                  key={`additional-address-${addressIndex}-container-form-item-1`}
                  name={`additionalAddress${addressIndex}Line1`}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your client address',
                    },
                  ]}
                >
                  <Input
                    key={`additional-address-${addressIndex}-input-line-1`}
                    margin={FORM_ITEM_FIELD_MARGIN}
                    placeholder="Line 1"
                    bordered={false}
                    defaultValue={''}
                  />
                </StyledFormItem>
              </StyledFieldContainer>

              <StyledFieldContainer>
                <StyledDeleteAddressButtonContainer>
                  <Button
                    key={`additional-address-${addressIndex}-delete-button`}
                    htmlType="button"
                    className="client-form-additional-address-delete"
                    buttonType={ButtonType.DANGER}
                    onClick={() =>
                      setAdditionalAddressAmount(additionalAddressAmount - 1)
                    }
                    noMarginLeft
                    noMarginRight
                  >
                    Delete
                  </Button>
                </StyledDeleteAddressButtonContainer>

                <StyledFormItem
                  key={`additional-address-${addressIndex}-container-form-item-2`}
                  name={`additionalAddress${addressIndex}Line2`}
                  rules={[
                    {
                      required: false,
                      message: 'Please enter your client address',
                    },
                  ]}
                >
                  <Input
                    key={`additional-address-${addressIndex}-input-line-2`}
                    margin={FORM_ITEM_FIELD_MARGIN}
                    placeholder="Line 2"
                    bordered={false}
                  />
                </StyledFormItem>
              </StyledFieldContainer>

              <StyledFieldContainer>
                <StyledFieldNameText />
                <StyledFormItem
                  key={`additional-address-${addressIndex}-container-form-item-3`}
                  name={`additionalAddress${addressIndex}Line3`}
                  rules={[
                    {
                      required: false,
                      message: 'Please enter your client address',
                    },
                  ]}
                >
                  <Input
                    key={`additional-address-${addressIndex}-input-line-3`}
                    margin={FORM_ITEM_FIELD_MARGIN}
                    placeholder="Line 3"
                    bordered={false}
                    defaultValue={''}
                  />
                </StyledFormItem>
              </StyledFieldContainer>
            </>
          )
        })}

        <StyledAddAdditionalAddressContainer>
          <ButtonContainerLeft>
            <Button
              noMarginLeft
              disabled={isSubmitting}
              onClick={() => {
                setAdditionalAddressAmount(additionalAddressAmount + 1)
              }}
            >
              Add Additional Address
            </Button>
          </ButtonContainerLeft>
        </StyledAddAdditionalAddressContainer>
      </>
    )
  }

  const renderPrimaryAddressSection = () => {
    return (
      <>
        <StyledFieldContainer>
          <StyledFieldNameText>Primary Address</StyledFieldNameText>
          <StyledFormItem
            name="primaryAddressLine1"
            rules={[
              { required: false, message: 'Please enter your client address' },
            ]}
          >
            <Input
              margin={FORM_ITEM_FIELD_MARGIN}
              placeholder="Line 1"
              bordered={false}
              defaultValue={''}
            />
          </StyledFormItem>
        </StyledFieldContainer>

        <StyledFieldContainer>
          <StyledFieldNameText />
          <StyledFormItem
            name="primaryAddressLine2"
            rules={[
              { required: false, message: 'Please enter your client address' },
            ]}
          >
            <Input
              margin={FORM_ITEM_FIELD_MARGIN}
              placeholder="Line 2"
              bordered={false}
              defaultValue={''}
            />
          </StyledFormItem>
        </StyledFieldContainer>

        <StyledFieldContainer>
          <StyledFieldNameText />
          <StyledFormItem
            name="primaryAddressLine3"
            rules={[
              { required: false, message: 'Please enter your client address' },
            ]}
          >
            <Input
              margin={FORM_ITEM_FIELD_MARGIN}
              placeholder="Line 3"
              bordered={false}
              defaultValue={''}
            />
          </StyledFormItem>
        </StyledFieldContainer>
      </>
    )
  }

  const renderFamilyInviteOptionSection = () => {
    return (
      <>
        <StyledCheckboxGroupContainer>
          <StyledFamilyInviteOptionTitleText>
            Family Invite Options
          </StyledFamilyInviteOptionTitleText>
          <StyledFormItem
            name="createCaseFamilyInviteOptions"
            rules={[
              {
                required: true,
                message: 'Please select at least one family invite option',
              },
            ]}
          >
            <StyledCheckboxGroup options={FAMILY_INVITE_OPTIONS} />
          </StyledFormItem>
        </StyledCheckboxGroupContainer>
      </>
    )
  }

  const renderFeaturesSection = () => {
    return (
      <StyledCheckboxGroupContainer>
        <StyledFamilyInviteOptionTitleText>
          Features
        </StyledFamilyInviteOptionTitleText>
        <StyledFormItem name="features">
          <StyledCheckboxGroup options={ClientHelper.getAllFeatureOptions()} />
        </StyledFormItem>
      </StyledCheckboxGroupContainer>
    )
  }

  const renderAllowPurchasingSection = () => {
    return (
      <StyledAllowPurchasingCheckBoxGroupContainer
        style={{ borderTopWidth: 0 }}
      >
        <StyledAllowPurchasingText>Allow Purchasing</StyledAllowPurchasingText>
        <StyledAllowPurchasingOptionContainer>
          <StyledAllowPurchasingProductText>
            Printing
          </StyledAllowPurchasingProductText>

          <StyledAllowPurchaseFormItem
            valuePropName="checked"
            name={[
              'allowPurchasing',
              'printing',
              AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER,
            ]}
          >
            <Checkbox>FH can order</Checkbox>
          </StyledAllowPurchaseFormItem>
          <StyledAllowPurchaseFormItem
            valuePropName="checked"
            name={[
              'allowPurchasing',
              'printing',
              AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER,
            ]}
          >
            <Checkbox>Family can order</Checkbox>
          </StyledAllowPurchaseFormItem>
        </StyledAllowPurchasingOptionContainer>

        <StyledAllowPurchasingOptionContainer>
          <StyledAllowPurchasingProductText>
            Video Books
          </StyledAllowPurchasingProductText>

          <StyledAllowPurchaseFormItem
            valuePropName="checked"
            name={[
              'allowPurchasing',
              'videoBooks',
              AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER,
            ]}
          >
            <Checkbox>FH can order</Checkbox>
          </StyledAllowPurchaseFormItem>
          <StyledAllowPurchaseFormItem
            valuePropName="checked"
            name={[
              'allowPurchasing',
              'videoBooks',
              AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER,
            ]}
          >
            <Checkbox>Family can order</Checkbox>
          </StyledAllowPurchaseFormItem>
        </StyledAllowPurchasingOptionContainer>

        <StyledAllowPurchasingOptionContainer>
          <StyledAllowPurchasingProductText>
            PhotoBooks
          </StyledAllowPurchasingProductText>

          <StyledAllowPurchaseFormItem
            valuePropName="checked"
            name={[
              'allowPurchasing',
              'photoBooks',
              AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER,
            ]}
          >
            <Checkbox
              onChange={(event: any) =>
                handlePhotobookPurchasingCheckboxChange(
                  AllowPurchasingProductOptionKey.FUNERAL_HOME_CAN_ORDER,
                  event.target.checked,
                )
              }
            >
              FH can order
            </Checkbox>
          </StyledAllowPurchaseFormItem>
          <StyledAllowPurchaseFormItem
            valuePropName="checked"
            name={[
              'allowPurchasing',
              'photoBooks',
              AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER,
            ]}
          >
            <Checkbox
              onChange={(event: any) =>
                handlePhotobookPurchasingCheckboxChange(
                  AllowPurchasingProductOptionKey.FAMILY_CAN_ORDER,
                  event.target.checked,
                )
              }
            >
              Family can order
            </Checkbox>
          </StyledAllowPurchaseFormItem>
        </StyledAllowPurchasingOptionContainer>
      </StyledAllowPurchasingCheckBoxGroupContainer>
    )
  }

  /**
   * Tri-state checkbox cycling for products with funeralHomes.default:
   *   undefined (inherit global default) → true (checked) → false (unchecked) → undefined
   * For products without funeralHomes.default, normal two-state toggle.
   */
  const cycleTriState = (
    fieldGroup: 'availableProducts' | 'defaultProducts',
    product: string,
    hasFuneralHomeDefault: boolean,
  ) => {
    const currentValues = form.getFieldValue(fieldGroup) ?? {}
    const currentValue = currentValues[product]

    let nextValue: boolean | undefined
    if (currentValue === true) {
      nextValue = false
    } else if (currentValue === false && hasFuneralHomeDefault) {
      nextValue = undefined
    } else {
      nextValue = true
    }

    form.setFieldsValue({
      [fieldGroup]: { ...currentValues, [product]: nextValue },
    })
    syncFormValues()

    return nextValue
  }

  const renderTributesCoreVisibilitySection = () => {
    const productOptions = AccountHelper.getAllProductOptions({
      region: EulogiseRegion.USA,
      genericProductTypes,
    })

    // Build lookup maps for funeralHomes availability flags by slug
    const funeralHomeAvailableSlugs = new Set(
      genericProductTypes
        ?.filter(
          (type) => type.availability?.funeralHomes?.available && type.slug,
        )
        .map((type) => type.slug),
    )
    const funeralHomeDefaultSlugs = new Set(
      genericProductTypes
        ?.filter(
          (type) => type.availability?.funeralHomes?.default && type.slug,
        )
        .map((type) => type.slug),
    )

    return (
      <StyledTributesCoreVisibilitySectionContainer
        style={{ borderTopWidth: 0 }}
      >
        <StyledAllowPurchasingText>Tributes</StyledAllowPurchasingText>

        {productOptions.map((product) => {
          const hasGlobalAvailable = funeralHomeAvailableSlugs.has(
            product.value,
          )
          const hasGlobalDefault = funeralHomeDefaultSlugs.has(product.value)
          const availableValue = (formValues as any)?.availableProducts?.[
            product.value
          ]
          const defaultValue = (formValues as any)?.defaultProducts?.[
            product.value
          ]
          const isAvailableIndeterminate =
            hasGlobalAvailable && availableValue === undefined
          const isDefaultIndeterminate =
            hasGlobalDefault && defaultValue === undefined

          return (
            <StyledTributesCoreVisibilityContainer key={product.value}>
              <StyledTributesCoreVisibilityProductNameText>
                {product.label}
              </StyledTributesCoreVisibilityProductNameText>
              <StyledAllowPurchaseFormItem>
                <StyledIndeterminateCheckbox
                  checked={availableValue === true}
                  indeterminate={isAvailableIndeterminate}
                  onChange={() => {
                    const next = cycleTriState(
                      'availableProducts',
                      product.value,
                      hasGlobalAvailable,
                    )
                    if (next === false || next === undefined) {
                      handleAvailableCheckboxChange(
                        product.value as EulogiseProduct,
                        false,
                      )
                    }
                  }}
                >
                  Available
                  {isAvailableIndeterminate && (
                    <StyledDefaultIndicator>(global)</StyledDefaultIndicator>
                  )}
                </StyledIndeterminateCheckbox>
              </StyledAllowPurchaseFormItem>
              <StyledAllowPurchaseFormItem>
                <StyledIndeterminateCheckbox
                  checked={defaultValue === true}
                  indeterminate={isDefaultIndeterminate}
                  onChange={() => {
                    const next = cycleTriState(
                      'defaultProducts',
                      product.value,
                      hasGlobalDefault,
                    )
                    if (next === true) {
                      handleDefaultCheckboxChange(
                        product.value as EulogiseProduct,
                        true,
                      )
                    }
                  }}
                >
                  Default
                  {isDefaultIndeterminate && (
                    <StyledDefaultIndicator>(global)</StyledDefaultIndicator>
                  )}
                </StyledIndeterminateCheckbox>
              </StyledAllowPurchaseFormItem>
            </StyledTributesCoreVisibilityContainer>
          )
        })}
      </StyledTributesCoreVisibilitySectionContainer>
    )
  }

  const renderEmbeddedFrameSettingsSection = () => {
    const embeddedIframes = formValues?.embeddedIframes
    const showWhiteBottomBar = embeddedIframes?.showWhiteBottomBar
    const allowPurchaseButton = embeddedIframes?.allowPurchaseButton
    return (
      <StyledCheckboxGroupContainer style={{ borderTopWidth: 0 }}>
        <StyledFamilyInviteOptionTitleText>
          Embedded Iframes
        </StyledFamilyInviteOptionTitleText>
        <StyledFormItem>
          <StyledFormSubItem
            valuePropName="checked"
            name={['embeddedIframes', 'showWhiteBottomBar']}
          >
            <Checkbox>Show White Bottom Bar</Checkbox>
          </StyledFormSubItem>
          <StyledFormSubItem
            valuePropName="checked"
            name={['embeddedIframes', 'allowPurchaseButton']}
          >
            <Checkbox disabled={!showWhiteBottomBar}>
              Allow Purchase Button
            </Checkbox>
          </StyledFormSubItem>
          <StyledFormSubItem name={['embeddedIframes', 'purchaseUrl']}>
            <Input
              disabled={!allowPurchaseButton || !showWhiteBottomBar}
              margin={FORM_ITEM_FIELD_MARGIN}
              placeholder="Purchase URL"
              bordered={false}
            />
          </StyledFormSubItem>
          <StyledFormSubItem name={['embeddedIframes', 'customButtonCopy']}>
            <Input
              disabled={!allowPurchaseButton || !showWhiteBottomBar}
              margin={FORM_ITEM_FIELD_MARGIN}
              placeholder="Custom Button Copy"
              bordered={false}
            />
          </StyledFormSubItem>
          <StyledFormSubItem
            valuePropName="checked"
            name={['embeddedIframes', 'showEulogizeBranding']}
          >
            <Checkbox disabled={!showWhiteBottomBar}>
              Show Eulogize Branding
            </Checkbox>
          </StyledFormSubItem>
        </StyledFormItem>
      </StyledCheckboxGroupContainer>
    )
  }

  const renderFuneralDirectorSection = () => {
    if (!clientId) {
      return <></>
    }
    return (
      <StyledFuneralDirectorsListContainer>
        <StyledFieldNameText>Funeral Directors</StyledFieldNameText>
        <FuneralDirectorList
          isLoading={isLoadingFuneralDirectors}
          funeralDirectors={funeralDirectors}
          onDelete={onRemoveFuneralDirector}
          onChange={onChangeFuneralDirector}
        />
        <CreateFuneralDirectorModal
          clientId={clientId}
          isOpen={isShowCreateModal}
          onClose={() => setIsShowCreateModal(false)}
          onCreated={(funeralDirector) => {
            setIsShowCreateModal(false)
            if (onCreatedFuneralDirector) {
              onCreatedFuneralDirector(funeralDirector)
            }
          }}
        />
        <StyledAddFuneralDirectorButtonContainer>
          <ButtonContainerLeft>
            <Button
              disabled={isSubmitting}
              noMarginLeft
              onClick={() => {
                setIsShowCreateModal(true)
              }}
            >
              Add Funeral Director
            </Button>
          </ButtonContainerLeft>
        </StyledAddFuneralDirectorButtonContainer>
      </StyledFuneralDirectorsListContainer>
    )
  }

  const renderClientLogoSection = () => {
    return (
      <StyledLogoContainer>
        <StyledLogoTitle>Client Logo</StyledLogoTitle>
        <StyledFormItem
          name="clientLogoDragger"
          noStyle
          valuePropName="fileList"
        >
          <ClientLogoDragger clientId={clientId} clientLogo={clientLogo} />
        </StyledFormItem>
      </StyledLogoContainer>
    )
  }

  const renderClientEmailAssetSection = () => {
    return (
      <StyledLogoContainer>
        <StyledLogoTitle>Client Email Asset</StyledLogoTitle>
        <StyledFormItem
          name="clientEmailAssetDragger"
          noStyle
          valuePropName="fileList"
        >
          <ClientEmailAssetDragger
            clientId={clientId}
            clientEmailAsset={clientEmailAsset}
          />
        </StyledFormItem>
      </StyledLogoContainer>
    )
  }

  const renderClientBrandSection = () => {
    return (
      <>
        <StyledLogoContainer>
          <StyledClientBrandsTitleContainer>
            <StyledLogoTitle>Client Brand</StyledLogoTitle>
            <StyledClientBrandDeleteButtonContainer>
              <Button
                disabled={initialValues?.clientBrandHandles?.length === 0}
                htmlType="button"
                className="client-form-exsited-brands-modal"
                buttonType={ButtonType.PRIMARY}
                onClick={() =>
                  dispatch(showModalAction(ModalId.VIEW_CLIENT_BRANDS))
                }
                noMarginLeft
                noMarginRight
              >
                View uploaded brands (
                {initialValues?.clientBrandHandles?.length ?? 0})
              </Button>
            </StyledClientBrandDeleteButtonContainer>
          </StyledClientBrandsTitleContainer>

          <StyledFormItem
            name="clientBrandsDragger"
            noStyle
            valuePropName="fileList"
          >
            <ClientBrandDragger clientId={clientId} clientLogo={clientLogo} />
          </StyledFormItem>
        </StyledLogoContainer>
      </>
    )
  }

  const defaultProductsWithFallback =
    normalizedInitialValues?.defaultProducts ?? INITIAL_DEFAULT_PRODUCTS
  const defaultProducts = shouldDisablePhotobookOnInitialLoad
    ? setProductAvailabilityStatus({
        productField: defaultProductsWithFallback,
        product: EulogiseProduct.PHOTOBOOK,
        isEnabled: false,
      })
    : defaultProductsWithFallback
  const availableProductsWithFallback =
    normalizedInitialValues?.availableProducts ??
    normalizedInitialValues?.defaultProducts ??
    INITIAL_DEFAULT_PRODUCTS
  const availableProducts = shouldDisablePhotobookOnInitialLoad
    ? setProductAvailabilityStatus({
        productField: availableProductsWithFallback,
        product: EulogiseProduct.PHOTOBOOK,
        isEnabled: false,
      })
    : availableProductsWithFallback
  const features = normalizedInitialValues?.features ?? INITIAL_FEATURES
  const createCaseFamilyInviteOptions =
    normalizedInitialValues?.createCaseFamilyInviteOptions ?? [
      IClientFamilyInviteOptions.EDITOR,
    ]
  const allowPurchasing =
    shouldDisablePhotobookOnInitialLoad || shouldDisablePrintingOnInitialLoad
      ? getAllowPurchasingWithCountryShippingRestrictions({
          allowPurchasing: normalizedInitialValues?.allowPurchasing,
          shouldDisablePhotobook: shouldDisablePhotobookOnInitialLoad,
          shouldDisablePrinting: shouldDisablePrintingOnInitialLoad,
        })
      : normalizedInitialValues?.allowPurchasing
  const shouldDisplayEditorPaymentOptions =
    formValues?.clientSignUpDefaultUserRole === EulogiseUserRole.EDITOR

  return (
    <StyledCreateOrEditClientFormNew
      form={form}
      ref={formRef}
      name="create-client-form"
      className="create-client-form"
      initialValues={{
        ...normalizedInitialValues,
        createCaseFamilyInviteOptions,
        defaultProducts,
        availableProducts,
        allowPurchasing,
        features:
          ClientHelper.convertFeatureAvailabilityStatusToArray(features),
      }}
      onValuesChange={(changedValues: any, allValues: any) => {
        if (
          changedValues?.clientSignUpDefaultUserRole ===
          EulogiseUserRole.COEDITOR
        ) {
          form.setFieldsValue({
            editorPaymentConfig: undefined,
          })
        }
        setFormValues(allValues)
      }}
      onFinish={(values: any) => formSubmit(values)}
    >
      <StyledFieldContainer>
        <StyledFieldNameText>Business Name</StyledFieldNameText>
        <StyledFormItem
          name="title"
          rules={[
            { required: true, message: 'Please enter your client title' },
          ]}
        >
          <Input
            margin={FORM_ITEM_FIELD_MARGIN}
            placeholder="New client business name"
            bordered={false}
          />
        </StyledFormItem>
      </StyledFieldContainer>

      <StyledFieldContainer>
        <StyledFieldNameText>Handle</StyledFieldNameText>
        <StyledFormItem
          name="handle"
          rules={[
            {
              validator: clientHandleValidator,
              message: 'This handle is already in use',
            },
            {
              pattern: /^[a-zA-Z0-9-]+$/,
              message: 'Handle cannot contain spaces or special characters',
            },
          ]}
        >
          <Input margin={FORM_ITEM_FIELD_MARGIN} placeholder="Url handle" />
        </StyledFormItem>
        <StyledFormItemPlaceholder shouldUpdate>
          {({ getFieldValue, getFieldsError }) => {
            const handle = getFieldValue('handle')
            const fieldsError = getFieldsError(['handle'])
            if (fieldsError[0].errors.length > 0) {
              return null
            }
            const clientHandleUrl = AdminHelper.getClientHandleUrl(handle)
            return (
              handle && (
                <div>
                  {clientHandleUrl}{' '}
                  <Tooltip title={copiedHandle ? 'Copied' : 'Copy'}>
                    <CopyAssetIcon
                      onClick={() => {
                        copyToClipboard(clientHandleUrl)
                        setCopiedHandle(true)
                      }}
                    />
                  </Tooltip>
                </div>
              )
            )
          }}
        </StyledFormItemPlaceholder>
        <div>
          <Button
            icon={<QRCodeIcon />}
            buttonType={ButtonType.SECONDARY}
            onClick={() => {
              setIsShowQRCodeModal(true)
            }}
          >
            Show QR Code
          </Button>
        </div>
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledFieldNameText>Default Copy</StyledFieldNameText>
        <StyledFormItem name="defaultClientSignUpText">
          <Input
            margin={`0`}
            placeholder={SIGN_UP_HEADER_CONTENT}
            bordered={false}
          />
        </StyledFormItem>
      </StyledFieldContainer>
      <StyledFieldContainer>
        <StyledFieldNameText>Default Access</StyledFieldNameText>
        <StyledFormItem name="clientSignUpDefaultUserRole">
          <StyledRadioGroup>
            <Radio value={EulogiseUserRole.EDITOR}>Editor</Radio>
            <Radio value={EulogiseUserRole.COEDITOR}>Coeditor</Radio>
          </StyledRadioGroup>
        </StyledFormItem>
      </StyledFieldContainer>
      {shouldDisplayEditorPaymentOptions && (
        <StyledFieldContainer>
          <StyledFieldNameText>Should Editor Pay</StyledFieldNameText>
          <StyledFormItem name="editorPaymentConfig">
            <StyledRadioGroup>
              <Radio
                value={EulogiseEditorPaymentConfig.EDITOR_DOES_NOT_NEED_TO_PAY}
              >
                Editor does not need to pay
              </Radio>
              <Radio value={EulogiseEditorPaymentConfig.EDITOR_HAS_TO_PAY}>
                Editor has to pay
              </Radio>
            </StyledRadioGroup>
          </StyledFormItem>
        </StyledFieldContainer>
      )}

      <StyledFieldContainer>
        <StyledFieldNameText>Region</StyledFieldNameText>
        <StyledFormItem
          name="country"
          rules={[
            {
              required: true,
              message: 'Please enter your client country for cases',
            },
          ]}
        >
          <StyledSelect
            disabled={isCountryDisabled}
            bordered={false}
            placeholder=""
            options={EULOGISE_COUNTRIES_REGIONS_OPTIONS}
          />
        </StyledFormItem>
      </StyledFieldContainer>

      {renderPrimaryAddressSection()}

      {renderAdditionalAddressSection()}

      {renderFamilyInviteOptionSection()}

      {renderFeaturesSection()}

      {renderTributesCoreVisibilitySection()}

      {renderEmbeddedFrameSettingsSection()}

      {renderAllowPurchasingSection()}

      {renderFuneralDirectorSection()}

      {renderClientLogoSection()}

      {renderClientEmailAssetSection()}

      {renderClientBrandSection()}

      <StyledButtonsContainer>
        <ButtonContainerLeft>
          <Button disabled={isSubmitting || true} onClick={() => {}}>
            Add Brand Video Slide
          </Button>
        </ButtonContainerLeft>
        <ButtonContainerRight>
          <Button
            htmlType="button"
            className="client-form-cancel"
            noMarginLeft
            buttonType={ButtonType.TRANSPARENT}
            onClick={() => onCreateClientCancel()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            className="client-delete"
            noMarginLeft
            loading={isSubmitting}
            disabled={isSubmitting}
            buttonType={ButtonType.DANGER}
            onClick={() => {
              dispatch(
                showModalAction(ModalId.DELETE_CLIENT_MODAL, {
                  clientId: clientId!,
                }),
              )
            }}
          >
            Delete
          </Button>
          <Button
            htmlType="submit"
            className="client-form-submit"
            noMarginLeft
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {submitText}
          </Button>
        </ButtonContainerRight>
      </StyledButtonsContainer>

      {isViewClientBrandsModalOpened && (
        <ViewClientBrandsModal
          clientBrandHandles={initialValues?.clientBrandHandles!}
          clientLogoHandle={clientLogo}
          clientId={clientId!}
          clientData={client}
          funeralDirectors={funeralDirectors ?? []}
          onSetClient={(c: IClientData) => onSetClient!(c)}
        />
      )}
      {isShowQRCodeModal && formValues?.handle && (
        <QRCodeModal
          title="Client Log in Page"
          content={AdminHelper.getClientHandleUrl(formValues?.handle)}
          onCloseClick={() => {
            setIsShowQRCodeModal(false)
          }}
        />
      )}
    </StyledCreateOrEditClientFormNew>
  )
}
