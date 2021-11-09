import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { GnResultsListComponent } from './gn-results-list.component'
import { ResultsListLayoutEnum } from '@geonetwork-ui/util/shared'
import { WebcomponentsModule } from '../../webcomponents.module'

export default {
  title: 'Angular Components/GnResultsListComponent',
  component: GnResultsListComponent,
  decorators: [
    moduleMetadata({
      imports: [WebcomponentsModule],
    }),
  ],
  argTypes: {
    apiUrl: {
      control: 'text',
    },
    layout: {
      control: 'radio',
      options: Object.values(ResultsListLayoutEnum),
    },
    primaryColor: { control: 'color' },
    secondaryColor: { control: 'color' },
    mainColor: { control: 'color' },
    backgroundColor: { control: 'color' },
  },
} as Meta<GnResultsListComponent>

const Template: Story<GnResultsListComponent> = (
  args: GnResultsListComponent
) => ({
  component: GnResultsListComponent,
  props: args,
})

const defaultArgs = {
  apiUrl: 'https://apps.titellus.net/geonetwork/srv/api',
  primaryColor: '#e73f51',
  secondaryColor: '#c2e9dc',
  mainColor: '#212029',
  backgroundColor: '#fdfbff',
  size: 10,
  query: '',
  filter: '',
  fixed: '',
}

export const AsList = Template.bind({})
AsList.args = {
  ...defaultArgs,
  layout: ResultsListLayoutEnum.LIST,
}

export const AsCard = Template.bind({})
AsCard.args = {
  ...defaultArgs,
  layout: ResultsListLayoutEnum.CARD,
}

export const AsText = Template.bind({})
AsText.args = {
  ...defaultArgs,
  layout: ResultsListLayoutEnum.TEXT,
}

export const AsTitle = Template.bind({})
AsTitle.args = {
  ...defaultArgs,
  layout: ResultsListLayoutEnum.TITLE,
}
