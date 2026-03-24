import React from 'react'
import Helmet from 'react-helmet'

interface ILoadGoogleFontProps {
  fontFamily: string
  fontWeight?: number | string
}

export const LoadGoogleFont: React.FC<ILoadGoogleFontProps> = ({
  fontFamily,
  fontWeight,
}) => {
  const fontFamilyString: string = fontFamily.trim().replace(/\s/g, '+')
  const fontWeightString: string = fontWeight ? `:wght@${fontWeight}` : ''
  const url: string = `https://fonts.googleapis.com/css2?family=${fontFamilyString}${fontWeightString}&display=swap`
  return (
    <Helmet>
      {/* @ts-ignore */}
      <link href={url} rel="stylesheet" />
    </Helmet>
  )
}
