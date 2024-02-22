import { Link, Outlet } from "react-router-dom";
import LogoImg from '../../assets/logo.svg'
import { Toaster } from "@/components/ui/toaster";

export function AuthenticationLayout() {
  return (
    <div className='authentication h-screen'>
      <div className='flex flex-col justify-between gap-[2rem] px-[3rem] py-[1rem] md:py-[2rem] bg-tickets bg-zinc-900 fixed top-0 bottom-0 w-full md:w-[50vw]'>
        <Link to='/' className='self-center md:self-start'>
          <img src={LogoImg} alt="" className='w-[12rem] md:w-[14rem] lg:w-[16rem]' />
        </Link>
        <p className='hidden md:inline text-gray-100 text-lg lg:text-xl leading-normal'>
          Bem-vindo ao nosso portal de cinema! Faça login para explorar uma experiência cinematográfica única. Escolha suas sessões, reserve seus lugares e entre de cabeça em narrativas que cativam e emocionam.
        </p>
      </div>
      <main className='bg-background flex items-center justify-center w-[90%] sm:w-[80%] md:w-[50vw] md:min-h-full absolute top-[7.5rem] md:top-auto right-[50%] md:right-0 translate-x-[50%] md:translate-x-0 pt-[1.5rem] sm:pt-[3rem] pb-[5rem] px-[1.5rem] sm:px-[2rem]'>
        <div className="mx-auto flex flex-col justify-center space-y-6 max-w-[24rem] w-full">
          <Toaster />
          <Outlet />
        </div>
      </main>
    </div>
  )
}