export interface TTrackResponse {
    items: TTrack[]
    total: number
    limit: number
    offset: number
    href: string
    next: string
    previous: string
}


export interface TTrack {
    album: Album
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
}

export interface Album {
    album_type: string
    artists: Artist[]
    available_markets: string[]
    href: string
    id: string
    images: Image[]
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
}

export interface Artist {
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface Image {
    height: number
    url: string
    width: number
}