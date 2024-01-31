import { Link, Outlet } from "react-router-dom";
import LogoImg from '../../assets/logo.svg'
import { Toaster } from "@/components/ui/toaster";

export function AuthenticationLayout() {
  return (
    <div className='authentication grid grid-cols-2 h-screen bg-tickets bg-zinc-900'>
      <div className='flex flex-col justify-between gap-[2rem] px-[3rem] py-[2rem]'>
        <Link to='/'>
          <img src={LogoImg} alt="" className='w-[16rem]' />
        </Link>
        <p className='text-gray-100 text-xl leading-normal'>
          Bem-vindo ao nosso portal de cinema! Faça login para explorar uma experiência cinematográfica única. Escolha suas sessões, reserve seus lugares e entre de cabeça em narrativas que cativam e emocionam.
        </p>
      </div>
      <main className='bg-background flex items-center justify-center'>
        <Toaster />
        <Outlet />
      </main>
    </div>
  )
}