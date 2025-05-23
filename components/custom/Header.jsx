import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";

function Header() {
  return (
    <div className="w-full p-4 flex items-center justify-between">
      <Image src="/logo.png" alt="Logo" width={40} height={40} />

      <div className="flex gap-4">
        <Button  className="cursor-pointer" variant="ghost">Sign In</Button>
        <Button className="text-white cursor-pointer" style={{backgroundColor:Colors.BLUE}}>Get Started</Button>
      </div>
    </div>
  );
}

export default Header;
