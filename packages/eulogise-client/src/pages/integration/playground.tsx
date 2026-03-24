import React, { useState } from 'react'
import styled from 'styled-components'
import { TextField } from '@eulogise/client-components'
import { Link } from '../../ui/components/Link'
import { COLOR, EulogiseClientConfig } from '@eulogise/client-core'

type SyncFields = {
  externalCaseId: string
  clientId: string
}

const StyledIntegrationPlaygroundPage = styled.div`
  padding: 2rem;
`

const IntegrationPlaygroundForm = styled.form`
  width: 20rem;
`

const IntegrationPlaygroundPage = () => {
  const [fields, setFields] = useState<SyncFields>({
    externalCaseId: '',
    clientId: '',
  })
  const updateFields = (newFields: Partial<SyncFields>) => {
    setFields({ ...fields, ...newFields })
  }
  const url = `${EulogiseClientConfig.EULOGISE_API_URL}/v2/external/sync?clientId=${fields.clientId}&externalCaseId=${fields.externalCaseId}`
  return (
    <StyledIntegrationPlaygroundPage>
      <h1>Playground</h1>
      <IntegrationPlaygroundForm>
        <TextField
          labelText="Client Id"
          value={fields.clientId}
          onChange={(e) => updateFields({ clientId: e.target.value })}
        />
        <br />
        <TextField
          labelText="External Case Id"
          value={fields.externalCaseId}
          onChange={(e) => updateFields({ externalCaseId: e.target.value })}
        />
        <br />
      </IntegrationPlaygroundForm>
      <Link style={{ color: COLOR.CORE_PURPLE }} to={url} target="_blank">
        {url}
      </Link>
    </StyledIntegrationPlaygroundPage>
  )
}

export default IntegrationPlaygroundPage
