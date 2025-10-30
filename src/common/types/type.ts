import type { ACCOUNT_STATUS } from "../enums";

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

export type COLLECTION = BASE_TYPE & {
  title: string;
  slug: string;
  background: MEDIA;
  tracks: TRACK[];
}

export type EXCHANGE_RATE = BASE_TYPE & {
  currency: string;
  rate: number;
}

export type PRODUCT_ATTRIBUTE = BASE_TYPE & {
  name: string;
}

export type PRODUCT_ATTRIBUTE_VALUE = BASE_TYPE & {
  attribute: string;
  value: string;
  product_attribute: PRODUCT_ATTRIBUTE
}

export type POPULAR_TRACK = BASE_TYPE & {
  tracks: TRACK[]
}

export type FEATURED_ARTIST = BASE_TYPE & {
  artist: TRACK[]
}

export type FEATURED_PRODUCT = BASE_TYPE & {
  products: PRODUCT[];
}

export type TRACK = BASE_TYPE & {
  name: string;
  slug: string;
}

export type ALBUM = BASE_TYPE & {
  name: string;
  description?: string;
  slug: string;
  released_date?: string;
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
  featured_video?: string;
  social_media_links?: SOCIAL_MEDIA_LINK[];
  status: ACCOUNT_STATUS;
  userId: string;
}

export type SOCIAL_MEDIA_LINK = BASE_TYPE & {
  url: string;
  platform: PLATFORM;
}

export type ROLE = BASE_TYPE & {
  name: string;
}

export type USER = BASE_TYPE & {
  email: string;
  status: string;
  name: string;
  banned_reason?: string;
  claimable: boolean;
  role: ROLE;
}

export type PLATFORM = BASE_TYPE & {
  name: string;
  icon: MEDIA;
}

export type CREDIT_KEY = BASE_TYPE & {
  name: string;
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
  description?: string;
  base_price: number;
  slug: string;
  is_out_of_stock: boolean;
  stripe_product_id?: string;
  stripe_price_id?: string;
  included_item?: string;
  product_category: PRODUCT_CATEGORY;
  productImages: MEDIA[];
  product_images: MEDIA[];
  variations: PRODUCT_VARIATION[];
}

export type PRODUCT_VARIATION = BASE_TYPE & {
  sku: string;
  price: number;
  size: string;
  stock: number;
  color_name: string;
  color_code: string;
  is_out_of_stock: boolean;
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
