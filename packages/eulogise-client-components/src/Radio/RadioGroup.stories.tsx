import React, { useState } from 'react'

import { RadioGroup } from './RadioGroup'
import { Tooltip } from '../Tooltip'
import { Radio } from './Radio'
import { EulogiseUserRole } from '@eulogise/core'

export default {
  title: 'General/RadioGroup',
  component: RadioGroup,
  argTypes: {},
}

export const Default = () => {
  const [selected, setSelected] = useState<EulogiseUserRole>(null)
  return (
    <RadioGroup labelText="Label here">
      <Tooltip title="Invited user can only upload photos">
        <Radio
          checked={selected === EulogiseUserRole.CONTRIBUTOR}
          onClick={() => setSelected(EulogiseUserRole.CONTRIBUTOR)}
        >
          Contributor
        </Radio>
      </Tooltip>
      <Tooltip title="Invited user">
        <Radio
          checked={selected === EulogiseUserRole.COEDITOR}
          onClick={() => setSelected(EulogiseUserRole.COEDITOR)}
        >
          Coeditor
        </Radio>
      </Tooltip>
    </RadioGroup>
  )
}
