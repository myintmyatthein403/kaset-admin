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

export type MEDIA = {
  id: string;
  mimetype: string;
  type: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
