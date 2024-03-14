import { AdminMainHeader } from "@/components/ui/AdminMainHeader";

export function Admin() {
  return (
    <>
      <AdminMainHeader h1='Módulo administrativo' p='Gerencie os filmes e cinemas' backLink='' />
      <section className='my-5 space-y-4'>
        <p>
          Aqui na área administrativa é possível gerenciar todo o conteúdo do site principal. <br/>
          As permissões são definidas de acordo com as seguintes funções do usuário: <br/>
        </p>
        <article>
          <h2 className='text-lg font-semibold text-secondary-foreground py-1'>Administrador de Filmes</h2>
          <ul className='list-disc pl-6'>
            <li>Selecionar filmes para o banco de dados</li>
          </ul>
        </article>

        <article>
          <h2 className='text-lg font-semibold text-secondary-foreground py-1'>Administrador de Cinemas</h2>
          <ul className='list-disc pl-6'>
            <li>Cadastrar cinemas</li>
            <li>Selecionar filmes do banco de dados para exibição no cinema</li>
            <li>Cadastrar formato das salas de cinema</li>
            <li>Criar sessões de filmes</li>
          </ul>
        </article>

        <article>
          <h2 className='text-lg font-semibold text-secondary-foreground py-1'>Administrador</h2>
          <ul className='list-disc pl-6'>
            <li>Todas as permissões</li>
          </ul>
        </article>
      </section>
    </>
  )
}