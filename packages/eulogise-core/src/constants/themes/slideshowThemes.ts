// TODO: this need to be moved to environment variables
import {
  auraSlideshowImage,
  classicSlideshowImage,
  fallFlowersSlideshowImage,
  fullWidthSlideshowImage,
  goldRosesSlideshowImage,
  graceSlideshowImage,
  grandeurSlideshowImage,
  linenSlideshowImage,
  minimalArchSlideshowImage,
  minimalCollageSlideshowImage,
  modernMinimalSlideshowImage,
  pastelBlueRosesSlideshowImage,
  pinkLinenSlideshowImage,
  reflectionSlideshowImage,
  watercolorSailingSlideshowImage,
} from './thumbnailImages'
import { ISlideshowTheme } from '../../types'

export const SLIDESHOW_THEMES: Array<ISlideshowTheme> = [
  {
    id: 'gold-roses',
    name: 'Gold Roses',
    thumbnail: {
      images: [goldRosesSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'crossFade',
      slideshowTransitionOut: 'crossFade',
      slideBackground: {
        getImage: [null],
        blurred: [false],
      },
      slideshowBackground: {
        color: 'ghostwhite',
        image: {
          filepath: 'backgroundImages/Gold_Roses/AU/Gold_Roses_SLIDESHOW.jpg',
        },
      },
      image: {
        borderSettings: {
          enabled: false,
        },
      },
      slideTransitions: [
        // Dissolve	2000	500	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Slide Right	1600	800	Slide Right	1200	0	Slide Right
        {
          in: { type: 'slideRightIn', duration: 1600, delay: 800 },
          out: { type: 'slideRightOut', duration: 1200, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Slide up	1600	800	slide up	1200	0	Slide Up
        {
          in: { type: 'slideUpIn', duration: 1600, delay: 800 },
          out: { type: 'slideUpOut', duration: 1200, delay: 0 },
          animation: 'slideUp',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Slide Right	1600	800	Slide right	1200	0	Slide Right
        {
          in: { type: 'slideRightIn', duration: 1600, delay: 800 },
          out: { type: 'slideRightOut', duration: 1200, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Slide Down	1600	800	Slide down	1200	0	Slide Down
        {
          in: { type: 'slideDownIn', duration: 1600, delay: 800 },
          out: { type: 'slideDownOut', duration: 1200, delay: 0 },
          animation: 'slideDown',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Canon - Pachelbel',
      },
    },
  },
  {
    id: 'pastel-blue-roses',
    name: 'Pastel Blue Roses',
    thumbnail: {
      images: [pastelBlueRosesSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'crossFade',
      slideshowTransitionOut: 'crossFade',
      slideBackground: {
        getImage: [null],
        blurred: [false],
      },
      slideshowBackground: {
        color: 'ghostwhite',
        image: {
          filepath:
            'backgroundImages/Blue_Pastel_Flowers/AU/Blue_Pastel_Flowers_SLIDESHOW.jpg',
        },
      },
      image: {
        borderSettings: {
          enabled: false,
        },
      },
      slideTransitions: [
        // Dissolve	2000	500	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Slide Right	1600	800	Slide Right	1200	0	Slide Right
        {
          in: { type: 'slideRightIn', duration: 1600, delay: 800 },
          out: { type: 'slideRightOut', duration: 1200, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Slide up	1600	800	slide up	1200	0	Slide Up
        {
          in: { type: 'slideUpIn', duration: 1600, delay: 800 },
          out: { type: 'slideUpOut', duration: 1200, delay: 0 },
          animation: 'slideUp',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Slide Right	1600	800	Slide right	1200	0	Slide Right
        {
          in: { type: 'slideRightIn', duration: 1600, delay: 800 },
          out: { type: 'slideRightOut', duration: 1200, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Slide Down	1600	800	Slide down	1200	0	Slide Down
        {
          in: { type: 'slideDownIn', duration: 1600, delay: 800 },
          out: { type: 'slideDownOut', duration: 1200, delay: 0 },
          animation: 'slideDown',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Canon - Pachelbel',
      },
    },
  },
  {
    id: 'fall-flowers',
    name: 'Fall Flowers',
    thumbnail: {
      images: [fallFlowersSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'none',
      slideshowTransitionOut: 'crossFade',
      slideshowBackground: {
        color: 'ghostwhite',
        image: {
          filepath:
            'backgroundImages/Fall_Flowers/AU/Fall_Flowers_SLIDESHOW.jpg',
        },
      },
      slideBackground: {
        getImage: [null],
        blurred: [false],
      },
      image: {
        borderSettings: {
          enabled: false,
        },
      },
      // Warp	1500	1000	Warp	2000	0	Slide Right
      slideTransitions: [
        // Wipe	2000	1000	Dissolve with zoom	2000	0	None
        {
          in: { type: 'wipeLeftIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Dissolve	1500	1500	Warp	2000	0	None
        {
          in: { type: 'fadeIn', duration: 1500, delay: 1500 },
          out: { type: 'warpRightOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Warp	1500	1250	Slide Up	2000	0	None
        {
          in: { type: 'warpRightIn', duration: 1500, delay: 1250 },
          out: { type: 'slideUpOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Slide Up	1500	500	Slide Right	2000	0	None
        {
          in: { type: 'slideUpIn', duration: 1500, delay: 500 },
          out: { type: 'slideRightOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Slide Right	1500	1000	Wipe	2000	0	None
        {
          in: { type: 'slideRightIn', duration: 1500, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Wipe	2000	1000	Dissolve with Zoom	2000	0	None
        {
          in: { type: 'wipeLeftIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Dissolve	1500	1500	Warp	2000	0	None
        {
          in: { type: 'fadeIn', duration: 1500, delay: 1500 },
          out: { type: 'warpRightOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Warp	1500	1250	Slide Down	2000	0	None
        {
          in: { type: 'warpRightIn', duration: 1500, delay: 1250 },
          out: { type: 'slideDownOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Slide down	1500	500	Slide right	2000	0	None
        {
          in: { type: 'slideDownIn', duration: 1500, delay: 500 },
          out: { type: 'slideRightOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Slide Right	1500	1000	Wipe	2000	0	None
        {
          in: { type: 'slideRightIn', duration: 1500, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'By your side',
      },
    },
  },
  {
    id: 'watercolor-sailing',
    name: 'Watercolor Sailing',
    thumbnail: {
      images: [watercolorSailingSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'crossFade',
      slideshowTransitionOut: 'crossFade',
      slideshowBackground: {
        color: 'ghostwhite',
        image: {
          filepath:
            'backgroundImages/Sailing_Watercolor/AU/Sailing_Watercolor_SLIDESHOW.jpg',
        },
        enlarge: [true],
      },
      slideBackground: {
        getImage: [null],
        blurred: [false],
      },
      image: {
        borderSettings: {
          enabled: false,
        },
      },
      slideTransitions: [
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Up	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideUpIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Down	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideDownIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Up	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideUpIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Down	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideDownIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Up	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideUpIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Down	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideDownIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Broken',
      },
    },
  },
  {
    id: 'pink-pastel',
    name: 'Pink Pastel',
    thumbnail: {
      images: [pinkLinenSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'none',
      slideshowTransitionOut: 'crossFade',
      slideshowBackground: {
        color: 'whitesmoke',
        image: {
          filepath: 'backgroundImages/Pastel_Pink/AU/Pastel_Pink_SLIDESHOW.jpg',
        },
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
      // Warp	1500	1000	Warp	2000	0	Slide Right
      slideTransitions: [
        {
          in: { type: 'warpRightIn', duration: 1500, delay: 1000 },
          out: { type: 'warpRightOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Peace be with you',
      },
    },
  },
  {
    id: 'minimal-arch',
    name: 'Minimal Arch',
    thumbnail: {
      images: [minimalArchSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'crossFade',
      slideshowTransitionOut: 'crossFade',
      slideBackground: {
        getImage: ['next'],
        blurred: [true],
      },
      image: {
        borderSettings: {
          enabled: false,
        },
      },
      // Warp	1500	1000	Warp	2000	0	Slide Right
      slideTransitions: [
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Slide Right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Lilac',
      },
    },
  },
  {
    id: 'minimal-collage',
    name: 'Minimal Collage',
    thumbnail: {
      images: [minimalCollageSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'crossFade',
      slideshowTransitionOut: 'crossFade',
      slideBackground: {
        getImage: ['next'],
        blurred: [true],
      },
      image: {
        borderSettings: {
          enabled: false,
        },
      },
      // Warp	1500	1000	Warp	2000	0	Slide Right
      slideTransitions: [
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Slide Right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Lilac',
      },
    },
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    thumbnail: {
      images: [modernMinimalSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'crossBlur',
      slideshowTransitionOut: 'crossFade',
      slideBackground: {
        getImage: [null],
        blurred: [false],
      },
      slideshowBackground: {
        color: 'ghostwhite',
        image: {
          filepath: 'backgroundImages/Blue_Stripe/AU/Blue_Stripe_SLIDESHOW.jpg',
        },
        enlarge: [true],
      },
      image: {
        borderSettings: {
          enabled: true,
        },
      },
      // Warp	1500	1000	Warp	2000	0	Slide Right
      slideTransitions: [
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Up	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideUpIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Down	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideDownIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Up	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideUpIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Down	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideDownIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Up	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideUpIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Down	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideDownIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Broken',
      },
    },
  },
  {
    id: 'full-width',
    name: 'Full Width',
    thumbnail: {
      images: [fullWidthSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'crossFade',
      slideshowTransitionOut: 'crossFade',
      slideBackground: {
        getImage: ['next'],
        blurred: [true],
      },
      image: {
        borderSettings: {
          enabled: false,
        },
      },
      slideTransitions: [
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Slide Right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Lilac',
      },
    },
  },
  {
    id: 'aura',
    name: 'Aura',
    thumbnail: {
      images: [auraSlideshowImage],
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
        getImage: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
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
        // Slide Up	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideUpIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Down	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideDownIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Up	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideUpIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Down	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideDownIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Up	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideUpIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Down	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'slideDownIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Slide Right	2000	1000	Dissolve with zoom	2000	0	Zoom in
        {
          in: { type: 'slideRightIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Broken',
      },
    },
  },
  {
    id: 'grandeur',
    name: 'Grandeur',
    thumbnail: {
      images: [grandeurSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'crossFade',
      slideshowTransitionOut: 'crossFade',
      slideshowBackground: {
        color: 'ghostwhite',
        image: {
          filepath:
            'slideshow/themes/title-slide-images/Granduer/granduer-basic.jpg',
        },
      },
      slideBackground: {
        getImage: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        blurred: [false],
      },
      image: {
        borderSettings: {
          enabled: false,
        },
      },
      slideTransitions: [
        // Wipe	2000	1000	Dissolve with zoom	2000	0	None
        {
          in: { type: 'wipeLeftIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Dissolve	1500	1500	Warp	2000	0	None
        {
          in: { type: 'fadeIn', duration: 1500, delay: 1500 },
          out: { type: 'warpRightOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Warp	1500	1250	Slide Up	2000	0	None
        {
          in: { type: 'warpRightIn', duration: 1500, delay: 1250 },
          out: { type: 'slideUpOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Slide Up	1500	500	Slide Right	2000	0	None
        {
          in: { type: 'slideUpIn', duration: 1500, delay: 500 },
          out: { type: 'slideRightOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Slide Right	1500	1000	Wipe	2000	0	None
        {
          in: { type: 'slideRightIn', duration: 1500, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Wipe	2000	1000	Dissolve with Zoom	2000	0	None
        {
          in: { type: 'wipeLeftIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOutZoomIn', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Dissolve	1500	1500	Warp	2000	0	None
        {
          in: { type: 'fadeIn', duration: 1500, delay: 1500 },
          out: { type: 'warpRightOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Warp	1500	1250	Slide Down	2000	0	None
        {
          in: { type: 'warpRightIn', duration: 1500, delay: 1250 },
          out: { type: 'slideDownOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Slide down	1500	500	Slide right	2000	0	None
        {
          in: { type: 'slideDownIn', duration: 1500, delay: 500 },
          out: { type: 'slideRightOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
        // Slide Right	1500	1000	Wipe	2000	0	None
        {
          in: { type: 'slideRightIn', duration: 1500, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'none',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'By your side',
      },
    },
  },
  {
    id: 'linen',
    name: 'Linen',
    thumbnail: {
      images: [linenSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'none',
      slideshowTransitionOut: 'crossFade',
      slideshowBackground: {
        color: 'whitesmoke',
        image: {
          filepath: 'slideshow/themes/title-slide-images/Linen/linen-basic.jpg',
        },
      },
      slideBackground: {
        getImage: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        blurred: [false],
      },
      image: {
        borderSettings: {
          enabled: true,
        },
      },
      slideTransitions: [
        // Warp	1500	1000	Warp	2000	0	Slide Right
        {
          in: { type: 'warpRightIn', duration: 1500, delay: 1000 },
          out: { type: 'warpRightOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Peace be with you',
      },
    },
  },
  {
    id: 'reflection',
    name: 'Reflection',
    thumbnail: {
      images: [reflectionSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'crossFade',
      slideshowTransitionOut: 'crossFade',
      slideBackground: {
        getImage: ['next'],
        blurred: [true],
      },
      image: {
        borderSettings: {
          enabled: false,
        },
      },
      slideTransitions: [
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Slide Right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	1000	Dissolve	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Slide right
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	1000	Wipe	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 1000 },
          out: { type: 'wipeLeftOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Lilac',
      },
    },
  },
  {
    id: 'classic',
    name: 'Classic',
    thumbnail: {
      images: [classicSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'none',
      slideshowTransitionIn: 'crossFade',
      slideshowTransitionOut: 'crossFade',
      slideshowBackground: {
        color: 'ghostwhite',
        image: {
          filepath:
            'slideshow/themes/title-slide-images/Classic/classic-basic.jpg',
        },
      },
      slideBackground: {
        getImage: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ],
        blurred: [false],
      },
      image: {
        borderSettings: {
          enabled: true,
        },
      },
      slideTransitions: [
        // Dissolve	2000	500	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Slide Right	1600	800	Slide Right	1200	0	Slide Right
        {
          in: { type: 'slideRightIn', duration: 1600, delay: 800 },
          out: { type: 'slideRightOut', duration: 1200, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Slide up	1600	800	slide up	1200	0	Slide Up
        {
          in: { type: 'slideUpIn', duration: 1600, delay: 800 },
          out: { type: 'slideUpOut', duration: 1200, delay: 0 },
          animation: 'slideUp',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Slide Right	1600	800	Slide right	1200	0	Slide Right
        {
          in: { type: 'slideRightIn', duration: 1600, delay: 800 },
          out: { type: 'slideRightOut', duration: 1200, delay: 0 },
          animation: 'slideRight',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom in
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomIn',
        },
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
        // Slide Down	1600	800	Slide down	1200	0	Slide Down
        {
          in: { type: 'slideDownIn', duration: 1600, delay: 800 },
          out: { type: 'slideDownOut', duration: 1200, delay: 0 },
          animation: 'slideDown',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Canon - Pachelbel',
      },
    },
  },
  {
    id: 'grace',
    name: 'Grace',
    thumbnail: {
      images: [graceSlideshowImage],
    },
    content: {
      themeDefaultImageFilter: 'inkwell',
      slideshowTransitionIn: 'none',
      slideshowTransitionOut: 'slideRight',
      slideBackground: {
        getImage: ['next'],
        blurred: [true],
      },
      image: {
        borderSettings: {
          enabled: false,
        },
      },
      slideTransitions: [
        // Dissolve	2000	500	Dissolve	2000	0	Zoom Out
        {
          in: { type: 'fadeIn', duration: 2000, delay: 500 },
          out: { type: 'fadeOut', duration: 2000, delay: 0 },
          animation: 'zoomOut',
        },
      ],
      transitionDuration: 2000,
      slideshowDefaultThemeTracks: {
        title: 'Requiem',
      },
    },
  },
]
