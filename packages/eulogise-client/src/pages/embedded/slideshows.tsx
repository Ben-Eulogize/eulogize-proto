import React from 'react'
import styled from 'styled-components'
import { PageProps } from 'gatsby'
import { SlideshowHelper, UrlHelper } from '@eulogise/helpers'
import { EulogisePage } from '@eulogise/core'
import { COLOR } from '@eulogise/client-core'

const StyledVideo = styled.video`
  width: 100%;
  height: 70rem;
  display: block;
  max-height: 100vh;
  background-color: ${COLOR.BLACK};

  body:has(&) {
    overflow: hidden;
    #fc_frame {
      display: none;
    }
  }
`

const StyledEmbeddedSlideshow = styled.div``

const EmbeddedSlideshows = ({ location }: PageProps) => {
  const { caseId } = UrlHelper.getParams(EulogisePage.EMBEDDED_SLIDESHOW, {
    pathname: location.pathname,
  })

  const posterUrl = SlideshowHelper.getSlideshowS3PosterUrl({ caseId })
  const generatedSlideshowUrl = SlideshowHelper.getGeneratedSlideshowUrl({
    caseId,
  })

  return (
    <StyledEmbeddedSlideshow>
      <StyledVideo
        controls
        controlsList="nodownload"
        poster={posterUrl}
        preload="none"
      >
        <source src={generatedSlideshowUrl} type="video/mp4" />
        Your browser doesn't support HTML5 video.
      </StyledVideo>
    </StyledEmbeddedSlideshow>
  )
}

export default EmbeddedSlideshows
