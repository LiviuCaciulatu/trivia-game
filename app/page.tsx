import Image from "next/image";
import Navbar from "./components/Navbar/page";
import SelectLanguage from "./components/SelectLanguage/page";

export default function Home() {
  return (
    <div>
      <Navbar />
      <SelectLanguage />
    </div>
  );
}
