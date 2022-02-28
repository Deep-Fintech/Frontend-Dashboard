import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Button from "@mui/material/Button";
import { InverseStandardScaling, StandardScaling } from "./TestFunctions";

import io from "socket.io-client";

function Test() {
  const testX = [
    [
      [-2.00990528, -2.01331379, -2.01386633, -2.01857347, -0.02837166],
      [-2.01842222, -2.01830663, -2.01405364, -2.01839255, 0.04897785],
      [-2.01823821, -2.02370265, -2.04093512, -2.04250189, 1.13973521],
      [-2.04234789, -2.03766621, -2.04093512, -2.04539359, 0.3722194],
      [-2.04523945, -2.04720696, -2.05376207, -2.04468535, 1.22307488],
      [-2.04493792, -2.05006023, -2.05659341, -2.06154226, 0.48701128],
      [-2.06138576, -2.06261183, -2.08010019, -2.08074499, 2.04712545],
      [-2.08058908, -2.08141064, -2.08892394, -2.08522635, 0.98537902],
      [-2.08451819, -2.08818155, -2.10219981, -2.0941767, 2.26077964],
      [-2.09392889, -2.08545032, -2.08899205, -2.08990719, 0.77581038],
      [-2.08912149, -2.08172578, -2.08450897, -2.07659919, 0.32857214],
      [-2.07750424, -2.08208881, -2.08969485, -2.08877371, 0.45657726],
      [-2.08865141, -2.08966766, -2.08892394, -2.08455987, -0.01003203],
      [-2.08440377, -2.08491273, -2.08303524, -2.07966408, 0.19667226],
    ],
  ];

  const test_array = [
    [12, 32, 43, 12, 34, 25],
    [12, 34, 25, 12, 32, 43],
    [12, 32, 34, 25, 43, 12],
  ];

  const normalize = async () => {
    const scaled_value = await StandardScaling(
      28923.63,
      34562.377728,
      2998.586198
    );
    console.log(scaled_value);
  };

  const inverseScaling = async () => {
    const new_value = await InverseStandardScaling(
      -1.8804687795071344,
      34562.377728,
      2998.586198
    );
    console.log(new_value);
  };

  const [model, setModel] = useState();

  const getModal = async () => {
    const model_imported = await tf.loadLayersModel("/tfjs/model.json");
    console.log(model_imported);
    setModel(model_imported);
  };

  const getPrediction = async () => {
    const prediction = await model.predict(tf.tensor3d(testX)).print();
    console.log(prediction);
  };

  const getTestSocketData = () => {
    const socket = io.connect("http://localhost:5000");
    console.log("connected", socket);
    socket.on("success", (data) => console.log(data));

    socket.on("message", (msg) => {
      this.setState({
        messages: [...this.state.messages, msg],
      });
    });
  };

  useEffect(() => {
    getModal();
    normalize();
    inverseScaling();
    getTestSocketData();
  }, []);

  return (
    <div>
      <h1></h1>
      <Button variant="contained" onClick={() => getPrediction()}>
        Predict
      </Button>
    </div>
  );
}

export default Test;
