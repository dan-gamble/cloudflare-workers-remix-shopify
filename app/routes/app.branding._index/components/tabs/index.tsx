import type { TabProps} from '@shopify/polaris';
import { Card, Tabs } from '@shopify/polaris'
import type { ReactNode} from 'react';
import { useState } from 'react'
import { useSearchParams } from '@remix-run/react'
import { ButtonsTab } from '~/routes/app.branding._index/components/tabs/buttons-tab'
import { FormTab } from '~/routes/app.branding._index/components/tabs/form-tab'

const tabs: Array<TabProps & { component: () => ReactNode }> = [
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
