import React, { Component } from "react";
import Chart from "kaktana-react-lightweight-charts";
import axios from "axios";
import { io } from "socket.io-client";
import { Button } from "@mui/material";
import { BACKEND_URL } from "../../Constants/constants";

const socket = io(BACKEND_URL);
// client-side
// socket.on("connect", () => {
//   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
// });

const MINUTE_MS = 60000;

export class Live extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        // alignLabels: true,
        // timeScale: {
        //   rightOffset: 12,
        //   barSpacing: 3,
        //   fixLeftEdge: true,
        //   lockVisibleTimeRangeOnResize: true,
        //   rightBarStaysOnScroll: true,
        //   borderVisible: false,
        //   borderColor: "#fff000",
        //   visible: true,
        //   timeVisible: true,
        //   secondsVisible: false,
        // },
        priceLineWidth: 1,
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
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
    };
  }

  componentDidMount() {
    this.invokeLiveKLINESocket();
    this.getKlineData();
    this.getCloseData();
    this.callEveyMin();
    this.getPrediction();
    // this.getTestData();
  }

  callEveyMin = () => {
    const interval = setInterval(() => {
      this.getPrediction();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  };

  invokeLiveKLINESocket = () => {
    axios.get(BACKEND_URL).then((res) => console.log(res.data));
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
        "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000"
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
            closeData: [
              ...this.state.historicalCloseData,
              ...this.state.myCloseData,
            ],
          })
      );
    });
  };

  getPrediction = async () => {
    axios.get(BACKEND_URL + "predict").then((res) => {
      this.setState(
        {
          predictions: [
            {
              time: res.data.times.t1,
              value: parseFloat(res.data.predictions.p1),
            },

            {
              time: res.data.times.t2,
              value: parseFloat(res.data.predictions.p2),
            },
            {
              time: res.data.times.t3,
              value: parseFloat(res.data.predictions.p3),
            },
            {
              time: res.data.times.t4,
              value: parseFloat(res.data.predictions.p4),
            },
            {
              time: res.data.times.t5,
              value: parseFloat(res.data.predictions.p5),
            },
          ],
        },
        () => {
          console.log("Predictions : ", this.state.predictions);
          this.setState(
            (prevState) => {
              return {
                ...prevState,
                prevPredictions: [
                  ...prevState.prevPredictions,
                  this.state.predictions,
                ],
              };
            },
            () => console.log("Prev Pred : ", this.state.prevPredictions)
          );
        }
      );
    });
  };

  chartLineSeriesData = (data) => {
    return {
      data,
      options: {
        priceLineVisible: true,
        priceLineWidth: 1,
      },
    };
  };

  getChartData = (data) => {
    const myList = [];
    data.map((d) => {
      myList.push(this.chartLineSeriesData(d));
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
      },
    };
  };

  render() {
    return (
      <React.Fragment>
        <Chart
          options={this.state.options}
          // candlestickSeries={this.state.candlestickSeries}
          lineSeries={[
            ...this.getChartData([
              this.state.closeData,
              this.state.predictions,
            ]),
            ...this.getPrevPredictions(this.state.prevPredictions),
          ]}
          autoWidth
          height={550}
          darkTheme={true}
          socket={socket}
          legend="BTC/USDT"
        />
        {/* <Button variant="contained">Click</Button> */}
      </React.Fragment>
    );
  }
}
export default Live;
