"use client";

import html2canvas from 'html2canvas';
import { getSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { type TPosterData } from "~/types/TPosterData";
import { useLineupContext } from "../context/LineupContext";
import Poster from "./poster";
import PosterControl from "./poster-control";

export function CreatePoster() {
  const [user, setUser] = useState<string>('')
  const [posterData, setPosterData] = useState<TPosterData[] | []>([])
  const posterRef = useRef(null);
  const {
    mainCover,
    popularArtists,
    popularTracks,
    posterType,
    timeRange,
    setPosterType,
    setTimeRange
  } = useLineupContext()

  const handleDownloadImage = () => {
    if (posterRef.current) {
      html2canvas(posterRef.current, {
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'your-poster.png';
        link.click();
      }).catch(err => console.log(err));
    }
  };

  useEffect(() => {
    getSession()
      .then((data) => setUser(data?.user.name ?? ''))
      .catch(err => console.log(err))
  }, [])

  const topTenArtists = useMemo(() => popularArtists.slice(0, 10), [popularArtists]);
  const topTenTracks = useMemo(() => popularTracks.slice(0, 10), [popularTracks]);

  useEffect(() => {
    posterType === 'artists' ? setPosterData(topTenArtists) : setPosterData(topTenTracks);
  }, [topTenArtists, topTenTracks, posterType])

  return (
    <div className="create-poster grid grid-cols-[60%_1fr] gap-x-12">
      <Poster
        cover={mainCover}
        posterRef={posterRef}
        itemList={posterData}
        posterType={posterType}
      />

      <PosterControl
        handleDownloadImage={handleDownloadImage}
        posterType={posterType}
        setPosterType={setPosterType}
        setTimeRange={setTimeRange}
        timeRange={timeRange}
      />
    </div>
  );
}
