import FruitsCard from "../components/FruitsCard";

import { Box, Typography } from "@mui/material";
import { useGetAllFruitsQuery } from "../services/fruitsService";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Fruits = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const {
    data: fruits,
    isLoading,
    refetch,
  } = useGetAllFruitsQuery(user?.id, {
    skip: !user?.id,
  });

  const handleLogout = () => {
    navigate(ROUTES.LOGIN, { replace: true });
  };

  useEffect(() => {
    if (location.state?.id) {
      setUser({ id: location.state?.id, nickname: location.state?.nickname });
    }
  }, [location.state]);

  useEffect(() => {
    if (user?.id) {
      refetch();
    }
  }, [location.pathname, user?.id, refetch]);

  return (
    <MainContainer
      sx={{
        gap: "15px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Frutas
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          {fruits?.map((currentFruits, index) => (
            <FruitsCard
              key={index}
              fruits={currentFruits}
              userId={user?.id}
            />
          ))}
        </Box>
      </Box>
    </MainContainer>
  );
};

export default Fruits;
