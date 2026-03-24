import { css } from 'styled-components'

export const SLIDESHOW_FILTERS = {
  '1977': css`
    position: relative;
    filter: contrast(110%) brightness(110%) saturate(130%);

    ::before {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
      pointer-events: none;
      mix-blend-mode: screen;
      background: rgba(243, 106, 188, 0.3);
    }
  `,
  brannan: css`
    position: relative;
    -webkit-filter: contrast(140%) sepia(50%);
    filter: contrast(140%) sepia(50%);

    ::before {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
      pointer-events: none;
      mix-blend-mode: lighten;
      background: rgba(161, 44, 199, 0.31);
    }
  `,
  brooklyn: css`
    position: relative;
    -webkit-filter: contrast(90%) brightness(110%);
    filter: contrast(90%) brightness(110%);

    ::before {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
      pointer-events: none;
      mix-blend-mode: overlay;
      background: -webkit-radial-gradient(
        50% 50%,
        circle closest-corner,
        rgba(168, 223, 193, 0.4) 1,
        rgba(183, 196, 200, 0.2)
      );
      background: radial-gradient(
        50% 50%,
        circle closest-corner,
        rgba(168, 223, 193, 0.4) 1,
        rgba(183, 196, 200, 0.2)
      );
    }
  `,
  clarendon: css`
    position: relative;
    -webkit-filter: contrast(120%) saturate(125%);
    filter: contrast(120%) saturate(125%);

    ::before {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
      pointer-events: none;
      mix-blend-mode: overlay;
      background: rgba(127, 187, 227, 0.2);
    }
  `,
  inkwell: css`
    position: relative;
    -webkit-filter: contrast(110%) brightness(110%) sepia(30%) grayscale(100%);
    filter: contrast(110%) brightness(110%) sepia(30%) grayscale(100%);

    .filter::before {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
      pointer-events: none;
      background: rgba(0, 0, 0, 0);
    }
  `,
  lofi: css`
    position: relative;
    -webkit-filter: contrast(150%) saturate(110%);
    filter: contrast(150%) saturate(110%);

    ::before {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
      pointer-events: none;
      mix-blend-mode: multiply;
      background: -webkit-radial-gradient(
        50% 50%,
        circle closest-corner,
        rgba(0, 0, 0, 0) 70,
        rgba(34, 34, 34, 1)
      );
      background: radial-gradient(
        50% 50%,
        circle closest-corner,
        rgba(0, 0, 0, 0) 70,
        rgba(34, 34, 34, 1)
      );
    }
  `,
  walden: css`
    position: relative;
    -webkit-filter: brightness(110%) saturate(160%) sepia(30%)
      hue-rotate(350deg);
    filter: brightness(110%) saturate(160%) sepia(30%) hue-rotate(350deg);

    ::before {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
      pointer-events: none;
      mix-blend-mode: screen;
      opacity: 0.3;
      background: rgba(204, 68, 0, 1);
    }
  `,
  reyes: css`
    position: relative;
    -webkit-filter: contrast(85%) brightness(110%) saturate(75%) sepia(22%);
    filter: contrast(85%) brightness(110%) saturate(75%) sepia(22%);

    ::before {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      position: absolute;
      pointer-events: none;
      mix-blend-mode: soft-light;
      opacity: 0.5;
      background: rgba(173, 205, 239, 1);
    }
  `,
  none: css`
    position: relative;
  `,
}
