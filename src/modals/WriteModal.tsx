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
import { ref, set } from "firebase/database";
import { database, storage } from "../utils/firebase";
import {
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
} from "firebase/storage";

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

const WriteModal = ({
  show,
  setShow,
  blogs,
  refetch,
}: {
  show: boolean;
  setShow: (value: boolean) => void;
  blogs: any;
  refetch: () => void;
}) => {
  // ** States
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [filename, setFileName] = useState<string>("image");
  const [downloadURL, setDownloadUrl] = useState<string>("");
  const [blog, setBlog] = useState<string>(blogs?.content || "");
  const { category, blogIndex, selectBlog } = useContext(BlogContext);

  const handleBlogContentChange = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    setBlog(target.value);
  };

  const handleClose = () => {
    setBlog("");
    setShow(false);
  };

  const uploadImage = (file: any) => {
    const refToStorage = storageRef(storage, filename);

    uploadBytes(refToStorage, file)
      .then((snapshot) => {
        console.log("Image uploaded successfully");

        getDownloadURL(refToStorage).then((downloadURL) => {
          console.log("Download URL:", downloadURL);
          setDownloadUrl(downloadURL);
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

  const handleSubmit = () => {
    set(ref(database, `blogs/${blogs.id}/content`), blog).then(() => {
      handleClose();
      console.log("posted succesfully");
    });
    if (downloadURL.length > 4) {
      set(ref(database, `blogs/${blogs.id}/image`), downloadURL).then(() => {
        handleClose();
        console.log("posted succesfully");
      });
    }
    refetch();
    handleClose();
  };

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth="sm"
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
              <Typography sx={{ mb: 1 }} variant="body1">
                {blogs.title}
              </Typography>
              <TextField
                label="Write your blog"
                multiline
                rows={8}
                defaultValue={blogs.content}
                onChange={handleBlogContentChange}
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
                Generate
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Discard
              </Button>
            </div>
          </div>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default WriteModal;
