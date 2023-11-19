import React from 'react';
import { type TPosterData } from '~/types/TPosterData';
import { type TPosterType } from '~/types/TPosterType';

interface PosterProps {
  posterRef: React.MutableRefObject<null>;
  cover: string;
  itemList: TPosterData[];
  posterType: TPosterType
}

const Poster: React.FC<PosterProps> = ({ posterRef, cover, itemList, posterType }) => {
  return (
    <div
      ref={posterRef}
      className={
        `poster grid grid-cols-1 gap-4 bg-white border-4 border-gray-950 w-[640px] min-h-[800px] p-9
          ${posterType === 'artists' ? 'grid-rows-[70%_1fr]' : 'grid-rows-[55%_1fr]'}
      `}
    >
      <div
        className="poster-head bg-gray-200 bg-center bg-cover"
        style={{ backgroundImage: `url(${cover})` }}>
      </div>

      <div className="poster-body py-4">
        <div className="flex flex-col">
          <ul className="columns-2 font-semibold">
            {itemList.map((populars, index) => (
              <li key={index}>
                <span className="uppercase text-[16px]">{index + 1}. {populars.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Poster