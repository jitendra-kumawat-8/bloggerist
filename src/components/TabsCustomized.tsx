// ** React Imports
import { SyntheticEvent, useContext, useState } from "react";

// ** MUI Imports
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import MuiTabList, { TabListProps } from "@mui/lab/TabList";
import BlogContext from "../context/blogs/BlogContext";

// Styled TabList component
const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .Mui-selected": {
    backgroundColor: theme.palette.warning.light,
    color: `${theme.palette.common.white} !important`,
  },
  "& .MuiTab-root": {
    minHeight: 38,
    borderRadius: 8,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("xs")]: {
      marginRight: theme.spacing(1),
      minWidth: 60,
    },
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(2),
      minWidth: 80,
    },
    [theme.breakpoints.up("md")]: {
      marginRight: theme.spacing(4),
      minWidth: 120,
    },
  },
  "& .MuiTab-textColorInherit.Mui-selected": {
    color: `${theme.palette.common.white} !important`,
  },
  "& .MuiTab-textColorInherit:not(.Mui-selected)": {
    color: `${theme.palette.common.white} !important`,
  },
}));

const DisabledTab = styled(Tab)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,
  minWidth: "auto",
  opacity: 0.5,
  marginRight: theme.spacing(4),
}));

const TabsCustomized = () => {
  // ** State
  const { category, updateCategory } = useContext(BlogContext);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    updateCategory(newValue);
  };

  return (
    <TabContext value={category}>
      <TabList
        onChange={handleChange}
        textColor="inherit"
        aria-label="customized tabs example"
      >
        <DisabledTab disabled label="Categories :" />
        <Tab value="All" label="All" />
        <Tab value="Custom" label="Custom" />
        <Tab value="ICP" label="ICP" />
        <Tab value="Mission" label="Mission" />
        <Tab value="Product" label="Product" />
      </TabList>
    </TabContext>
  );
};

export default TabsCustomized;
