"use client";
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import uuid4 from "uuid4";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailsContext";

const SignInDialog = ({ openDialog, closeDialog }) => {
  const { userDetails, setUserDetail } = useContext(UserDetailContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      const user = userInfo?.data;
      setUserDetail(userInfo?.data);
      try {
        await CreateUser({
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
          uid: uuid4(),
        });
      } catch (error) {
        console.error("Error calling CreateUser mutation:", error);
      }

      if (typeof window !== undefined) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      //save data to database
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader className="flex flex-col items-center justify-center gap-3">
            <DialogTitle className="font-bold text-2xl text-center text-white">
              {" "}
              {Lookup.SIGNIN_HEADING}
            </DialogTitle>
            <DialogDescription className="mt-2 text-center text-lg justify-center flex flex-col">
              {Lookup.SIGNIN_SUBHEADING}
              <Button className="bg-blue-500 text-white hover:bg-blue-300 mt-3 mx-auto" onClick={googleLogin}>
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="text-center mt-3">
            {Lookup.SIGNIn_AGREEMENT_TEXT}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInDialog;
