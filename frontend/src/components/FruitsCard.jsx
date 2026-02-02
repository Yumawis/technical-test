import { Box, IconButton, Rating, Typography } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useAddFavoriteFruitsMutation } from "../services/favoriteServices";

import { useEffect } from "react";

const FruitsCard = ({ fruits, userId, sx = {} }) => {
  const [addFavoriteFruits, { data, error, isSuccess, isError, isLoading }] =
    useAddFavoriteFruitsMutation();

  const handleAddFavoriteFruits = () => {
    addFavoriteFruits({ userId, fruitsId: fruits?._id });
  };

  useEffect(() => {
    if (isSuccess) alert(data?.message);
    if (isError) alert(error?.data?.message);
  }, [isSuccess, isError, data, error]);

  return (
    <Box
      sx={{
        minWidth: "300px",
        minHeight: "320px",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        gap: 1.5,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        boxShadow: 3,
        ...sx,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "250px",
          backgroundColor: "#f2f2f2",
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={`data:image/png;base64,${fruits?.image}`}
          alt={fruits?.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Typography variant="h6">{fruits?.name}</Typography>

      <Typography color="text.secondary">{fruits?.description}</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        {fruits?.isFavorite ? (
          <IconButton onClick={handleAddFavoriteFruits}>
            <FavoriteIcon sx={{ fill: "red" }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleAddFavoriteFruits}>
            <FavoriteBorderIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default FruitsCard;
