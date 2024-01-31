import  { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import { buscar, atualizar, cadastrar } from '../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import Confetti from 'react-confetti-boom';


function FormularioPostagem() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [showConfetti, setShowConfetti] = useState(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: '',
  });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: '',
    texto: '',
    data: '',
    tema: null,
    usuario: null,
  });

  async function buscarPostagemPorId(id: string) {
    await buscar(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarTemaPorId(id: string) {
    await buscar(`/tema/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarTemas() {
    await buscar(`/tema`, setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
    if (id !== undefined) {
      buscarPostagemPorId(id);
      console.log(tema);

    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate('/postagens');
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true)

    console.log({ postagem });

    if (id != undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
       
        setShowConfetti(true);

        ToastAlerta('Postagem atualizada com sucesso', 'sucesso');

        setTimeout(() => {
          setShowConfetti(false); // Redefinir o estado após 2 segundos
          retornar();
        }, 2000);
        
      } catch (error: any) {
        if (error.toString().includes('403')) {
          ToastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          ToastAlerta('Erro ao atualizar a Postagem', 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        setShowConfetti(true);

        ToastAlerta('Postagem cadastrada com sucesso', 'sucesso');

        setTimeout(() => {
          setShowConfetti(false); // Redefinir o estado após 2 segundos
          retornar();
        }, 2000);
      } catch (error: any) {
        if (error.toString().includes('403')) {
          ToastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          ToastAlerta('Erro ao cadastrar a Postagem','erro');
        }
      }
    }
  }

  

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8  font-bold">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>
      
      {showConfetti && <Confetti />}
      
      <form onSubmit={gerarNovaPostagem} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da postagem</label>
          <input
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-black rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da postagem</label>
          <input
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-black rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Tema da postagem</p>
          <select name="tema" id="tema" className='border-2 p-2 border-black rounded' onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>
            <option value="" selected disabled>Selecione um tema</option>
            {temas.map((tema) => (
              <>
                <option value={tema.id} >{tema.descricao}</option>
              </>
            ))}
          </select>
        </div>
        <button className="rounded text-slate-100 bg-fuchsia-700 hover:bg-fuchsia-900
                     w-1/2 py-2 mx-auto flex justify-center"
          type="submit">

          {isLoading ?
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
            <span>{id !== undefined ? 'Editar' : 'Cadastrar'}</span>
          }
        </button>
      </form>
    </div>
  );
}

export default FormularioPostagem;