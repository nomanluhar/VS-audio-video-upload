import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UploadForm from "../components/UploadForm";

const UploadPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Video and Audio Upload Application
          </Typography>
          <UploadForm />
          <Box mt={2} textAlign="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/listing")}
            >
              Go to Listing Page
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default UploadPage;
