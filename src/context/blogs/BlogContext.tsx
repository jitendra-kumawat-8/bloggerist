import { createContext } from "react";

const BlogContext = createContext({
  category: "ICP",
  blogIndex: null,
  updateCategory: (newCat: string) => {},
  selectBlog: (newInd: number) => {},
});

export default BlogContext;
