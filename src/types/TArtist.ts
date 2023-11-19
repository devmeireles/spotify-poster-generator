export interface TArtistResponse {
  items: TArtist[]
  total: number
  limit: number
  offset: number
  href: string
  next: string
  previous: string
}

export interface TArtist {
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface Image {
  height: number
  url: string
  width: number
}
