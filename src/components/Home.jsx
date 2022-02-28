import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Grid, Tooltip, Typography, Zoom } from "@mui/material";
import { useHistory } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

const typoStyles = {
  padding: 20,
};

const paperStyles = {
  cursor: "pointer",
};

function Home() {
  let history = useHistory();

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={5}
      >
        <Grid item>
          <Paper
            elevation={3}
            style={{
              padding: 20,
              backgroundColor: "#1a6384",
              textAlign: "center",
            }}
          >
            <Typography variant="h3" color={"white"}>
              Cryptocurrency Volatility Forecasting
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={3}
        spacing={2}
      >
        <Grid item>
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial="hidden"
            animate="show"
          >
            <Tooltip title="Click" TransitionComponent={Zoom} arrow>
              <Paper
                elevation={3}
                style={{
                  padding: 20,
                  backgroundColor: "#6C5EBA",
                  cursor: "pointer",
                }}
                onClick={() => history.push("/singlestep")}
              >
                <Typography color={"white"} variant="h5">
                  1 MIN
                </Typography>
              </Paper>
            </Tooltip>
          </motion.div>
        </Grid>
        <Grid item>
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial="hidden"
            animate="show"
          >
            {" "}
            <Tooltip title="Click" TransitionComponent={Zoom} arrow>
              <Paper
                elevation={3}
                style={{
                  padding: 20,
                  backgroundColor: "#A73E6B",
                  cursor: "pointer",
                }}
              >
                <Typography color={"white"} variant="h5">
                  3 MIN
                </Typography>
              </Paper>
            </Tooltip>
          </motion.div>
        </Grid>
        <Grid item>
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial="hidden"
            animate="show"
          >
            <Tooltip title="Click" TransitionComponent={Zoom} arrow>
              <Paper
                elevation={3}
                style={{
                  padding: 20,
                  backgroundColor: "#F67371",
                  cursor: "pointer",
                }}
              >
                <Typography color={"white"} variant="h5">
                  5 MIN
                </Typography>
              </Paper>
            </Tooltip>
          </motion.div>
        </Grid>
        <Grid item>
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial="hidden"
            animate="show"
          >
            <Tooltip title="Click" TransitionComponent={Zoom} arrow>
              <Paper
                elevation={3}
                style={{
                  padding: 20,
                  backgroundColor: "#64A1D2",
                  cursor: "pointer",
                }}
              >
                <Typography color={"white"} variant="h5">
                  15 MIN
                </Typography>
              </Paper>
            </Tooltip>
          </motion.div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Home;
