import LightLogo from "@/Assets/LogoLight.png";
import DarkLogo from "@/Assets/LogoDark.png";
import { useSelector } from "react-redux";

type Props = {};

export default function Logo({}: Props) {
  const Theme = useSelector((state: any) => state.Theme);
  return <img src={Theme === "Light" ? LightLogo : DarkLogo} alt="Logo" className="w-32" />;
}
