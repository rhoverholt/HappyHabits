import React from "react";
import { Bar } from "react-chartjs-2";

const PlotChart = (props) => {
  // let chartRender = null;

  // if (props.type === 'line') {
  //     chartRender = <Line data={props.data}  options={props.options} />
  // } else if (props.type === 'pie') {
  //     chartRender = <Pie data={props.data} options={props.options} />
  // } else if (props.type === 'bar') {
  //     chartRender = <Bar data={props.data} options={props.options} />
  // }

  return (
    <div>
      <Bar data={props.data} options={props.options} redraw={true} />
    </div>
  );
};

export default PlotChart;
