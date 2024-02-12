export const checkoutProfilesQuery = `#graphql
  fragment CustomFont on GenericFile {
    __typename
    id
    mimeType
    alt
    createdAt
    fileStatus
    originalFileSize
    url
  }

fragment CheckoutProfileFragment on CheckoutProfile {
  id
  name
  isPublished
  editedAt
}

query checkoutProfiles {
    checkoutProfiles(first: 100) {
      nodes {
        ...CheckoutProfileFragment
      }
    }

    customFonts: files(
      first: 250,
      query: "media_type:GENERIC_FILE status:ready filename:*.woff",
      sortKey: FILENAME
    ) {
      nodes {
        __typename

        ...CustomFont
      }
    }

    background: __type(name: "CheckoutBrandingBackground") {
      name
      enumValues {
        name
      }
    }
    backgroundStyles: __type(name: "CheckoutBrandingBackgroundStyle") {
      name
      enumValues {
        name
      }
    }
    border: __type(name: "CheckoutBrandingBorder") {
      name
      enumValues {
        name
      }
    }
    borderStyle: __type(name: "CheckoutBrandingBorderStyle") {
      name
      enumValues {
        name
      }
    }
    borderWidth: __type(name: "CheckoutBrandingBorderWidth") {
      name
      enumValues {
        name
      }
    }
    colorSelection: __type(name: "CheckoutBrandingColorSelection") {
      name
      enumValues {
        name
      }
    }
    colorSchemeSelection: __type(name: "CheckoutBrandingColorSchemeSelection") {
      name
      enumValues {
        name
      }
    }
    cornerRadius: __type(name: "CheckoutBrandingCornerRadius") {
      name
      enumValues {
        name
      }
    }
    fontLoadingStrategies: __type(name: "CheckoutBrandingFontLoadingStrategy") {
      name
      enumValues {
        name
      }
    }
    footerPosition: __type(name: "CheckoutBrandingFooterPosition") {
      name
      enumValues {
        name
      }
    }
    globalCornerRadius: __type(name: "CheckoutBrandingGlobalCornerRadius") {
      name
      enumValues {
        name
      }
    }
    headerAlignment: __type(name: "CheckoutBrandingHeaderAlignment") {
      name
      enumValues {
        name
      }
    }
    headerPosition: __type(name: "CheckoutBrandingHeaderPosition") {
      name
      enumValues {
        name
      }
    }
    labelPosition: __type(name: "CheckoutBrandingLabelPosition") {
      name
      enumValues {
        name
      }
    }
    shadow: __type(name: "CheckoutBrandingShadow") {
      name
      enumValues {
        name
      }
    }
    simpleBorder: __type(name: "CheckoutBrandingSimpleBorder") {
      name
      enumValues {
        name
      }
    }
    spacing: __type(name: "CheckoutBrandingSpacing") {
      name
      enumValues {
        name
      }
    }
    spacingKeyword: __type(name: "CheckoutBrandingSpacingKeyword") {
      name
      enumValues {
        name
      }
    }
    typographyFont: __type(name: "CheckoutBrandingTypographyFont") {
      name
      enumValues {
        name
      }
    }
    typographyKerning: __type(name: "CheckoutBrandingTypographyKerning") {
      name
      enumValues {
        name
      }
    }
    typographyLetterCase: __type(name: "CheckoutBrandingTypographyLetterCase") {
      name
      enumValues {
        name
      }
    }
    typographySize: __type(name: "CheckoutBrandingTypographySize") {
      name
      enumValues {
        name
      }
    }
    typographyWeight: __type(name: "CheckoutBrandingTypographyWeight") {
      name
      enumValues {
        name
      }
    }
  }
` as const
