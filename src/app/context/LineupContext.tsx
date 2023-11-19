'use client'

import { type ReactNode, createContext, useContext, useState } from "react";
import { type TPosterData } from "~/types/TPosterData";
import { type TPosterType } from "~/types/TPosterType";
import { type TTimeRange } from "~/types/TTimeRange";
import { trpc } from "~/utils/trpc";

export interface ILineupContext {
  mainCover: string;
  popularArtists: TPosterData[] | [];
  popularTracks: TPosterData[] | [];
  posterType: TPosterType;
  setPosterType: (type: TPosterType) => void;
  timeRange: TTimeRange;
  setTimeRange: (type: TTimeRange) => void;
}

const defaultState: ILineupContext = {
  popularArtists: [],
  popularTracks: [],
  mainCover: '',
  posterType: 'artists',
  setPosterType: () => null,
  timeRange: 'long_term',
  setTimeRange: () => null,
}

export const LineupContext = createContext<ILineupContext>(defaultState)

export const useLineupContext = (): ILineupContext => {
  const context = useContext(LineupContext);
  if (!context) {
    throw new Error("useLineupContext must be used within a LineupProvider");
  }
  return context;
};


type Props = {
  children: ReactNode;
};

export const LineupProvider = (props: Props) => {
  const [posterType, setPosterType] = useState<TPosterType>('artists')
  const [timeRange, setTimeRange] = useState<TTimeRange>('long_term')

  const artists = trpc.artist.getArtists.useQuery({
    timeRange,
  });

  const tracks = trpc.track.getTracks.useQuery({
    timeRange
  })

  const tracksData = tracks.data
  const artistsData = artists.data

  const popularArtists = artistsData?.sort((a, b) => b.popularity - a.popularity);
  const popularTracks = tracksData?.sort((a, b) => b.popularity - a.popularity);

  const mainCover = posterType === "artists" ?
    popularArtists ? popularArtists[0]?.images[0]?.url ?? '' : '' :
    popularTracks ? popularTracks[0]?.album?.images[0]?.url ?? '' : '';

  const contextValues: ILineupContext = {
    popularArtists: artistsData ?? [],
    popularTracks: popularTracks ?? [],
    mainCover,
    posterType,
    setPosterType: (type: TPosterType) => {
      if (setPosterType) {
        setPosterType(type);
      }
    },
    timeRange,
    setTimeRange: (type: TTimeRange) => {
      if (setTimeRange) {
        setTimeRange(type);
      }
    },
  }

  return <LineupContext.Provider value={contextValues}>{props.children}</LineupContext.Provider>
}