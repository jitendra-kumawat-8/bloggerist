import { Container, Typography } from "@mui/material";
import BlogList from "../components/BlogList";

const Body = () => {
  return (
    <Container
      className="body-container"
      sx={{
        px: { xs: 5, sm: 5, md: 10 }, // Adjust the padding based on breakpoints
        maxWidth: "100%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Typography variant="body1" sx={{ my: 2 }}>
        Recommended Topics
      </Typography>
      <BlogList />
    </Container>
  );
};

export default Body;
