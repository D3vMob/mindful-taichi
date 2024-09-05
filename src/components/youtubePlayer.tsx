'use client';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useRef, useState } from 'react';
import YouTube, { type YouTubeProps } from 'react-youtube';

// Custom types for Google Cast SDK (simplified)
interface CastContext {
  getInstance(): CastContext;
  setOptions(options: CastOptions): void;
  getCurrentSession(): CastSession | null;
}

interface CastOptions {
  receiverApplicationId: string;
  autoJoinPolicy: string;
}

interface CastSession {
  loadMedia(request: LoadRequest): void;
}

interface LoadRequest {
  mediaInfo: MediaInfo;
}

interface MediaInfo {
  contentId: string;
  contentType: string;
}

// Declare the cast namespace in the global window object
declare global {
  interface Window {
    cast: {
      framework: {
        CastContext: {
          getInstance(): CastContext;
          CastContextEventType: {
            SESSION_STATE_CHANGED: string;
          };
          SessionState: {
            SESSION_STARTED: string;
          };
          AutoJoinPolicy: {
            ORIGIN_SCOPED: string;
          };
          DEFAULT_MEDIA_RECEIVER_APP_ID: string;
        };
      };
      media: {
        MediaInfo: new (contentId: string, contentType: string) => MediaInfo;
        LoadRequest: new (mediaInfo: MediaInfo) => LoadRequest;
      };
    };
  }
}

const YouTubePlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null); // YouTube player reference
  const [castLoaded, setCastLoaded] = useState(false);
  const [castSession, setCastSession] = useState<CastSession | null>(null);

  useEffect(() => {
    const loadCastSdk = async () => {
      if (typeof window !== 'undefined' && !window.cast) {
        try {
          await loadScript('https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');
          console.log('Cast SDK Loaded');
          initializeCast();
        } catch (error) {
          console.error('Error loading Cast SDK:', error);
        }
      } else {
        initializeCast();
      }
    };

    const initializeCast = () => {
      const castContext = window.cast?.framework.CastContext.getInstance();
      if (castContext) {
        castContext.setOptions({
          receiverApplicationId: window.cast.framework.CastContext.DEFAULT_MEDIA_RECEIVER_APP_ID,
          autoJoinPolicy: window.cast.framework.CastContext.AutoJoinPolicy.ORIGIN_SCOPED,
        });
      }

      setCastLoaded(true);

      const session = castContext?.getCurrentSession();
      setCastSession(session);
    };

    loadCastSdk().catch((error) => console.error('Error in loadCastSdk:', error));
  }, []);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    playerRef.current = event.target;
  };

  const handleCast = () => {
    if (castSession && playerRef.current) {
      const mediaInfo = new window.cast.media.MediaInfo(videoId, 'video/mp4');
      const request = new window.cast.media.LoadRequest(mediaInfo);

      castSession.loadMedia(request);
    }
  };

  // Explicitly type the opts object
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
      {castLoaded && castSession && (
        <button onClick={handleCast}>Cast to TV</button>
      )}
    </div>
  );
};

export default YouTubePlayer;

// Utility function to load external scripts
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};
