import { Grid, Typography } from "@mui/material";
import { get, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import BlogContext from "../context/blogs/BlogContext";
import WriteModal from "../modals/WriteModal";
import { database } from "../utils/firebase";
import Blog from "./Blog";

const BlogList = () => {
  const { category, selectBlog } = useContext<any>(BlogContext);
  const [index, setIndex] = useState<number>(0);
  const [blogs, setBlogs] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showWrite, setShowWrite] = useState<boolean>(false);

  const refetch = async () => {
    await get(ref(database, `blogs`)).then((snapshot) => {
      const temp = snapshot.val();

      const filteredKeys = Object.keys(temp).filter((key) => {
        return temp[key].category === category;
      });

      console.log(filteredKeys);

      const filteredData = filteredKeys.map((key) => {
        return { id: key, ...temp[key] };
      });

      console.log(filteredData);

      setBlogs(filteredData);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const getBlogs = async () => {
      await get(ref(database, `blogs`)).then((snapshot) => {
        const temp = snapshot.val();

        const filteredKeys = Object.keys(temp).filter((key) => {
          return temp[key].category === category;
        });

        console.log(filteredKeys);

        const filteredData = filteredKeys.map((key) => {
          return { id: key, ...temp[key] };
        });

        console.log(filteredData);

        setBlogs(filteredData);
        setIsLoading(false);
      });
    };
    getBlogs();
  }, [category]);

  const handleWriteClick = (index: number) => {
    setIndex(index);
    setShowWrite(true);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        maxHeight: "calc(100vh - 220px)",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "0.5em",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "transparent",
        },
      }}
    >
      {blogs.length > 0 && (
        <WriteModal
          show={showWrite}
          blogs={blogs[index]}
          setShow={setShowWrite}
          refetch={refetch}
        />
      )}
      {!isLoading && blogs.length > 0 ? (
        blogs.map((blog: any, index: number) => {
          return (
            <Blog
              key={index}
              index={index}
              image={blogs[index]?.image || null}
              handleWriteClick={() => {
                handleWriteClick(index);
              }}
              title={blog.title}
              keywords={blog.keywords}
            />
          );
        })
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default BlogList;
