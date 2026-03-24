import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent } from 'storybook/test'
import React from 'react'
import { Button, ButtonSize, ButtonType } from '../Button'

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {
  title: 'Checkout V2/Buttons',
  component: Button,
  args: {
    children: 'Checkout CTA',
  },
  argTypes: {
    buttonSize: {
      control: 'inline-radio',
      options: [ButtonSize.SM, ButtonSize.XMD, ButtonSize.XS],
    },
    buttonType: {
      control: 'select',
      options: [
        ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY,
        ButtonType.CHECKOUT_CTA_BUTTON_SECONDARY,
        ButtonType.CHECKOUT_HIGHLIGHTED_BUTTON,
      ],
    },
  },
}

export default meta

export const PrimaryCTA: Story = {
  args: {
    buttonType: ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY,
    buttonSize: ButtonSize.XMD,
  },
}

export const SecondaryCTA: Story = {
  args: {
    buttonType: ButtonType.CHECKOUT_CTA_BUTTON_SECONDARY,
    buttonSize: ButtonSize.XMD,
  },
}

export const HighlightedCTA: Story = {
  args: {
    buttonType: ButtonType.CHECKOUT_HIGHLIGHTED_BUTTON,
    buttonSize: ButtonSize.XMD,
  },
}

export const PrimaryCTADisabled: Story = {
  args: {
    buttonType: ButtonType.CHECKOUT_CTA_BUTTON_PRIMARY,
    buttonSize: ButtonSize.XMD,
    disabled: true,
    children: 'Checkout CTA (Disabled)',
  },
}

export const SecondaryCTADisabled: Story = {
  args: {
    buttonType: ButtonType.CHECKOUT_CTA_BUTTON_SECONDARY,
    buttonSize: ButtonSize.XMD,
    disabled: true,
    children: 'Checkout CTA (Disabled)',
  },
}

export const HighlightedCTADisabled: Story = {
  args: {
    buttonType: ButtonType.CHECKOUT_HIGHLIGHTED_BUTTON,
    buttonSize: ButtonSize.XMD,
    disabled: true,
    children: 'Checkout CTA (Disabled)',
  },
}
