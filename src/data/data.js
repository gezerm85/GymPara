import img from "../assets/images/Rectangle.png";

const data = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: "Hepsiburada Hediye çeki",
  price: 200,
  model: "Model: WH-1000XM4, Black",
  desc: "The technology with two noise sensors and two microphones on each ear cup detects ambient noise and sends the data to the HD noise minimization processor QN1. Using a new algorithm, the QN1 then processes and minimizes noise for different acoustic environments in real time. Together with a new Bluetooth Audio SoC ",
  img: img,
}));

export default data;
