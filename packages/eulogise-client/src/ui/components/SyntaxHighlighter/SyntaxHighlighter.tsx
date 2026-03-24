import React from 'react'
import { Prism as PrismSyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

type ISyntaxHighlighterProps = {
  language?: 'javascript' | 'html' | 'css' | 'typescript'
  codeString: string
}

export const SyntaxHighlighter = ({
  language = 'javascript',
  codeString = '',
}: ISyntaxHighlighterProps) => (
  <PrismSyntaxHighlighter language={language} style={dark}>
    {codeString}
  </PrismSyntaxHighlighter>
)
