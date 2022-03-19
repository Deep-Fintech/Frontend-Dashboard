import React, { Component } from "react";
import Chart from "kaktana-react-lightweight-charts";
import axios from "axios";
import { io } from "socket.io-client";
import { BACKEND_URL } from "../../constants/Constants";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LiveClock from "../clock/LiveClock";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

function Comparision({
  closeData,
  predictions,
  predictions_b1,
  predictions_b2,
  predictions_b3,
  prevPredictions,
  prevPredictions_b1,
  prevPredictions_b2,
  prevPredictions_b3,
}) {
  return (
    <div>
      <Box ml={3} mr={3}>
        <center>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Paper>
                <LiveClock />

                <h5>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      Current Value:
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <span>
                        {closeData.length !== 0 ? (
                          closeData[closeData.length - 1]["value"]
                        ) : (
                          <CircularProgress />
                        )}
                      </span>
                    </Grid>
                  </Grid>
                </h5>

                <h5>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      Current Directions:
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <span>
                        {closeData.length !== 0 ? (
                          closeData[closeData.length - 1]["value"] >=
                          closeData[closeData.length - 2]["value"] ? (
                            <ImArrowUp color="green" size="3em" />
                          ) : (
                            <ImArrowDown color="red" size="3em" />
                          )
                        ) : (
                          <CircularProgress />
                        )}
                      </span>
                    </Grid>
                  </Grid>
                </h5>
              </Paper>
            </Grid>

            <Grid item xs={2}>
              <Paper>
                <center>
                  <h3>Our Model</h3>
                </center>

                <h5>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      Predicted value:
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <span>
                        {predictions.length !== 0 ? (
                          predictions[0]["value"]
                        ) : (
                          <CircularProgress />
                        )}
                      </span>
                    </Grid>
                  </Grid>
                </h5>

                <h5>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      Prediction Directions:
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <span>
                        {prevPredictions.length > 1 ? (
                          prevPredictions[prevPredictions.length - 1][
                            "value"
                          ] >=
                          prevPredictions[prevPredictions.length - 2][
                            "value"
                          ] ? (
                            <ImArrowUp color="green" size="3em" />
                          ) : (
                            <ImArrowDown color="red" size="3em" />
                          )
                        ) : (
                          <CircularProgress />
                        )}
                      </span>
                    </Grid>
                  </Grid>
                </h5>
              </Paper>
            </Grid>

            <Grid item xs={2}>
              <Paper>
                <center>
                  <h3>Benchmark 1</h3>
                </center>

                <h5>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      Predicted value:
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <span>
                        {predictions_b1.length !== 0 ? (
                          predictions_b1[0]["value"]
                        ) : (
                          <CircularProgress />
                        )}
                      </span>
                    </Grid>
                  </Grid>
                </h5>

                <h5>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      Prediction Directions:
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <span>
                        {prevPredictions_b1.length > 1 ? (
                          prevPredictions_b1[prevPredictions_b1.length - 1][
                            "value"
                          ] >=
                          prevPredictions_b1[prevPredictions_b1.length - 2][
                            "value"
                          ] ? (
                            <ImArrowUp color="green" size="3em" />
                          ) : (
                            <ImArrowDown color="red" size="3em" />
                          )
                        ) : (
                          <CircularProgress />
                        )}
                      </span>
                    </Grid>
                  </Grid>
                </h5>
              </Paper>
            </Grid>

            <Grid item xs={2}>
              <Paper>
                <center>
                  <h3>Benchmark 2</h3>
                </center>

                <h5>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      Predicted value:
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <span>
                        {predictions_b2.length !== 0 ? (
                          predictions_b2[0]["value"]
                        ) : (
                          <CircularProgress />
                        )}
                      </span>
                    </Grid>
                  </Grid>
                </h5>

                <h5>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      Prediction Directions:
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <span>
                        {prevPredictions_b2.length > 1 ? (
                          prevPredictions_b2[prevPredictions_b2.length - 1][
                            "value"
                          ] >=
                          prevPredictions_b2[prevPredictions_b2.length - 2][
                            "value"
                          ] ? (
                            <ImArrowUp color="green" size="3em" />
                          ) : (
                            <ImArrowDown color="red" size="3em" />
                          )
                        ) : (
                          <CircularProgress />
                        )}
                      </span>
                    </Grid>
                  </Grid>
                </h5>
              </Paper>
            </Grid>

            <Grid item xs={2}>
              <Paper>
                <center>
                  <h3>Benchmark 3</h3>
                </center>

                <h5>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      Predicted value:
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <span>
                        {predictions_b3.length !== 0 ? (
                          predictions_b3[0]["value"]
                        ) : (
                          <CircularProgress />
                        )}
                      </span>
                    </Grid>
                  </Grid>
                </h5>

                <h5>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      Prediction Directions:
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                      <span>
                        {prevPredictions_b3.length > 1? (
                          prevPredictions_b3[prevPredictions_b3.length - 1][
                            "value"
                          ] >=
                          prevPredictions_b3[prevPredictions_b3.length - 2][
                            "value"
                          ] ? (
                            <ImArrowUp color="green" size="3em" />
                          ) : (
                            <ImArrowDown color="red" size="3em" />
                          )
                        ) : (
                          <CircularProgress />
                        )}
                      </span>
                    </Grid>
                  </Grid>
                </h5>
              </Paper>
            </Grid>
          </Grid>
        </center>
      </Box>
    </div>
  );
}

export default Comparision;
