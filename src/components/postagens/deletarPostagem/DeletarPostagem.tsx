import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Postagem from '../../../models/Postagem'
import { buscar, deletar } from '../../../services/Service'

function DeletarPostagem() {
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  let navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function retornar() {
    navigate("/postagens")
  }

  async function deletarPostagem() {
    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      alert('Postagem apagada com sucesso')

    } catch (error) {
      alert('Erro ao apagar a Postagem')
    }

    retornar()
  }
  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4 font-bold text-white'>Deletar postagem</h1>

      <p className='text-center text-white mb-4 font-bold'>Você tem certeza de que deseja apagar a postagem a seguir?</p>

      <div className='border border-black flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-fuchsia-700  text-white font-bold text-2xl'>Postagem</header>
        <div className="p-4 bg-fuchsia-300">
          <p className='text-xl h-full '>{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>
        <div className="flex">
          <button className='text-slate-100 bg-red-500 hover:bg-red-700 w-full py-2' onClick={retornar}>Não</button>
          <button className='w-full text-slate-100 bbg-fuchsia-700 hover:bg-fuchsia-900 flex items-center justify-center' onClick={deletarPostagem}>
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarPostagem