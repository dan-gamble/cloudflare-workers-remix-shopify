import { useCheckoutBranding } from '~/routes/app.branding/route'
import type { TabProps} from '@shopify/polaris';
import { Bleed, BlockStack, Box, Button, ButtonGroup, Divider, Tabs, Text } from '@shopify/polaris'
import { ColourChoice } from '~/routes/app.branding._index/components/colour-choice'
import { SchemeOptions } from '~/routes/app.branding._index/hooks/use-colours-form'
import { useState } from 'react'
import type { FieldPath } from 'react-hook-form/dist/types/path'
import type { CheckoutBrandingColorsFields } from '~/routes/app.branding._index/schema'

export function ColoursTab () {
  const checkoutBranding = useCheckoutBranding()

  function onResetClick<
    TFieldName extends FieldPath<CheckoutBrandingColorsFields> = FieldPath<CheckoutBrandingColorsFields>
  > (name: TFieldName) {
    return checkoutBranding.forms.colours.resetField(name)
  }

  return (
    <>
      <Box paddingInline="500" paddingBlockStart="200" paddingBlockEnd="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Global</Text>

          <BlockStack gap="400">
            <Text as="p">A group of global colors for customizing the overall look and feel of the user interface.</Text>

            <ColourChoice
              label="Accent"
              helpText="A color used for interaction, like links and focus states."
              name="global.accent"
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />

            <ColourChoice
              label="Brand"
              helpText="A color strongly associated with the merchant, currently used for elements like primary and secondary buttons."
              name="global.brand"
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />

            <ColourChoice
              label="Critical"
              helpText="A semantic color used for components that communicate critical content."
              name="global.critical"
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />

            <ColourChoice
              label="Decorative"
              helpText="A color used to highlight certain areas of the user interface."
              name="global.decorative"
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />

            <ColourChoice
              label="Info"
              helpText="A semantic color used for components that communicate informative content."
              name="global.info"
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />

            <ColourChoice
              label="Success"
              helpText="A semantic color used for components that communicate successful actions."
              name="global.success"
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />

            <ColourChoice
              label="Warning"
              helpText="A semantic color used for components that display content that requires attention."
              name="global.warning"
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />
          </BlockStack>
        </BlockStack>
      </Box>

      <Divider />

      <Box padding="500">
        <BlockStack gap="200">
          <Text variant="headingSm" as="h3">Schemes</Text>

          <BlockStack gap="400">
            <ButtonGroup variant="segmented" fullWidth>
              <Button
                pressed={checkoutBranding.forms.colours.currentlySelectedScheme === SchemeOptions.Scheme1}
                onClick={() => checkoutBranding.forms.colours.setCurrentlySelectedScheme(SchemeOptions.Scheme1)}
              >
                Scheme 1
              </Button>

              <Button
                pressed={checkoutBranding.forms.colours.currentlySelectedScheme === SchemeOptions.Scheme2}
                onClick={() => checkoutBranding.forms.colours.setCurrentlySelectedScheme(SchemeOptions.Scheme2)}
              >
                Scheme 2
              </Button>
            </ButtonGroup>

            <Scheme scheme={checkoutBranding.forms.colours.currentlySelectedScheme} />
          </BlockStack>
        </BlockStack>
      </Box>
    </>
  )
}

const tabs = [
  {
    id: 'base',
    content: 'Base',
    accessibilityLabel: 'base',
    panelID: 'base',
    text: 'The main colors of a scheme.',
  },
  {
    id: 'control',
    content: 'Control',
    accessibilityLabel: 'control',
    panelID: 'control',
    text: 'The colors of form controls.',
  },
  {
    id: 'primaryButton',
    content: 'Primary Button',
    accessibilityLabel: 'Primary Button',
    panelID: 'primaryButton',
    text: 'The colors of the primary button.',
  },
  {
    id: 'secondaryButton',
    content: 'Secondary Button',
    accessibilityLabel: 'Secondary Button',
    panelID: 'secondaryButton',
    text: 'The colors of the secondary button.',
  },
] as const

function Scheme ({ scheme }: { scheme: SchemeOptions }) {
  const checkoutBranding = useCheckoutBranding()

  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const selectedTab = tabs[selectedTabIndex]

  const accentName = `schemes.${scheme}.${selectedTab.id}.accent` as const
  const backgroundName = `schemes.${scheme}.${selectedTab.id}.background` as const
  const borderName = `schemes.${scheme}.${selectedTab.id}.border` as const
  const decorativeName = `schemes.${scheme}.${selectedTab.id}.decorative` as const
  const iconName = `schemes.${scheme}.${selectedTab.id}.icon` as const
  const textName = `schemes.${scheme}.${selectedTab.id}.text` as const

  function onResetClick<
    TFieldName extends FieldPath<CheckoutBrandingColorsFields> = FieldPath<CheckoutBrandingColorsFields>
  > (name: TFieldName) {
    return checkoutBranding.forms.colours.resetField(name)
  }

  return (
    <Bleed marginInline="300">
      <Tabs
        tabs={tabs as unknown as TabProps[]}
        selected={selectedTabIndex}
        onSelect={setSelectedTabIndex}
      >
        <Box padding="300">
          <BlockStack gap="200">
            <Text as="p">{selectedTab.text}</Text>

            <ColourChoice
              key={accentName}
              label="Accent"
              helpText="The color of accented objects (links and focused state)."
              name={accentName}
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />

            <ColourChoice
              key={backgroundName}
              label="Background"
              helpText="The color of the background."
              name={backgroundName}
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />

            <ColourChoice
              key={borderName}
              label="Borders"
              helpText="The color of borders."
              name={borderName}
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />

            <ColourChoice
              key={decorativeName}
              label="Decorative"
              helpText="The decorative color for highlighting specific parts of the user interface."
              name={decorativeName}
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />

            <ColourChoice
              key={iconName}
              label="Icons"
              helpText="The color of icons."
              name={iconName}
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />

            <ColourChoice
              key={textName}
              label="Text"
              helpText="The color of text."
              name={textName}
              control={checkoutBranding.forms.colours.control}
              onResetClick={onResetClick}
            />
          </BlockStack>
        </Box>
      </Tabs>
    </Bleed>
  )
}
