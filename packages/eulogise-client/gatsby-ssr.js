import React from 'react'
import { withReduxProvider } from './src/ui/hoc/withReduxProvider'
import { withWebsocketProvider } from './src/ui/hoc/withWebsocketProvider'

export const wrapRootElement = ({ element }) =>
  withReduxProvider(withWebsocketProvider(element))

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    process.env.GATSBY_PENDO_API_KEY ? (
      // @ts-ignore
      <script
        key="pendo-script"
        dangerouslySetInnerHTML={{
          __html: `
        (function(apiKey){
            (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
            v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
                o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
                y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
                z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
        })('${process.env.GATSBY_PENDO_API_KEY}');
        `,
        }}
      />
    ) : (
      <></>
    ),
  ])
}
