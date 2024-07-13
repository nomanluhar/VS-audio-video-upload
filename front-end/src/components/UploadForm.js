import React, { useRef, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { schema } from "./validation/inputFormValidation";
import Progressbar from "./ProgressBar";

const UploadForm = () => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef();

  const onSubmit = async (data) => {
    if (!selectedFile || fileError) {
      setFileError("File is required");
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("file", selectedFile);

    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      },
    };

    try {
      await axios.post(
        "http://localhost:5000/api/files/upload",
        formData,
        config
      );
      alert("File uploaded successfully");
    } catch (error) {
      console.error({ error });
      if (error?.response?.status === 413) {
        alert(error.response.data.message);
      } else {
        alert("Failed to upload file");
      }
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
      setSelectedFile(null);
      fileInputRef.current.value = null;
      reset();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileType = file?.type.split("/")[0];

    if (file) {
      if (["audio", "video"].includes(fileType)) {
        setSelectedFile(file);
        setFileError("");
      } else {
        setSelectedFile(null);
        setFileError("Only video and audio files are allowed.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {isLoading && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              zIndex : 9999,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="User Name"
                disabled={isLoading}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!error}
                helperText={error ? error.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Title"
                disabled={isLoading}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!error}
                helperText={error ? error.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Description"
                disabled={isLoading}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!error}
                helperText={error ? error.message : ""}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            disabled={isLoading}
            startIcon={<CloudUpload />}
            fullWidth
          >
            Select File
            <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
          </Button>
          {selectedFile && (
            <Typography variant="body2" mt={1}>
              {selectedFile.name}
            </Typography>
          )}
          {fileError && (
            <Typography variant="body2" color="error" mt={1}>
              {fileError}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          marginTop: 2,
          width: "100%",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading || (uploadProgress > 0 && uploadProgress < 100)}
          fullWidth
        >
          Upload
        </Button>
      </Box>
      {uploadProgress > 0 && <Progressbar progress={uploadProgress} />}
    </form>
  );
};

export default UploadForm;
