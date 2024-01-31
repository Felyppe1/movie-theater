import { Link, Outlet } from "react-router-dom";
import LogoImg from '../../assets/logo.svg'
import { Toaster } from "@/components/ui/toaster";

export function AuthenticationLayout() {
  return (
    <div className='authentication h-screen'>
      <div className='flex flex-col justify-between gap-[2rem] px-[3rem] py-[2rem] bg-tickets bg-zinc-900 fixed top-0 bottom-0 w-[50vw]'>
        <Link to='/'>
          <img src={LogoImg} alt="" className='w-[16rem]' />
        </Link>
        <p className='text-gray-100 text-xl leading-normal'>
          Bem-vindo ao nosso portal de cinema! Faça login para explorar uma experiência cinematográfica única. Escolha suas sessões, reserve seus lugares e entre de cabeça em narrativas que cativam e emocionam.
        </p>
      </div>
      <main className='bg-background flex items-center justify-center w-[50vw] min-h-full absolute right-0 pt-[3rem] pb-[5rem] px-[2rem]'>
        <div className="mx-auto flex flex-col justify-center space-y-6 max-w-[24rem] w-full">
          <Toaster />
          <Outlet />
        </div>
      </main>
    </div>
  )
}