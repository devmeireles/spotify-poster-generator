import Link from 'next/link';
import React from 'react';
import { type TPosterType } from '~/types/TPosterType';
import { type TTimeRange } from '~/types/TTimeRange';
import { useUserContext } from '../context/UserContext';
import Button from './button';

interface PosterControlProps {
  posterType: TPosterType;
  setPosterType: (type: TPosterType) => void;
  timeRange: TTimeRange;
  setTimeRange: (type: TTimeRange) => void;
  handleDownloadImage: () => void;
}

const PosterControl: React.FC<PosterControlProps> = ({ posterType, setPosterType, setTimeRange, timeRange, handleDownloadImage }) => {
  const { isAuth } = useUserContext();

  return (
    <div className="controls mb-6 px-6 flex flex-col gap-y-12">
      <div className="controls-title">
        <h1 className="text-5xl font-extrabold uppercase">Create your Spotify poster</h1>
      </div>

      {isAuth ? (
        <>
          <div className="controls-item flex flex-col gap-y-4">
            <div className="item-title">
              <p className="text-xl font-semibold">Select your post type</p>
            </div>

            <div className="item-body flex flex-row gap-3">
              <Button
                handleClick={() => setPosterType('artists')}
                active={posterType === 'artists'}
              >Artists</Button>

              <Button
                handleClick={() => setPosterType('tracks')}
                active={posterType === 'tracks'}
              >Albums</Button>
            </div>
          </div>

          <div className="controls-item flex flex-col gap-y-4">
            <div className="item-title">
              <p className="text-xl font-semibold">Time range</p>
            </div>

            <div className="item-body flex flex-row gap-3">
              <Button
                handleClick={() => setTimeRange('long_term')}
                active={timeRange === 'long_term'}
              >All</Button>

              <Button
                handleClick={() => setTimeRange('medium_term')}
                active={timeRange === 'medium_term'}
              >6 Months</Button>

              <Button
                handleClick={() => setTimeRange('short_term')}
                active={timeRange === 'short_term'}
              >4 Weeks</Button>

            </div>
          </div>

          <div className="controls-item flex flex-col gap-y-6 mt-8">
            <div className="item-body flex flex-row">
              <button type="button" className="border-2 border-gray-950 text-gray-950 px-4 py-2 flex-1" onClick={handleDownloadImage}>Download Poster</button>
            </div>
          </div>

          <div className="controls-item flex flex-col gap-y-6 mt-8">
            <Link
              href="/api/auth/signout"
              className="border-2 text-center border-gray-950 text-gray-950 px-4 py-2 flex-1"
            >
              Sign out
            </Link>
          </div>
        </>
      ) : (
        <div className="controls-item flex flex-col gap-y-6 mt-8">
          <Link
            href="/api/auth/signin"
            className="border-2 border-gray-950 text-gray-950 text-center px-4 py-2 flex-1"
          >
            Login with Spotify
          </Link>
        </div>
      )}

    </div>
  )
}

export default PosterControl