import LightLogo from "@/Assets/LogoLight.png";
import DarkLogo from "@/Assets/LogoDark.png";
import { useSelector } from "react-redux";

type LogoProps = {};

export default function Logo({}: LogoProps) {
  const Theme = useSelector((state: any) => state.Theme);
  return <img src={Theme === "Light" ? LightLogo : DarkLogo} alt="Logo" className="w-32" />;
}
