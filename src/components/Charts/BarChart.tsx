import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const BarChart = ({ chartData }: any) => <Bar data={chartData} options={{}} />;

export default BarChart;
