import { AdminMainHeader } from "@/components/ui/AdminMainHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useConfigurationStore } from "@/store/configuration";
import { FaCircleExclamation } from "react-icons/fa6"

export function Admin() {
  const configuration = useConfigurationStore(state => state.configuration)
  
  return (
    <>
      <AdminMainHeader h1='Módulo administrativo' p='Gerencie os filmes e cinemas' backLink='' />
      <section className='my-5 space-y-4'>
        {configuration?.admin_accessible && (
          <Alert>
            <FaCircleExclamation />
            <AlertTitle>Admin acessível</AlertTitle>
            <AlertDescription>
              O módulo administrativo está acessível devido às configurações do administrador
            </AlertDescription>
          </Alert>
        )}

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
            <li>Criar sessões de filmes (ainda não implementado)</li>
          </ul>
        </article>

        <article>
          <h2 className='text-lg font-semibold text-secondary-foreground py-1'>Administrador</h2>
          <ul className='list-disc pl-6'>
            <li>Todas as permissões anteriores</li>
            <li>Mudar configurações do site</li>
          </ul>
        </article>
      </section>
    </>
  )
}