import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import WriteModal from "../modals/WriteModal";

interface propsType {
  index: number;
  title: string;
  keywords: string[];
  image: string;
  handleWriteClick: () => void;
}

const colors: ["primary", "warning", "info", "error", "success"] = [
  "primary",
  "warning",
  "info",
  "error",
  "success",
];

const StyledImg = styled("img")({
  width: "80%",
  height: "auto",
  objectFit: "cover",
});

const StyledImgContainer = styled(Box)({
  display: "flex",
  flexBasis: "20%",
  flexGrow: 0,
  alignItems: "center",
  justifyContent: "center",
});

const Blog = ({ title, keywords, image, handleWriteClick }: propsType) => {
  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card
        sx={{
          height: "100%",
          marginTop: 0,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <StyledImgContainer>
          <StyledImg alt="blog-icon" src={image || "/images/blog.webp"} />
        </StyledImgContainer>
        <Box sx={{ flexBasis: "60%", flexGrow: 0 }}>
          <CardContent sx={{ pb: 0, pt: 2 }}>
            <Typography variant="h6">{title}</Typography>
          </CardContent>
          <CardContent>
            {keywords.map((keyword, index) => {
              const color = colors[Math.floor(Math.random() * 5)];
              return (
                <Chip
                  key={index}
                  sx={{ margin: 1 }}
                  variant="outlined"
                  color={color}
                  label={keyword}
                />
              );
            })}
          </CardContent>
        </Box>
        <Box
          sx={{
            flexBasis: "10%",
            flexGrow: 0,
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{ width: 1, mr: 1, borderRadius: 2 }}
            color="warning"
            variant="contained"
            onClick={handleWriteClick}
          >
            Write
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default Blog;
