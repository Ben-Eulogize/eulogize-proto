import React from 'react'

export const NoOfSlidesMessage = ({
  noOfSlides,
  title,
}: {
  noOfSlides?: number
  title?: string
}) => (
  <div>
    {title ? title : `Number of Photos: `}
    {noOfSlides !== undefined ? noOfSlides : 'N/A'}
  </div>
)
