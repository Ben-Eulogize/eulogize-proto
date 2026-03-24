import { ISlideshowTheme } from '@eulogise/core'
import { linenSlideshowImage } from '@eulogise/core'

export const MOCK_SLIDESHOW_THEME_1: ISlideshowTheme = {
  id: 'aura',
  name: 'Aura',
  thumbnail: {
    images: [linenSlideshowImage],
  },
  content: {
    themeDefaultImageFilter: 'none',
    slideshowTransitionIn: 'crossBlur',
    slideshowTransitionOut: 'crossFade',
    slideshowBackground: {
      color: 'ghostwhite',
      image: {
        filepath: 'slideshow/themes/title-slide-images/Aura/aura-basic.jpg',
      },
      enlarge: [true],
    },
    slideBackground: {
      getImage: [null],
      blurred: [false],
    },
    image: {
      borderSettings: {
        enabled: true,
      },
    },
    slideTransitions: [
      // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
      {
        in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
        out: { type: 'fadeOut', duration: 2000, delay: 0 },
        animation: 'zoomIn',
      },
    ],
    transitionDuration: 2000,
    slideshowDefaultThemeTracks: {
      title: 'Broken',
    },
  },
}
