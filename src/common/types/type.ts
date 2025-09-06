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
}

export type FAQ = BASE_TYPE & {
  question: string;
  answer: string
}

export type GENRE = BASE_TYPE & {
  name: string;
  description?: string | null;
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
