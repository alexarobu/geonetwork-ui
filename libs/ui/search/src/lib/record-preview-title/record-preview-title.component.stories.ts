import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RecordPreviewTitleComponent } from './record-preview-title.component'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/common/fixtures'

export default {
  title: 'Search/RecordPreviewTitleComponent',
  component: RecordPreviewTitleComponent,
  decorators: [
    moduleMetadata({
      imports: [UtilSharedModule, UiElementsModule],
    }),
  ],
} as Meta<RecordPreviewTitleComponent>

const Template: Story<RecordPreviewTitleComponent> = (
  args: RecordPreviewTitleComponent
) => ({
  component: RecordPreviewTitleComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  record: RECORDS_SUMMARY_FIXTURE[0],
  linkTarget: '_blank',
}
