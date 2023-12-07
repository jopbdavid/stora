import { IoBarChartSharp } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { FaWpforms } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, text: "Stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 2, text: "Classes", path: "classes", icon: <SiGoogleclassroom /> },
  { id: 3, text: "Students", path: "students", icon: <BsFillPersonFill /> },
  { id: 4, text: "Grades", path: "grades", icon: <FaWpforms /> },
  { id: 5, text: "Profile", path: "profile", icon: <ImProfile /> },
];

export default links;
