export const brandingFragment = `#graphql
  fragment BrandingFragment on CheckoutBranding {
    customizations {
      checkbox {
        cornerRadius
      }
      control {
        border
        color
        cornerRadius
        labelPosition
      }
      choiceList {
        group {
          spacing
        }
      }
      favicon {
        image {
          id
          url
        }
      }
      global {
        cornerRadius
        typography {
          kerning
          letterCase
        }
      }
      header {
        alignment
        banner {
          image {
            id
            url
          }
        }
        logo {
          image {
            id
            url
          }
          maxWidth
        }
        position
      }
      headingLevel1 {
        typography {
          font
          kerning
          letterCase
          size
          weight
        }
      }
      headingLevel2 {
        typography {
          font
          kerning
          letterCase
          size
          weight
        }
      }
      headingLevel3 {
        typography {
          font
          kerning
          letterCase
          size
          weight
        }
      }
      main {
        backgroundImage {
          image {
            id
            url
          }
        }
        colorScheme
      }
      merchandiseThumbnail {
        border
        cornerRadius
      }
      orderSummary {
        colorScheme
        backgroundImage {
          image {
            id
            url
          }
        }
      }
      primaryButton {
        background
        blockPadding
        border
        cornerRadius
        inlinePadding
        typography {
          font
          kerning
          letterCase
          size
          weight
        }
      }
      secondaryButton {
        background
        blockPadding
        border
        cornerRadius
        inlinePadding
        typography {
          font
          kerning
          letterCase
          size
          weight
        }
      }
      select {
        border
        typography {
          font
          kerning
          letterCase
          size
          weight
        }
      }
      textField {
        border
        typography {
          font
          kerning
          letterCase
          size
          weight
        }
      }
    }
    designSystem {
      colors {
        global {
          accent
          brand
          critical
          decorative
          info
          success
          warning
        }
        schemes {
          scheme1 {
            base {
              accent
              background
              border
              decorative
              icon
              text
            }
            control {
              accent
              background
              border
              decorative
              icon
              text
            }
            primaryButton {
              accent
              background
              border
              decorative
              icon
              text
            }
            secondaryButton {
              accent
              background
              border
              decorative
              icon
              text
            }
          }
          scheme2 {
            base {
              accent
              background
              border
              decorative
              icon
              text
            }
            control {
              accent
              background
              border
              decorative
              icon
              text
            }
            primaryButton {
              accent
              background
              border
              decorative
              icon
              text
            }
            secondaryButton {
              accent
              background
              border
              decorative
              icon
              text
            }
          }
        }
      }
      cornerRadius {
        base
        small
        large
      }
      typography {
        primary {
          name
          base {
            sources
            weight
          }
          bold {
            sources
            weight
          }
          loadingStrategy
        }
        secondary {
          name
          base {
            sources
            weight
          }
          bold {
            sources
            weight
          }
          loadingStrategy
        }
        size {
          base
          ratio
        }
      }
    }
  }
` as const
