"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getUserInfo } from "@vivekkv178/library";
import { onLoginSuccess } from "@/lib/reducers/auth";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHooks";

const Layout = (props: any) => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const checkUser = async () => {
    const user = await getUserInfo();
    if (user) dispatch(onLoginSuccess(user));
    // else router.push(FE_ROUTES.LOGIN);
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
