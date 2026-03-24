import {
  AlignmentType,
  CardProductContentItemType,
  CardProductPageOrientation,
  CardProductPageSize,
  EulogiseImageOrientation,
  EulogisePhotobookCoverType,
  EulogiseResource,
  ICardProductData,
  ICardProductFadeEdgeType,
  ICardProductFrameAvailability,
  ICardProductPage,
  IFindRequestBody,
  IFindRequestResponse,
  IFindResponse,
  MemorialVisualStatus,
  ResourceFileStatus,
} from '@eulogise/core'
import { MOCK_USER_1 } from '../users'
import { MOCK_CASE_1 } from '../cases'

const MOCK_PHOTOBOOK_PAGES: Array<ICardProductPage> = [
  {
    rows: [],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    isTitlePageLayout: true,
    rows: [
      {
        data: {
          divider: {
            asset: {
              filepath: null,
              name: 'Divider 20',
              id: null,
            },
          },
          height: 10,
        },
        type: CardProductContentItemType.SPACE,
        id: 'kowb8w07',
      },
      {
        type: 'text',
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 22,
            font: 'Lora',
          },
          width: 344,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                depth: 0,
                data: {},
                inlineStyleRanges: [],
                text: 'Forever in our Hearts',
                type: 'unstyled',
                key: '2c4oi',
                entityRanges: [],
              },
            ],
            entityMap: {},
          },
          height: 31,
        },
        id: '1p5p6dyf',
      },
      {
        data: {
          enableBorder: false,
          width: 282,
          alignment: AlignmentType.CENTER,
          content: {
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
            lockAspectRatio: false,
            width: 282,
            id: 'w58ut2pi',
            type: 'rows',
            items: [
              {
                id: 'lsx8vp0i',
                borderRadius: '0px',
                type: 'content',
                content: {
                  orientation: EulogiseImageOrientation.PORTRAIT,
                  transformY: -242.20228523063903,
                  filename:
                    'VLc8fHTFQ1u0rNQmBwFi_jack-finnigan-rriAI0nhcbc-unsplash copy.jpg',
                  renderImageHeight: 480.40457046127807,
                  transformX: -145,
                  filepath:
                    'cases/4e8ad7d4-f650-4d0c-a16e-2c1f1f3e7c2c/gallery/VLc8fHTFQ1u0rNQmBwFi_jack-finnigan-rriAI0nhcbc-unsplash copy.jpg',
                  width: 2363,
                  renderImageWidth: 286,
                  type: 'image',
                  filestackHandle: '5JN4f1rSjWodgqV1LobR',
                  height: 3992,
                },
              },
            ],
            height: 282.21,
          },
          isFullWidth: false,
          height: 282.21,
        },
        type: CardProductContentItemType.FRAME,
        id: 'modern-minimal-front-img',
      },
      {
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: 344,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                depth: 0,
                data: {},
                inlineStyleRanges: [],
                text: 'Deceased 888',
                type: 'paragraph-one',
                key: '9hqe8',
                entityRanges: [],
              },
            ],
            entityMap: {},
          },
          height: 20,
        },
        type: 'text',
        id: 'tjg3h0xm',
      },
      {
        data: {
          margin: [0, 0],
          rowStyle: {
            fontSize: 14,
            font: 'Lora',
          },
          width: 344,
          style: 'unstyled',
          alignment: 'center',
          content: {
            blocks: [
              {
                depth: 0,
                data: {},
                inlineStyleRanges: [],
                text: 'May 25th 1930 - May 7th 2025',
                type: 'paragraph-one',
                key: '36l6i',
                entityRanges: [],
              },
            ],
            entityMap: {},
          },
          height: 20,
        },
        type: 'text',
        id: 'q3azuzcv',
      },
    ],
    layoutId: 'photobook-square-with-top-phase-and-bottom-details-layout',
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 70.06055555555554,
        },
        height: 70.06055555555554,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.NONE,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [
                EulogiseImageOrientation.PORTRAIT,
                EulogiseImageOrientation.PORTRAIT,
                EulogiseImageOrientation.PORTRAIT,
              ],
            },
            width: 537.95,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'columns',
            layoutId: 'photobook-frame-three-columns-portrait',
            items: [
              {
                id: '10060dgy',
                type: 'content',
                flex: 1,
                content: {
                  orientation: EulogiseImageOrientation.PORTRAIT,
                  transformY: -155.46680773028635,
                  filename:
                    'VLc8fHTFQ1u0rNQmBwFi_jack-finnigan-rriAI0nhcbc-unsplash copy.jpg',
                  renderImageHeight: 306.9336154605727,
                  transformX: -93.65833333333333,
                  filepath:
                    'cases/4e8ad7d4-f650-4d0c-a16e-2c1f1f3e7c2c/gallery/VLc8fHTFQ1u0rNQmBwFi_jack-finnigan-rriAI0nhcbc-unsplash copy.jpg',
                  width: 2363,
                  renderImageWidth: 183.31666666666666,
                  type: 'image',
                  filestackHandle: '5JN4f1rSjWodgqV1LobR',
                  height: 3992,
                },
              },
              {
                id: 'jzcqmjq8',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 243.0888888888889,
                  transformY: -123.54444444444445,
                  renderImageHeight: 243.0888888888889,
                  transformX: -123.54444444444445,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
              {
                id: 'vqiw5vic',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 243.0888888888889,
                  transformY: -123.54444444444445,
                  renderImageHeight: 243.0888888888889,
                  transformX: -123.54444444444445,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
            ],
            height: 239.0888888888889,
          },
          height: 239.0888888888889,
        },
        id: 'xhhmspim',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'gdafdsa',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [EulogiseImageOrientation.PORTRAIT],
            },
            width: 284.40749999999997,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'rows',
            layoutId: 'photobook-frame-large-rectangle-portrait',
            items: [
              {
                type: 'content',
                content: {
                  renderImageWidth: 383.21,
                  transformY: -193.605,
                  renderImageHeight: 383.21,
                  transformX: -193.605,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
                id: '22v3sdv9',
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: '1jif1cdl',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'gdahdasd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 10.288333333333327,
        },
        height: 10.288333333333327,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
            },
            width: 537.95,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'rows',
            layoutId: 'photobook-frame-medium-rectangle-landscape',
            items: [
              {
                type: 'content',
                content: {
                  renderImageWidth: 541.95,
                  transformY: -272.975,
                  renderImageHeight: 541.95,
                  transformX: -272.975,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
                id: 'hvciuc3v',
              },
            ],
            thumbnailHeight: 1,
            height: 358.6333333333333,
          },
          height: 358.6333333333333,
        },
        id: '1j2815f4',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'gdagdsa',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [EulogiseImageOrientation.PORTRAIT],
            },
            width: 284.40749999999997,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'rows',
            layoutId: 'photobook-frame-large-rectangle-portrait',
            items: [
              {
                type: 'content',
                content: {
                  renderImageWidth: 383.21,
                  transformY: -193.605,
                  renderImageHeight: 383.21,
                  transformX: -193.605,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
                id: '1rqbrtvz',
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: '1z4s4f3v',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [EulogiseImageOrientation.PORTRAIT],
            },
            width: 252.80666666666664,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'rows',
            layoutId: 'photobook-frame-medium-rectangle-portrait',
            items: [
              {
                type: 'content',
                content: {
                  renderImageWidth: 383.21,
                  transformY: -193.605,
                  renderImageHeight: 383.21,
                  transformX: -193.605,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
                id: '1r6t7vkr',
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: '1gz85d23',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 88.73937499999998,
        },
        height: 88.73937499999998,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.NONE,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
              ],
            },
            width: 537.95,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'columns',
            layoutId:
              'photobook-frame-left-two-landscape-center-landscape-right-two-landscape',
            items: [
              {
                type: 'rows',
                items: [
                  {
                    id: '5r2bzsd1',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 138.4875,
                      transformY: -71.24375,
                      renderImageHeight: 138.4875,
                      transformX: -71.24375,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                  {
                    id: 'acfd9g1u',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 138.4875,
                      transformY: -71.24375,
                      renderImageHeight: 138.4875,
                      transformX: -71.24375,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                ],
              },
              {
                id: 'f31nxvky',
                type: 'content',
                flex: 2,
                content: {
                  renderImageWidth: 272.975,
                  transformY: -138.4875,
                  renderImageHeight: 272.975,
                  transformX: -138.4875,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
              {
                type: 'rows',
                items: [
                  {
                    id: '1pfxmo8q',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 138.4875,
                      transformY: -71.24375,
                      renderImageHeight: 138.4875,
                      transformX: -71.24375,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                  {
                    id: '5618rhzy',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 138.4875,
                      transformY: -71.24375,
                      renderImageHeight: 138.4875,
                      transformX: -71.24375,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                ],
              },
            ],
            height: 201.73125000000002,
          },
          height: 201.73125000000002,
        },
        id: '1wf7pqe7',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 88.73937499999998,
        },
        height: 88.73937499999998,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.NONE,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
              ],
            },
            width: 537.95,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'columns',
            layoutId: 'photobook-frame-left-landscape-right-landscape',
            items: [
              {
                id: '15l4r213',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 272.975,
                  transformY: -138.4875,
                  renderImageHeight: 272.975,
                  transformX: -138.4875,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
              {
                id: '1hqhfvu1',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 272.975,
                  transformY: -138.4875,
                  renderImageHeight: 272.975,
                  transformX: -138.4875,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
            ],
            height: 201.73125000000002,
          },
          height: 201.73125000000002,
        },
        id: 'doc54je0',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [EulogiseImageOrientation.PORTRAIT],
            },
            width: 213.305625,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'rows',
            layoutId: 'photobook-frame-small-rectangle-portrait',
            items: [
              {
                type: 'content',
                content: {
                  renderImageWidth: 383.21,
                  transformY: -193.605,
                  renderImageHeight: 383.21,
                  transformX: -193.605,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
                id: '1rcqlqn2',
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: '5xm20kj9',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
            },
            width: 505.6133333333333,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'rows',
            layoutId: 'photobook-frame-large-rectangle-landscape',
            items: [
              {
                type: 'content',
                content: {
                  renderImageWidth: 509.6133333333333,
                  transformY: -256.8066666666666,
                  renderImageHeight: 509.6133333333333,
                  transformX: -256.8066666666666,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
                id: 'striwkmg',
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: 'wzhn3kvu',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [EulogiseImageOrientation.SQUARE],
            },
            width: 379.21,
            frameAvailability: ICardProductFrameAvailability.ALL,
            type: 'rows',
            layoutId: 'card-product-frame-one-square',
            items: [
              {
                type: 'content',
                content: {
                  renderImageWidth: 383.21,
                  transformY: -193.605,
                  renderImageHeight: 383.21,
                  transformX: -193.605,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
                id: 'gvelvvid',
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: '1p8cvuce',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.NONE,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [
                EulogiseImageOrientation.PORTRAIT,
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
              ],
            },
            width: 537.2141666666666,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'columns',
            layoutId: 'photobook-frame-left-portrait-two-rows-landscape',
            items: [
              {
                id: '1nhfmdnf',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 383.21,
                  transformY: -193.605,
                  renderImageHeight: 383.21,
                  transformX: -193.605,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
              {
                type: 'rows',
                items: [
                  {
                    id: '1w2fhsam',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 272.6070833333333,
                      transformY: -138.30354166666666,
                      renderImageHeight: 272.6070833333333,
                      transformX: -138.30354166666666,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                  {
                    id: 'w6hmlnbs',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 272.6070833333333,
                      transformY: -138.30354166666666,
                      renderImageHeight: 272.6070833333333,
                      transformX: -138.30354166666666,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                ],
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: '1784wyix',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 60.496999999999986,
        },
        height: 60.496999999999986,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.NONE,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [
                EulogiseImageOrientation.PORTRAIT,
                EulogiseImageOrientation.LANDSCAPE,
              ],
            },
            width: 537.95,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'columns',
            layoutId: 'photobook-frame-left-portrait-right-landscape',
            items: [
              {
                id: '2ii6vr2i',
                type: 'content',
                flex: 0.36,
                content: {
                  renderImageWidth: 262.216,
                  transformY: -133.108,
                  renderImageHeight: 262.216,
                  transformX: -133.108,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
              {
                id: 'kj5ma8kg',
                type: 'content',
                flex: 0.64,
                content: {
                  renderImageWidth: 348.288,
                  transformY: -176.144,
                  renderImageHeight: 348.288,
                  transformX: -176.144,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
            ],
            height: 258.216,
          },
          height: 258.216,
        },
        id: '17xrmdqm',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [EulogiseImageOrientation.PORTRAIT],
            },
            width: 284.40749999999997,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'rows',
            layoutId: 'photobook-frame-large-rectangle-portrait',
            items: [
              {
                type: 'content',
                content: {
                  renderImageWidth: 383.21,
                  transformY: -193.605,
                  renderImageHeight: 383.21,
                  transformX: -193.605,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
                id: 'px0ndbf4',
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: '1snji883',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 60.496999999999986,
        },
        height: 60.496999999999986,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.NONE,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [
                EulogiseImageOrientation.PORTRAIT,
                EulogiseImageOrientation.LANDSCAPE,
              ],
            },
            width: 537.95,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'columns',
            layoutId: 'photobook-frame-left-portrait-right-landscape',
            items: [
              {
                id: '10k4i2w6',
                type: 'content',
                flex: 0.36,
                content: {
                  renderImageWidth: 262.216,
                  transformY: -133.108,
                  renderImageHeight: 262.216,
                  transformX: -133.108,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
              {
                id: '12s906sa',
                type: 'content',
                flex: 0.64,
                content: {
                  renderImageWidth: 348.288,
                  transformY: -176.144,
                  renderImageHeight: 348.288,
                  transformX: -176.144,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
            ],
            height: 258.216,
          },
          height: 258.216,
        },
        id: 'h91covfa',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [EulogiseImageOrientation.LANDSCAPE],
            },
            width: 505.6133333333333,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'rows',
            layoutId: 'photobook-frame-large-rectangle-landscape',
            items: [
              {
                type: 'content',
                content: {
                  renderImageWidth: 509.6133333333333,
                  transformY: -256.8066666666666,
                  renderImageHeight: 509.6133333333333,
                  transformX: -256.8066666666666,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
                id: 'u9nokrcs',
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: '1t2iznul',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 60.496999999999986,
        },
        height: 60.496999999999986,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.NONE,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.PORTRAIT,
              ],
            },
            width: 537.95,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'columns',
            layoutId:
              'photobook-frame-left-two-landscape-center-two-landscape-right-portrait',
            items: [
              {
                type: 'rows',
                items: [
                  {
                    id: '1avle2os',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 176.144,
                      transformY: -90.072,
                      renderImageHeight: 176.144,
                      transformX: -90.072,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                  {
                    id: '11oxhis0',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 176.144,
                      transformY: -90.072,
                      renderImageHeight: 176.144,
                      transformX: -90.072,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                ],
                flex: 0.32,
              },
              {
                type: 'rows',
                items: [
                  {
                    id: '1h50av80',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 176.144,
                      transformY: -90.072,
                      renderImageHeight: 176.144,
                      transformX: -90.072,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                  {
                    id: '1ljawmbl',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 176.144,
                      transformY: -90.072,
                      renderImageHeight: 176.144,
                      transformX: -90.072,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                ],
                flex: 0.32,
              },
              {
                id: '10ztai4e',
                type: 'content',
                flex: 0.36,
                content: {
                  renderImageWidth: 262.216,
                  transformY: -133.108,
                  renderImageHeight: 262.216,
                  transformX: -133.108,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
            ],
            height: 258.216,
          },
          height: 258.216,
        },
        id: '1jr99tsm',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [EulogiseImageOrientation.PORTRAIT],
            },
            width: 284.40749999999997,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'rows',
            layoutId: 'photobook-frame-large-rectangle-portrait',
            items: [
              {
                type: 'content',
                content: {
                  renderImageWidth: 383.21,
                  transformY: -193.605,
                  renderImageHeight: 383.21,
                  transformX: -193.605,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
                id: 'kgcw1vg2',
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: '1hi4xg3l',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 10.288333333333327,
        },
        height: 10.288333333333327,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.NONE,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [
                EulogiseImageOrientation.PORTRAIT,
                EulogiseImageOrientation.PORTRAIT,
              ],
            },
            width: 537.95,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'columns',
            layoutId: 'photobook-frame-left-portrait-right-portrait',
            items: [
              {
                id: '1mmbw04n',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 362.6333333333333,
                  transformY: -183.31666666666666,
                  renderImageHeight: 362.6333333333333,
                  transformX: -183.31666666666666,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
              {
                id: 'cb0izjb2',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 362.6333333333333,
                  transformY: -183.31666666666666,
                  renderImageHeight: 362.6333333333333,
                  transformX: -183.31666666666666,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
            ],
            height: 358.6333333333333,
          },
          height: 358.6333333333333,
        },
        id: '23ks9m1t',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.RECTANGULAR,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [EulogiseImageOrientation.PORTRAIT],
            },
            width: 284.40749999999997,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'rows',
            layoutId: 'photobook-frame-large-rectangle-portrait',
            items: [
              {
                type: 'content',
                content: {
                  renderImageWidth: 383.21,
                  transformY: -193.605,
                  renderImageHeight: 383.21,
                  transformX: -193.605,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
                id: '1xgswlom',
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: '1qw3qcz1',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 122.36124999999998,
        },
        height: 122.36124999999998,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.NONE,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
              ],
            },
            width: 537.95,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'columns',
            layoutId: 'photobook-frame-three-columns-landscape',
            items: [
              {
                id: '1kd1xkp8',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 183.31666666666666,
                  transformY: -93.65833333333333,
                  renderImageHeight: 183.31666666666666,
                  transformX: -93.65833333333333,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
              {
                id: '213knzwd',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 183.31666666666666,
                  transformY: -93.65833333333333,
                  renderImageHeight: 183.31666666666666,
                  transformX: -93.65833333333333,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
              {
                id: '5xb83jie',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 183.31666666666666,
                  transformY: -93.65833333333333,
                  renderImageHeight: 183.31666666666666,
                  transformX: -93.65833333333333,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
            ],
            height: 134.4875,
          },
          height: 134.4875,
        },
        id: '1v7gs6ul',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.NONE,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
              ],
            },
            width: 505.6133333333333,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'columns',
            layoutId: 'photobook-frame-four-landscape-windows',
            items: [
              {
                type: 'rows',
                items: [
                  {
                    id: '1n7c3bxl',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 256.8066666666666,
                      transformY: -130.4033333333333,
                      renderImageHeight: 256.8066666666666,
                      transformX: -130.4033333333333,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                  {
                    id: '1c4dqlsa',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 256.8066666666666,
                      transformY: -130.4033333333333,
                      renderImageHeight: 256.8066666666666,
                      transformX: -130.4033333333333,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                ],
              },
              {
                type: 'rows',
                items: [
                  {
                    id: 'x50xkwit',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 256.8066666666666,
                      transformY: -130.4033333333333,
                      renderImageHeight: 256.8066666666666,
                      transformX: -130.4033333333333,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                  {
                    id: '4ar0frea',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 256.8066666666666,
                      transformY: -130.4033333333333,
                      renderImageHeight: 256.8066666666666,
                      transformX: -130.4033333333333,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                ],
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: 'ouj5u5sx',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 0,
        },
        height: 0,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.NONE,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.LANDSCAPE,
                EulogiseImageOrientation.PORTRAIT,
              ],
            },
            width: 537.2141666666666,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'columns',
            layoutId: 'photobook-frame-two-rows-right-portrait-landscape',
            items: [
              {
                type: 'rows',
                items: [
                  {
                    id: '146y8dao',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 272.6070833333333,
                      transformY: -138.30354166666666,
                      renderImageHeight: 272.6070833333333,
                      transformX: -138.30354166666666,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                  {
                    id: 'c8l3afmh',
                    type: 'content',
                    flex: 1,
                    content: {
                      renderImageWidth: 272.6070833333333,
                      transformY: -138.30354166666666,
                      renderImageHeight: 272.6070833333333,
                      transformX: -138.30354166666666,
                      type: 'image',
                      filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                    },
                  },
                ],
              },
              {
                id: '1qmxoifm',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 383.21,
                  transformY: -193.605,
                  renderImageHeight: 383.21,
                  transformX: -193.605,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
            ],
            height: 379.21,
          },
          height: 379.21,
        },
        id: 'd9t6poh7',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
  {
    rows: [
      {
        id: 'fdioafiodaiofd',
        type: CardProductContentItemType.SPACE,
        data: {
          height: 10.288333333333327,
        },
        height: 10.288333333333327,
      },
      {
        type: CardProductContentItemType.FRAME,
        data: {
          content: {
            fadeEdge: ICardProductFadeEdgeType.NONE,
            isAddAsRatio: true,
            metadata: {
              frameOrientations: [
                EulogiseImageOrientation.PORTRAIT,
                EulogiseImageOrientation.PORTRAIT,
              ],
            },
            width: 537.95,
            frameAvailability: ICardProductFrameAvailability.PHOTOBOOK,
            type: 'columns',
            layoutId: 'photobook-frame-left-portrait-right-portrait',
            items: [
              {
                id: '1ua6h52f',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 362.6333333333333,
                  transformY: -183.31666666666666,
                  renderImageHeight: 362.6333333333333,
                  transformX: -183.31666666666666,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
              {
                id: '8kvcyzqq',
                type: 'content',
                flex: 1,
                content: {
                  renderImageWidth: 362.6333333333333,
                  transformY: -183.31666666666666,
                  renderImageHeight: 362.6333333333333,
                  transformX: -183.31666666666666,
                  type: 'image',
                  filestackHandle: 'mFMLqO1RSYylJwRWp5Rx',
                },
              },
            ],
            height: 358.6333333333333,
          },
          height: 358.6333333333333,
        },
        id: '13neba22',
      },
    ],
    background: {
      image: {},
      overlayMargin: [4, 8],
    },
  },
]

export const MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1: ICardProductData = {
  content: {
    pageMargins: [40, 40],
    pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
    theme: 'default',
    pageOrientation: CardProductPageOrientation.PORTRAIT,
    pages: [
      {
        coverType: EulogisePhotobookCoverType.SALT_LINEN,
        isTitlePageLayout: true,
        rows: [
          {
            data: {
              divider: {
                asset: {
                  filepath: null,
                  name: 'Divider 20',
                  id: null,
                },
              },
              height: 65,
            },
            type: CardProductContentItemType.SPACE,
            id: 'gdafdsa3',
          },
          {
            data: {
              enableBorder: false,
              width: 266,
              content: {
                width: 266,
                lockAspectRatio: false,
                id: 'dasd',
                type: 'rows',
                items: [
                  {
                    id: 'fdafdsa',
                    borderRadius: '0px',
                    type: 'content',
                    content: {
                      orientation: EulogiseImageOrientation.PORTRAIT,
                      transformY: -228.68726195514176,
                      filename:
                        'VLc8fHTFQ1u0rNQmBwFi_jack-finnigan-rriAI0nhcbc-unsplash copy.jpg',
                      renderImageHeight: 453.37452391028353,
                      transformX: -137,
                      filepath:
                        'cases/4e8ad7d4-f650-4d0c-a16e-2c1f1f3e7c2c/gallery/VLc8fHTFQ1u0rNQmBwFi_jack-finnigan-rriAI0nhcbc-unsplash copy.jpg',
                      width: 2363,
                      renderImageWidth: 270,
                      type: 'image',
                      filestackHandle: 'mmDqGAtXSLa6pQD93Jb5',
                      height: 3992,
                    },
                  },
                ],
                height: 201,
              },
              isFullWidth: false,
              height: 201,
            },
            type: CardProductContentItemType.FRAME,
            id: 'fardme',
          },
          {
            data: {
              divider: {
                asset: {
                  filepath: null,
                  name: 'Divider 20',
                  id: null,
                },
              },
              height: 70,
            },
            type: CardProductContentItemType.SPACE,
            id: 'divideda',
          },
        ],
        layoutId: 'cover-page-landscape-with-image-only',
        background: {
          image: {
            url: 'assets/photobook/milk-premium-medium/front/salt-linen.jpg',
          },
        },
      },
      ...MOCK_PHOTOBOOK_PAGES,
    ],
  },
  updatedAt: '2025-07-29T10:47:24.645Z',
  hasGeneratedBefore: false,
  status: MemorialVisualStatus.NOT_STARTED,
  createdAt: '2025-07-28T10:55:08.549Z',
  id: '5b068c58-58b7-4219-a287-15bb46b9e6c4',
  case: '4e8ad7d4-f650-4d0c-a16e-2c1f1f3e7c2c',
  fileStatus: ResourceFileStatus.NOT_STARTED,
}

export const MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_WITH_TEXT_COVER: ICardProductData =
  {
    case: '132e0f24-351f-4f0c-a6fd-c5d068b4f7ba',
    content: {
      pageMargins: [40, 40],
      pageSize: CardProductPageSize.PHOTOBOOK_MILK_PREMIUM_MEDIUM,
      theme: 'default',
      pageOrientation: CardProductPageOrientation.PORTRAIT,
      pages: [
        {
          coverType: EulogisePhotobookCoverType.BLUSH_LINEN,
          isTitlePageLayout: true,
          rows: [
            {
              data: {
                divider: {
                  asset: {
                    filepath: null,
                    name: 'Divider 20',
                    id: null,
                  },
                },
                height: 73,
              },
              type: 'space',
              id: 'gdasaddd',
            },
            {
              data: {
                enableBorder: false,
                width: 250,
                content: {
                  width: 250,
                  lockAspectRatio: false,
                  id: 'rfda32',
                  type: 'rows',
                  items: [
                    {
                      id: 'fda32',
                      borderRadius: '0px',
                      type: 'content',
                      content: {
                        transformY: -185.8503937007874,
                        filename: 'tp1PPt3AQkqSACVnjQKR_NeoTheMatrix copy.jpg',
                        transformX: -131,
                        renderImageHeight: 367.7007874015748,
                        filepath:
                          'cases/132e0f24-351f-4f0c-a6fd-c5d068b4f7ba/gallery/tp1PPt3AQkqSACVnjQKR_NeoTheMatrix copy.jpg',
                        renderImageWidth: 258,
                        type: 'image',
                        filestackHandle: 'mmDqGAtXSLa6pQD93Jb5',
                      },
                    },
                  ],
                  height: 164,
                },
                isFullWidth: false,
                height: 164,
              },
              type: CardProductContentItemType.FRAME,
              id: 'gdagdsa',
            },
            {
              type: 'text',
              data: {
                margin: [0, 0],
                rowStyle: {
                  fontSize: 10,
                  font: 'Lora',
                },
                width: 258,
                style: 'unstyled',
                alignment: 'center',
                content: {
                  blocks: [
                    {
                      depth: 0,
                      data: {},
                      inlineStyleRanges: [],
                      text: 'Forever in our Hearts',
                      type: 'unstyled',
                      key: '2c4oi',
                      entityRanges: [],
                    },
                  ],
                  entityMap: {},
                },
                height: 14,
              },
              id: 'fdagfd43',
            },
            {
              data: {
                divider: {
                  asset: {
                    filepath: null,
                    name: 'Divider 20',
                    id: null,
                  },
                },
                height: 70,
              },
              type: 'space',
              id: 'gdasdas',
            },
          ],
          layoutId: 'cover-page-landscape-image-and-text',
          background: {
            image: {
              url: 'assets/photobook/milk-premium-medium/front/blush-linen.jpg',
            },
          },
        },
        ...MOCK_PHOTOBOOK_PAGES,
      ],
    },
    createdAt: '2025-08-06T00:09:06.922Z',
    fileStatus: ResourceFileStatus.NOT_STARTED,
    hasGeneratedBefore: false,
    id: '34a8fc12-4109-4221-b6d7-e8dd6e488538',
    status: MemorialVisualStatus.EDITED,
    updatedAt: '2025-08-06T02:03:42.291Z',
  }

export const MOCK_PHOTOBOOKS = [MOCK_PHOTOBOOK_MEDIUM_PREMIUM_IMAGE_ONLY_1]

// Mock Photobook Find response
export const MOCK_PHOTOBOOK_FIND_RESPONSE_1: IFindResponse = {
  items: MOCK_PHOTOBOOKS,
  count: MOCK_PHOTOBOOKS.length,
  ref: '783942a4f403d',
}

export const MOCK_PHOTOBOOK_FIND_REQUEST_BODY_1: IFindRequestBody = {
  resource: EulogiseResource.PHOTOBOOK,
  search: {
    case: MOCK_CASE_1.id,
  },
}

export const MOCK_PHOTOBOOK_FIND_REQUEST_RESPONSE_1: IFindRequestResponse = {
  webtoken: MOCK_USER_1.webtoken,
  request: { body: MOCK_PHOTOBOOK_FIND_REQUEST_BODY_1 },
  response: MOCK_PHOTOBOOK_FIND_RESPONSE_1,
}

export const MOCK_PHOTOBOOK_FIND_REQUEST_RESPONSES: Array<IFindRequestResponse> =
  [MOCK_PHOTOBOOK_FIND_REQUEST_RESPONSE_1]
