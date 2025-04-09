import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
  }, [id]);

  if(!videoDetail?.snippet) return 'Loading...';

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ 
            width: "100%", 
            position: "sticky", 
            top: "86px",
            height: { xs: "45vh", sm: "60vh", md: "77vh" }
          }}>
            <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${id}`} 
              className="react-player" 
              controls 
              width="100%"
              height="100%"
            />
            <Typography color="#fff" variant="h6" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack 
              direction={{ xs: "column", sm: "row" }} 
              justifyContent="space-between" 
              sx={{ color: "#fff" }} 
              py={1} 
              px={2} 
            >
              <Link to={`/channel/${channelId}`}>
                <Typography variant="subtitle1" color="#fff">
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              </Link>
              <Stack direction="row" gap={{ xs: 2, md: 4 }} alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box 
          px={2} 
          py={{ xs: 3, md: 1 }} 
          justifyContent="center" 
          alignItems="center"
          sx={{
            width: { xs: "100%", md: "350px" }
          }}
        >
          <Videos videos={videos} direction={{ xs: "row", md: "column" }} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
