import { BlockStack, InlineGrid, Text } from '@shopify/polaris'
import { BackgroundEnum } from '~/routes/app.branding._index/components/enums/background-enum'
import { SimpleBorderEnum } from '~/routes/app.branding._index/components/enums/simple-border-enum'
import { BorderStyleEnum } from '~/routes/app.branding._index/components/enums/border-style-enum'
import { BorderWidthEnum } from '~/routes/app.branding._index/components/enums/border-width-enum'
import { ColourSchemeSelectionEnum } from '~/routes/app.branding._index/components/enums/colour-scheme-selection-enum'
import { CornerRadiusEnum } from '~/routes/app.branding._index/components/enums/corner-radius-enum'
import { SpacingKeywordEnum } from '~/routes/app.branding._index/components/enums/spacing-keyword-enum'
import { ShadowEnum } from '~/routes/app.branding._index/components/enums/shadow-enum'
import React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

type SectionBlockProps<
  TFieldValues extends FieldValues = FieldValues,
> = {
  readonly leadingKey: 'main'|'orderSummary'
  control: Control<TFieldValues>
}

export function SectionBlock<
  TFieldValues extends FieldValues = FieldValues,
> (props: SectionBlockProps<TFieldValues>) {
  const backgroundName = `${props.leadingKey}.section.background` as const as FieldPath<TFieldValues>
  const borderName = `${props.leadingKey}.section.border` as const as FieldPath<TFieldValues>
  const borderStyleName = `${props.leadingKey}.section.borderStyle` as const as FieldPath<TFieldValues>
  const borderWidthName = `${props.leadingKey}.section.borderWidth` as const as FieldPath<TFieldValues>
  const colorSchemeName = `${props.leadingKey}.section.colorScheme` as const as FieldPath<TFieldValues>
  const cornerRadiusName = `${props.leadingKey}.section.cornerRadius` as const as FieldPath<TFieldValues>
  const paddingName = `${props.leadingKey}.section.padding` as const as FieldPath<TFieldValues>
  const shadowName = `${props.leadingKey}.section.shadow` as const as FieldPath<TFieldValues>

  return (
    <BlockStack gap="200">
      <Text variant="headingSm" as="h3">
        Section
      </Text>

      <InlineGrid gap="300" columns={2}>
        <BackgroundEnum
          control={props.control}
          name={backgroundName}
        />

        <SimpleBorderEnum
          control={props.control}
          name={borderName}
        />

        <BorderStyleEnum
          control={props.control}
          name={borderStyleName}
        />

        <BorderWidthEnum
          control={props.control}
          name={borderWidthName}
        />

        <ColourSchemeSelectionEnum
          control={props.control}
          name={colorSchemeName}
        />

        <CornerRadiusEnum
          control={props.control}
          name={cornerRadiusName}
        />

        <SpacingKeywordEnum
          control={props.control}
          name={paddingName}
        />

        <ShadowEnum
          control={props.control}
          name={shadowName}
        />
      </InlineGrid>
    </BlockStack>
  )
}
