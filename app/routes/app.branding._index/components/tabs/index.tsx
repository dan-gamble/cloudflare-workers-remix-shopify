import type { TabProps} from '@shopify/polaris';
import { Card, Tabs } from '@shopify/polaris'
import type { ReactNode} from 'react';
import { useState } from 'react'
import { useSearchParams } from '@remix-run/react'
import { ButtonsTab } from '~/routes/app.branding._index/components/tabs/buttons-tab'
import { FormTab } from '~/routes/app.branding._index/components/tabs/form-tab'
import { HeadingsTab } from './headings-tab';

const tabs: Array<TabProps & { component: () => ReactNode }> = [
  // {
  //   id: 'colours',
  //   content: 'Colours',
  //   accessibilityLabel: 'Colours',
  //   panelID: 'colours',
  //   component: ColoursTab,
  // },
  {
    id: 'buttons',
    content: 'Buttons',
    accessibilityLabel: 'Buttons',
    panelID: 'buttons',
    component: ButtonsTab,
  },
  {
    id: 'form',
    content: 'Form',
    accessibilityLabel: 'Form',
    panelID: 'form',
    component: FormTab,
  },
  {
    id: 'headings',
    content: 'Headings',
    accessibilityLabel: 'Headings',
    panelID: 'headings',
    component: HeadingsTab,
  },
  // {
  //   id: 'layout',
  //   content: 'Layout',
  //   accessibilityLabel: 'Layout',
  //   panelID: 'layout',
  //   component: LayoutTab,
  // },
  // {
  //   id: 'typography',
  //   content: 'Typography',
  //   accessibilityLabel: 'Typography',
  //   panelID: 'typography',
  //   component: TypographyTab,
  // },
]

export function CheckoutBrandingTabs () {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTabIndex = tabs.findIndex(t => t.id === searchParams.get('tab'))
  const [selected, setSelected] = useState(currentTabIndex >= 0 ? currentTabIndex : 0)
  const Component = tabs[selected].component

  return (
    <Card padding="0">
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={(selectedTabIndex) => {
          setSelected(selectedTabIndex)
          setSearchParams(params => {
            params.set('tab', tabs[selectedTabIndex].id)

            return params
          })
        }}
      >
        <Component />
      </Tabs>
    </Card>
  )
}
