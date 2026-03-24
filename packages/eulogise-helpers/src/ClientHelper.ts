import {
  EulogiseProduct,
  EulogizeFeature,
  EulogizeFeatureName,
  IEulogizeFeatureAvailabilityStatus,
} from '@eulogise/core'

export class ClientHelper {
  public static getAllFeatures(): Array<EulogizeFeature> {
    return [EulogizeFeature.SLIDESHOW_VB]
  }

  public static getFeatureName(feature: EulogizeFeature): string {
    return EulogizeFeatureName[feature]
  }

  public static getAllFeatureOptions(): Array<{
    value: string
    label: string
  }> {
    return this.getAllFeatures().map((feature) => ({
      value: feature,
      label: this.getFeatureName(feature),
    }))
  }

  public static convertArrayToFeatures(
    features: Array<string>,
  ): IEulogizeFeatureAvailabilityStatus {
    return features.reduce(
      (acc: IEulogizeFeatureAvailabilityStatus, key: string) => ({
        ...acc,
        [key]: true,
      }),
      {} as IEulogizeFeatureAvailabilityStatus,
    )
  }

  public static convertFeatureAvailabilityStatusToArray(
    featureStatuses: IEulogizeFeatureAvailabilityStatus,
  ): Array<string> {
    return Object.keys(featureStatuses).filter(
      (key) => featureStatuses[key as EulogizeFeature] === true,
    ) as Array<EulogiseProduct>
  }
}
