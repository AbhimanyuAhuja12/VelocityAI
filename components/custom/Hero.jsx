"use client";
import Lookup from "@/data/Lookup";
import Colors from "@/data/Colors";
import React, { useContext } from "react";
import { ArrowRight, Link } from "lucide-react";
import { useState } from "react";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailsContext";
import SignInDialog from "./SignInDialog";

const Hero = () => {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetails, setUserDetaisl } = useContext(UserDetailContext);
  const[openDialog,setOpenDialog]=useState(false);
  const onGenerate = (input) => {
    if(!userDetails?.name){
         setOpenDialog(true);
         return ;
    }
    setMessages({
      role: "user",
      content: input,
    });
  };
  return (
    <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>

      <div
        className="p-5 border rounded-xl max-w-xl w-full mt-3"
        style={{ backgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-2">
          <textarea
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none "
            onChange={(event) => setUserInput(event.target.value)}
            placeholder={Lookup.INPUT_PLACEHOLDER}
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div>
          <Link className="h-5 w-5"></Link>
        </div>
      </div>

      <div className="flex mt-8 flex-wrap max-w-2xl items-center justify-center">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            onClick={() => onGenerate(suggestion)}
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
            key={index}
          >
            {suggestion}
          </h2>
        ))}
      </div>
      <SignInDialog openDialog={openDialog} closeDialog={(v)=>setOpenDialog(v)}/>
    </div>
  );
};

export default Hero;
