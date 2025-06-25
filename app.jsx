import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WatchLater from "./pages/WatchLater";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);

  // Load data from sessionStorage on component mount
  useEffect(() => {
    const savedLikes = sessionStorage.getItem('likedVideos');
    const savedWatchLater = sessionStorage.getItem('watchLaterVideos');
    
    if (savedLikes) {
      setLikedVideos(JSON.parse(savedLikes));
    }
    
    if (savedWatchLater) {
      setWatchLaterVideos(JSON.parse(savedWatchLater));
    }
  }, []);

  // Save to sessionStorage whenever state changes
  useEffect(() => {
    sessionStorage.setItem('likedVideos', JSON.stringify(likedVideos));
  }, [likedVideos]);

  useEffect(() => {
    sessionStorage.setItem('watchLaterVideos', JSON.stringify(watchLaterVideos));
  }, [watchLaterVideos]);

  const handleLike = (videoId) => {
    setLikedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleWatchLater = (videoId) => {
    setWatchLaterVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navbar watchLaterCount={watchLaterVideos.length} />
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    likedVideos={likedVideos}
                    watchLaterVideos={watchLaterVideos}
                    onLike={handleLike}
                    onWatchLater={handleWatchLater}
                  />
                } 
              />
              <Route 
                path="/watch-later" 
                element={
                  <WatchLater 
                    likedVideos={likedVideos}
                    watchLaterVideos={watchLaterVideos}
                    onLike={handleLike}
                    onWatchLater={handleWatchLater}
                  />
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
