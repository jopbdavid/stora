import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 2, text: "Turmas", path: "classes", icon: <MdQueryStats /> },
  { id: 3, text: "Avaliações", path: "grades", icon: <FaWpforms /> },
  { id: 4, text: "Perfil", path: "profile", icon: <ImProfile /> },
];

export default links;
