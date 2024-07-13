import { Box, Grid, LinearProgress, Typography } from "@mui/material";

const Progressbar = ({ progress }) => {
  return (
    <Grid item xs={12}>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            color="text.secondary"
          >{`${progress}%`}</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default Progressbar;
