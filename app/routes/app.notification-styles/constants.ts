import { z } from 'zod'

export const METAFIELD_NAMESPACE = 'emails'
export const METAFIELD_KEY = 'notification_style'

export const notificationStylesSchema = z.object({
  ownerId: z.string({ required_error: 'Owner ID is required' }),
  value: z.string({ required_error: 'Value is required' }),
})

export type NotificationStyles = z.infer<typeof notificationStylesSchema>
