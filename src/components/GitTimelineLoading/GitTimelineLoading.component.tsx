import React from 'react';
import { useBranches } from '../../hooks/use-branches';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/lottie/loading-line.json';

export const GitTimelineLoading: React.FC<{ viewable: boolean }> = viewable => {
  const { branches } = useBranches();
  return (
    viewable && (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}>
        {branches && (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            {branches.map((branch: string, index: number) => (
              <Lottie
                animationData={loadingAnimation}
                loop={true}
                key={index}
                style={{ height: '50px' }}
              />
            ))}
          </div>
        )}
      </div>
    )
  );
};
