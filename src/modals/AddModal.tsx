// ** React Imports
import {
  Ref,
  useState,
  forwardRef,
  ReactElement,
  ChangeEvent,
  useContext,
} from "react";

// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Fade, { FadeProps } from "@mui/material/Fade";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Icon from "../components/icon/index";
import BlogContext from "../context/blogs/BlogContext";
import { push, ref as databaseRef, set } from "firebase/database";

import { database, storage } from "../utils/firebase";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

const AddModal = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (value: boolean) => void;
}) => {
  // ** States
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [filename, setFileName] = useState<string>("image");
  const [data, setData] = useState<{
    title: string;
    keywords: string;
    image: string;
  }>({
    title: "",
    keywords: "",
    image: "",
  });

  const handleClose = () => {
    setShow(false);
  };

  const uploadImage = (file: any) => {
    const refToStorage = storageRef(storage, filename);

    uploadBytes(refToStorage, file)
      .then((snapshot) => {
        console.log("Image uploaded successfully");

        getDownloadURL(refToStorage).then((downloadURL) => {
          console.log("Download URL:", downloadURL);
          setData((prevValue) => {
            return {
              ...prevValue,
              image: downloadURL,
            };
          });
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleUpload = () => {
    console.log(selectedImage.name);

    uploadImage(selectedImage);
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
    } else {
      setSelectedImage(null);
    }
  };

  const handleChange = (e: any) => {
    const key = e.target.name;
    const value = e.target.value;

    setData((prevValue) => {
      return {
        ...prevValue,
        [key]: value,
      };
    });
  };

  const handleSubmit = () => {
    const keywordList = data.keywords.split(",");
    const dataToPush = {
      title: data.title,
      keywords: keywordList,
      category: "Custom",
      image: data.image,
    };

    push(databaseRef(database, "blogs"), dataToPush).then(() => {
      console.log("posted succesfully");
      handleClose();
    });
  };

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth="md"
        scroll="body"
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: "relative",
            pb: (theme) => `${theme.spacing(8)} !important`,
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(5)} !important`,
            ],
            pt: (theme) => [
              `${theme.spacing(8)} !important`,
              `${theme.spacing(12.5)} !important`,
            ],
          }}
        >
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{ position: "absolute", right: "1rem", top: "1rem" }}
          >
            <Icon icon="mdi:close" />
          </IconButton>

          <Grid container spacing={10}>
            <Grid
              item
              xs={12}
              sx={{ pt: (theme) => `${theme.spacing(5)} !important` }}
            >
              <TextField
                name="title"
                label="Add a title"
                rows={1}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ pt: (theme) => `${theme.spacing(5)} !important` }}
            >
              <TextField
                name="keywords"
                label="Add comma separated Keywords"
                rows={1}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "flex-end",
            px: (theme) => [
              `${theme.spacing(5)} !important`,
              `${theme.spacing(5)} !important`,
            ],
            pb: (theme) => [
              `${theme.spacing(3)} !important`,
              `${theme.spacing(3)} !important`,
            ],
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div>
              <label style={{ marginRight: 10 }}>Add Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              ></input>
              <button style={{ marginRight: 100 }} onClick={handleUpload}>
                upload
              </button>
            </div>
            <div>
              <Button variant="contained" sx={{ mr: 2 }} onClick={handleSubmit}>
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AddModal;
