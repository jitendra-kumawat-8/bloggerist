import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import TabsCustomized from "../components/TabsCustomized";
import AddModal from "../modals/AddModal";

const NavBar = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <AddModal show={show} setShow={setShow}></AddModal>
      <AppBar position="static" className="app-bar-container">
        <Toolbar className="app-toolbar">
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{}} variant="h4">
              Blog Lister
            </Typography>
            <Button
              sx={{ alignSelf: "flex-end", ml: 10 }}
              variant="contained"
              color="warning"
              onClick={() => {
                setShow(true);
              }}
            >
              Add Topic
            </Button>
          </Box>

          <TabsCustomized />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
