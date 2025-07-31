import Gymv1 from "../assets/images/Gymv1.png";
import Gymv2 from "../assets/images/Gymv2.png";
import Gymv3 from "../assets/images/Gymv3.png";
import Gymv4 from "../assets/images/Gymv4.png";
import Gymv5 from "../assets/images/Gymv5.png";
import Gymv6 from "../assets/images/Gymv6.png";


const images = [Gymv1, Gymv2, Gymv3, Gymv4, Gymv5, Gymv6];

const bonusData = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  duration: "Saatlik",
  description: "Saatlik olarak göreviniz yenilenir.",
  points: "+3 Puan",
  photo: images[index],
}));

export default bonusData;
