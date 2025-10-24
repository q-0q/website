
// components/VideoPlayer.js
'use client'; // If using Next.js 13+ with App Router


import { useEffect, useState } from 'react';

export default function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Replace with your Vercel Blob Storage URL
    const fetchVideoUrl = async () => {
      try {
        const response = await fetch('https://<your-vercel-blob-url>/example.mp4');
        if (!response.ok) throw new Error('Failed to fetch video');
        
        // Convert the response to a blob
        const blob = await response.blob();
        
        // Create a local URL for the blob to use in the video tag
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideoUrl();

    // Clean up object URL when component unmounts
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, []);

  return (
    <div>
      {videoUrl ? (
        <video controls width="600">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}
