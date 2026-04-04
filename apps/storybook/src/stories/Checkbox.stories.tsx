import { Checkbox } from "@repo/ui/components/checkbox"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const CheckedWithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms-checked" defaultChecked />
      <label
        htmlFor="terms-checked"
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="unchecked" />
          <label
            htmlFor="unchecked"
            className="text-sm leading-none font-medium"
          >
            Unchecked
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="checked" defaultChecked />
          <label htmlFor="checked" className="text-sm leading-none font-medium">
            Checked
          </label>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled" disabled />
          <label
            htmlFor="disabled"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Disabled Unchecked
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled-checked" disabled defaultChecked />
          <label
            htmlFor="disabled-checked"
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Disabled Checked
          </label>
        </div>
      </div>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="item1" defaultChecked />
        <label htmlFor="item1" className="text-sm leading-none font-medium">
          Item 1
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="item2" />
        <label htmlFor="item2" className="text-sm leading-none font-medium">
          Item 2
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="item3" />
        <label htmlFor="item3" className="text-sm leading-none font-medium">
          Item 3
        </label>
      </div>
    </div>
  ),
}
