import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {

    const navigate = useNavigate();

    const [tema, setTema] = useState<Tema>({} as Tema)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/tema/${id}`, setTema, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                ToastAlerta('O token Expirou!', 'info')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/temas")
    }

    async function deletarTema() {

        setIsLoading(true)

        try {
            await deletar(`/tema/${id}`, {
                headers: { 'Authorization': token }
            })
            ToastAlerta('O Tema foi excluído com sucesso!', 'sucesso')
        } catch (error: any) {
            if (error.toString().includes('403')) {
                ToastAlerta('O Token Expirou!', 'info')
                handleLogout();
            } else {
                ToastAlerta('Erro ao excluir o tema.', 'erro')
            }

        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4 font-bold '>Deletar tema</h1>
            <p className='text-center  mb-4 font-bold'>
                Você tem certeza de que deseja apagar o tema a seguir?</p>
            <div className='border border-black flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-fuchsia-700 text-white font-bold text-2xl'>
                    Tema
                </header>
                <p className='p-8 text-3xl bg-fuchsia-300 h-full'>{tema.descricao}</p>
                <div className="flex">
                    <button
                        className='text-slate-100 bg-red-500 hover:bg-red-700 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className='w-full text-slate-100 bg-fuchsia-700 hover:bg-fuchsia-900
                         flex items-center justify-center'
                                   onClick={deletarTema}>
                         {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>Sim</span>
                        
                    }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarTema