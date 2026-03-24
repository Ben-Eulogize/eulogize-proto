import React from 'react'
import ServiceCard from '../ServiceCard'
import BookmarkIcon from '../../../../assets/dashboard/memorial-page-bookmark-2.svg'
import { EulogiseProduct } from '@eulogise/core'

interface IBookmarkServiceCardProps {}

const BookmarkServiceCard: React.FunctionComponent<
  IBookmarkServiceCardProps
> = () => (
  <ServiceCard
    id="bookmark-card"
    data-testId="bookmark-card"
    icon={BookmarkIcon}
    product={EulogiseProduct.BOOKMARK}
  />
)

export default BookmarkServiceCard
