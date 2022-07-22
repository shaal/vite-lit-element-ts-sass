import { html, TemplateResult } from 'lit';
import './Menu';

export default {
  title: 'Components/Menu',
  components: 'drupal-menu',
  args: {}
}

const Template = (): TemplateResult =>
  html`
<drupal-menu>
</drupal-menu>
`
export const MenuTemplate = Template.bind({})
MenuTemplate.args = {}
