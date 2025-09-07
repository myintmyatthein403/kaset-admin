import { z } from 'zod';

export const socialLinkSchema = z.object({
  id: z.string().optional(),
  facebook_url: z.string().optional(),
  instagram_url: z.string().optional(),
  twitter_url: z.string().optional(),
  linkedin_url: z.string().optional(),
  youtube_url: z.string().optional()
})

export type SocialLinkSchemaType = z.infer<typeof socialLinkSchema>;
