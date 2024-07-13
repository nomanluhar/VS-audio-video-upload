import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FileList from "../components/FileList";

const ListingPage = () => {
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
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Uploaded Files
          </Typography>
          <FileList />
          <Box mt={2} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Go to Upload Page
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ListingPage;
