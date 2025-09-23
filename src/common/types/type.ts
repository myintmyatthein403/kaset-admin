export type BASE_TYPE = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export type HOME_SLIDE_SHOW = BASE_TYPE & {
  title: string;
  sub_title?: string;
  button_text?: string;
  url?: string;
  slideShowImage?: File;
  image?: MEDIA,
  is_active?: boolean;
}

export type FAQ = BASE_TYPE & {
  question: string;
  answer: string
}

export type GENRE = BASE_TYPE & {
  name: string;
  description?: string | null;
}

export type POPULAR_TRACK = BASE_TYPE & {
  tracks: TRACK[]
}

export type FEATURED_ARTIST = BASE_TYPE & {
  artist: TRACK[]
}

export type TRACK = BASE_TYPE & {
  name: string;
  slug: string;
}

export type ALBUM = BASE_TYPE & {
  name: string;
  description?: string;
  slug: string;
  cover: MEDIA;
  coverImage: MEDIA;
  artists: {
    id: string;
  }[],
  tracks: {
    id: string
  }[]
}

export type API_TOKEN = BASE_TYPE & {
  key: string;
  client_name: string;
  is_active: boolean;
}

export type LOGO_SETTING = BASE_TYPE & {
  name: string;
  logo_image: MEDIA;
}

export type USER_PROFILE = BASE_TYPE & {
  name: string;
  bio?: string;
  location?: string;
  email?: string;
  cover_image?: MEDIA;
  profile_image?: MEDIA;
  generes?: GENRE[];
  slug: string;
  feature_videos?: MEDIA[];
  social_media_links?: SOCIAL_MEDIA_LINK[];
}

export type SOCIAL_MEDIA_LINK = BASE_TYPE & {
  url: string;
  platform: PLATFORM;
}

export type ROLE = BASE_TYPE & {
  name: string;
}

export type PLATFORM = BASE_TYPE & {
  name: string;
  icon: MEDIA;
}

export type SOCIAL_LINK = BASE_TYPE & {
  facebook_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  youtube_url?: string;
  website_url?: string;
  tiktok_url?: string;
  contact_email?: string;
}

export type PRODUCT_CATEGORY = BASE_TYPE & {
  name: string;
  slug: string;
}

export type PRODUCT = BASE_TYPE & {
  name: string;
  about?: string;
  base_price: number;
  slug: string;
  is_out_of_stock: boolean;
  stripe_product_id?: string;
  stripe_price_id?: string;
  included_item?: string;
  product_category: PRODUCT_CATEGORY;
  product_image: MEDIA;
}

export type MEDIA = {
  id: string;
  mimetype: string;
  type: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
