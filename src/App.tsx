import { Box, ThemeProvider } from "@mui/material";

import { useState } from "react";
import "./App.css";
import BlogContext from "./context/blogs/BlogContext";
import Body from "./sections/Body";
import Footer from "./sections/Footer";
import NavBar from "./sections/NavBar";
import { theme } from "./themes/theme";

function App() {
  const [category, setCategory] = useState<string>("All");
  const [blogIndex, setBlogIndex] = useState<any>(null);

  const updateCategory = (newCat: string) => {
    setCategory(newCat);
  };

  const selectBlog = (newInd: number) => {
    setBlogIndex(newInd);
  };

  return (
    <BlogContext.Provider
      value={{ category, blogIndex, updateCategory, selectBlog }}
    >
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
          }}
        >
          <NavBar />
          <Body />
          <Footer />
        </Box>
      </ThemeProvider>
    </BlogContext.Provider>
  );
}

export default App;
