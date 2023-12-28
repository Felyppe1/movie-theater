type AdminHeaderProps = {
  h1: string
  p: string
}

export function AdminMainHeader({ h1, p }: AdminHeaderProps) {
  return (
    <>
      <h1 className={'text-3xl font-semibold'}>{h1}</h1>
      <p className={'text-lg text-muted-foreground pb-[1.5rem] border-b-2'}>{p}</p>
    </>
  )
}