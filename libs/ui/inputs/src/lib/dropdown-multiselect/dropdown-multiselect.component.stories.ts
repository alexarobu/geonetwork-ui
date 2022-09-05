import {
  Meta, moduleMetadata, Story,
  componentWrapperDecorator,
} from '@storybook/angular'
import { DropdownMultiselectComponent } from './dropdown-multiselect.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { MatCheckboxModule } from '@angular/material/checkbox'

export default {
  title: 'Inputs/DropdownMultiselectComponent',
  component: DropdownMultiselectComponent,
  decorators: [
    moduleMetadata({
      imports: [OverlayModule, MatCheckboxModule],
    }),
    componentWrapperDecorator(
      (story) => `
<div class="border border-gray-300 p-2" style="width: 600px; height:400px; resize: both; overflow: auto">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  ${story}
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  </p>
  <p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</p>
</div>`)
  ],
} as Meta<DropdownMultiselectComponent>

const Template: Story<DropdownMultiselectComponent> = (
  args: DropdownMultiselectComponent
) => ({
  component: DropdownMultiselectComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  title: 'my title',
  ariaName: 'select-dropdown',
  choices: [
    {
      label: 'My Choice 1',
      value: 'choice1',
    },
    {
      label: 'My Choice 2',
      value: 'choice2',
    },
    {
      label: 'My Choice 3',
      value: { name: 'choice3' },
    },
    {
      label: 'My Numerical choice',
      value: 1234,
    },
    {
      label: 'My boolean choice',
      value: false,
    },
  ],
  selected: ['choice1'],
  allowSearch: true,
}
Primary.argTypes = {
  selectValues: {
    action: 'selectValues',
  },
}
