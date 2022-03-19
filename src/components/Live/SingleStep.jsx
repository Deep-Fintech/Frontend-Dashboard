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
import Comparision from "./Comparision";
import {
  calcProfit,
  removeDuplicatesFromArray,
} from "../../functions/SIngleStepFunctions";

const socket = io(BACKEND_URL);

export class SingleStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        alignLabels: true,
        timeScale: {
          rightOffset: 12,
          barSpacing: 3,
          fixLeftEdge: true,
          lockVisibleTimeRangeOnResize: true,
          rightBarStaysOnScroll: true,
          borderVisible: false,
          borderColor: "#fff000",
          visible: true,
          timeVisible: true,
          secondsVisible: false,
        },
        priceLineWidth: 1,
        timeScale: {
          timeVisible: true,
          secondsVisible: true,
        },
      },
      historicalCandlestickSeries: [],
      candlestickSeries: [],
      myData: [],
      historicalCloseData: [],
      closeData: [],
      myCloseData: [],
      predictions: [],
      prevPredictions: [],
      predList: [],
      // B1 Predictions
      predictions_b1: [],
      prevPredictions_b1: [],
      // B2 Predictions
      predictions_b2: [],
      prevPredictions_b2: [],
      // B3 Predictions
      predictions_b3: [],
      prevPredictions_b3: [],
      profitOurModel: 0,
      profitB1: 0,
      profitB2: 0,
      profitB3: 0,
    };
  }

  componentDidMount() {
    this.invokeLiveKLINESocket();
    // this.getKlineData();
    this.getCloseData();
    this.getPrediction();
    this.getPredictionByBenchmarkOne();
    this.getPredictionByBenchmarkTwo();
    this.getPredictionByBenchmarkThree();
  }

  invokeLiveKLINESocket = () => {
    axios
      .get(BACKEND_URL, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => console.log(res.data));
  };

  getKlineData = () => {
    axios
      .get(
        "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000"
      )
      .then((res) => {
        const cdata = res.data.map((d) => {
          return {
            time: d[0] / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
          };
        });
        this.setState(
          {
            historicalCandlestickSeries: [
              {
                data: cdata,
              },
            ],
          },
          () => this.getSocketKLinetData()
        );
      });
  };

  getCloseData = () => {
    axios
      .get(
        "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=100"
      )
      .then((res) => {
        const cdata = res.data.map((d) => {
          return {
            time: d[0] / 1000,
            value: parseFloat(d[4]),
          };
        });
        this.setState(
          {
            historicalCloseData: [...cdata],
          },
          () => {
            this.getSocketCloseData();
          }
        );
      });
  };

  getSocketKLinetData = () => {
    socket.on("KLINE", (pl) => {
      this.setState(
        {
          myData: [...this.state.myData, pl],
        },
        () =>
          this.setState({
            candlestickSeries: [
              {
                data: [
                  ...this.state.historicalCandlestickSeries[0].data,
                  ...this.state.myData,
                ],
              },
            ],
          })
      );
    });
  };

  getSocketCloseData = () => {
    socket.on("KLINE", (pl) => {
      // console.log(pl);
      this.setState(
        {
          myCloseData: [
            ...this.state.myCloseData,
            {
              time: pl["time"],
              value: pl["close"],
            },
          ],
        },
        () =>
          this.setState({
            closeData: removeDuplicatesFromArray([
              ...this.state.historicalCloseData,
              ...this.state.myCloseData,
            ]),
          })
      );
    });
  };

  // Prediction from our model
  getPrediction = async () => {
    socket.on("PREDICTION", (pl) => {
      // console.log(pl);
      this.setState(
        {
          predictions: [
            {
              time: pl.times.t1,
              value: parseFloat(pl.predictions.p1),
            },
          ],
        },
        () => {
          // console.log("Predictions : ", this.state.predictions);
          this.setState(
            (prevState) => {
              return {
                ...prevState,
                prevPredictions: removeDuplicatesFromArray([
                  ...prevState.prevPredictions,
                  ...this.state.predictions,
                ]),
              };
            },
            () => {
              this.calcProfitOurModel();
            }
            // () => console.log("Prev Pred : ", this.state.prevPredictions)
          );
        }
      );
    });
  };

  // Prediction from Benchmark One
  getPredictionByBenchmarkOne = async () => {
    socket.on("PREDICTION_B1", (pl) => {
      // console.log(pl);
      this.setState(
        {
          predictions_b1: [
            {
              time: pl.times.t1,
              value: parseFloat(pl.predictions.p1),
            },
          ],
        },
        () => {
          // console.log("Predictions : ", this.state.predictions_b1);
          this.setState(
            (prevState) => {
              return {
                ...prevState,
                prevPredictions_b1: removeDuplicatesFromArray([
                  ...prevState.prevPredictions_b1,
                  ...this.state.predictions_b1,
                ]),
              };
            },
            () => {
              this.calcProfitB1();
            }
          );
        }
      );
    });
  };

  // Prediction from Benchmark Two
  getPredictionByBenchmarkTwo = async () => {
    socket.on("PREDICTION_B2", (pl) => {
      // console.log(pl);
      this.setState(
        {
          predictions_b2: [
            {
              time: pl.times.t1,
              value: parseFloat(pl.predictions.p1),
            },
          ],
        },
        () => {
          // console.log("Predictions : ", this.state.predictions_b2);
          this.setState(
            (prevState) => {
              return {
                ...prevState,
                prevPredictions_b2: removeDuplicatesFromArray([
                  ...prevState.prevPredictions_b2,
                  ...this.state.predictions_b2,
                ]),
              };
            },
            () => {
              this.calcProfitB2();
            }
          );
        }
      );
    });
  };

  // Prediction from Benchmark Three
  getPredictionByBenchmarkThree = async () => {
    socket.on("PREDICTION_B3", (pl) => {
      // console.log(pl);
      this.setState(
        {
          predictions_b3: [
            {
              time: pl.times.t1,
              value: parseFloat(pl.predictions.p1),
            },
          ],
        },
        () => {
          // console.log("Predictions : ", this.state.predictions_b3);
          this.setState(
            (prevState) => {
              return {
                ...prevState,
                prevPredictions_b3: removeDuplicatesFromArray([
                  ...prevState.prevPredictions_b3,
                  ...this.state.predictions_b3,
                ]),
              };
            },
            () => {
              this.calcProfitB3();
            }
          );
        }
      );
    });
  };

  chartLineSeriesData = (data, title) => {
    return {
      data,
      options: {
        priceLineVisible: true,
        priceLineWidth: 1,
        title: title,
      },
    };
  };

  getChartData = (data) => {
    const title_list = [
      "Realtime Close ",
      "Our Model",
      "Benchmark 01",
      "Benchmark 02",
      "Benchmark 03",
    ];
    const myList = [];
    data.map((d, index) => {
      myList.push(this.chartLineSeriesData(d, title_list[index]));
    });
    return myList;
  };

  getPrevPredictions = (data) => {
    const myPrevPredList = [];
    data.map((d) => {
      myPrevPredList.push(this.chartPreviousPredLineSeriesData(d));
    });
    return myPrevPredList;
  };

  chartPreviousPredLineSeriesData = (data) => {
    return {
      data,
      options: {
        priceLineVisible: true,
        priceLineWidth: 1,
        lastValueVisible: true,
      },
    };
  };

  // Calculate Profit using models
  calcProfitOurModel = async () => {
    if (this.state.prevPredictions.length > 2) {
      var profit = await calcProfit(
        parseFloat(this.state.profitOurModel),
        parseFloat(
          this.state.prevPredictions[this.state.prevPredictions.length - 3][
            "value"
          ]
        ),
        parseFloat(
          this.state.prevPredictions[this.state.prevPredictions.length - 2][
            "value"
          ]
        ),
        parseFloat(
          this.state.closeData[this.state.closeData.length - 3]["value"]
        ),
        parseFloat(
          this.state.closeData[this.state.closeData.length - 2]["value"]
        )
      );

      console.log("profit fn : ", profit);
      this.setState({
        profitOurModel: profit,
      });
    }
  };

  calcProfitB1 = async () => {
    if (this.state.prevPredictions_b1.length > 2) {
      var profit = await calcProfit(
        parseFloat(this.state.profitB1),
        parseFloat(
          this.state.prevPredictions_b1[
            this.state.prevPredictions_b1.length - 2
          ]["value"]
        ),
        parseFloat(
          this.state.prevPredictions_b1[
            this.state.prevPredictions_b1.length - 1
          ]["value"]
        ),
        parseFloat(
          this.state.closeData[this.state.closeData.length - 3]["value"]
        ),
        parseFloat(
          this.state.closeData[this.state.closeData.length - 2]["value"]
        )
      );

      this.setState({
        profitB1: profit,
      });
    }
  };

  calcProfitB2 = async () => {
    if (this.state.prevPredictions_b2.length > 2) {
      var profit = await calcProfit(
        parseFloat(this.state.profitB2),
        parseFloat(
          this.state.prevPredictions_b2[
            this.state.prevPredictions_b2.length - 2
          ]["value"]
        ),
        parseFloat(
          this.state.prevPredictions_b2[
            this.state.prevPredictions_b2.length - 1
          ]["value"]
        ),
        parseFloat(
          this.state.closeData[this.state.closeData.length - 3]["value"]
        ),
        parseFloat(
          this.state.closeData[this.state.closeData.length - 2]["value"]
        )
      );

      this.setState({
        profitB2: profit,
      });
    }
  };

  calcProfitB3 = async () => {
    if (this.state.prevPredictions_b3.length > 2) {
      var profit = await calcProfit(
        parseFloat(this.state.profitB3),
        parseFloat(
          this.state.prevPredictions_b3[
            this.state.prevPredictions_b3.length - 2
          ]["value"]
        ),
        parseFloat(
          this.state.prevPredictions_b3[
            this.state.prevPredictions_b3.length - 1
          ]["value"]
        ),
        parseFloat(
          this.state.closeData[this.state.closeData.length - 3]["value"]
        ),
        parseFloat(
          this.state.closeData[this.state.closeData.length - 2]["value"]
        )
      );

      this.setState({
        profitB3: profit,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* Realtime Chartv  */}
        <Chart
          options={this.state.options}
          // candlestickSeries={this.state.candlestickSeries}
          lineSeries={[
            ...this.getChartData([
              this.state.closeData,
              this.state.prevPredictions,
              this.state.prevPredictions_b1,
              this.state.prevPredictions_b2,
              this.state.prevPredictions_b3,
            ]),
            // ...this.getPrevPredictions(this.state.prevPredictions),
          ]}
          autoWidth
          height={500}
          darkTheme={true}
          socket={socket}
          legend="BTC/USDT"
        />

        {/* Comparision with benchmarks  */}
        <Comparision
          closeData={this.state.closeData}
          predictions={this.state.predictions}
          predictions_b1={this.state.predictions_b1}
          predictions_b2={this.state.predictions_b2}
          predictions_b3={this.state.predictions_b3}
          prevPredictions={this.state.prevPredictions}
          prevPredictions_b1={this.state.prevPredictions_b1}
          prevPredictions_b2={this.state.prevPredictions_b2}
          prevPredictions_b3={this.state.prevPredictions_b3}
          profitOurModel={this.state.profitOurModel}
          profitB1={this.state.profitB1}
          profitB2={this.state.profitB2}
          profitB3={this.state.profitB3}
        />
      </React.Fragment>
    );
  }
}
export default SingleStep;
