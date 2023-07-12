import { IoBarChartSharp } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { FaWpforms } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 2, text: "Turmas", path: "classes", icon: <SiGoogleclassroom /> },
  { id: 3, text: "Alunos", path: "students", icon: <BsFillPersonFill /> },
  { id: 4, text: "Avaliações", path: "grades", icon: <FaWpforms /> },
  { id: 5, text: "Perfil", path: "profile", icon: <ImProfile /> },
];

export default links;
