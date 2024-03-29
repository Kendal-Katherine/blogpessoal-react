import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import './Cadastro.css';
import { useNavigate } from "react-router-dom"
import Usuario from "../../models/Usuario"
import { cadastrarUsuario } from "../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import ConfettiExplosion from 'confetti-explosion-react';



function Cadastro() {

    const navigate = useNavigate()
    const [isExploding, setIsExploding] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [confirmaSenha, setConfirmaSenha] = useState<string>("")

    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    useEffect(() => {
        if (usuario.id !== 0) {
            setIsExploding(true);
           
            setTimeout(() => {
            setIsExploding(false);
            retornar()
            }, 3000); // Tempo em milissegundos que os confetes ficarão ativos
            
        }
    }, [usuario])

    function retornar() {
        navigate('/login')
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmaSenha(e.target.value)
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
            setIsLoading(true)

            try {
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
                toastAlerta('Usuário cadastrado com sucesso', "sucesso")

            } catch (error) {
                toastAlerta('Erro ao cadastrar o Usuário', "erro")
            }

        } else {
            toastAlerta('Erro ao cadastrar o Usuário', "erro")
            setUsuario({ ...usuario, senha: "" })
            setConfirmaSenha("")
        }

        setIsLoading(false)
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold bg-fuchsia-300">
                <div className="fundoCadastro hidden lg:block  "></div>
                <form
                    className='flex justify-center items-center flex-col w-2/3 gap-3'
                    onSubmit={cadastrarNovoUsuario}>
                    <h2 className='text-5xl '>Cadastrar</h2>
                    <div className="flex flex-col w-full ">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Nome"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.nome}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="foto">Foto</label>
                        <input
                            type="text"
                            id="foto"
                            name="foto"
                            placeholder="Link da sua foto"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.foto}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuario.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="confirmarSenha">Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            placeholder="Confirmar Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={confirmaSenha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                        />
                    </div>
                    <div className="flex justify-around w-full gap-8">
                        <button
                            className='rounded text-white bg-red-600 hover:bg-red-700 w-1/2 py-2'
                            onClick={retornar}>
                            Cancelar
                        </button>
                        <button
                            className='rounded text-white bg-fuchsia-700 hover:bg-fuchsia-900 w-1/2 
                                       py-2 flex justify-center'
                            type='submit'>
                            {isLoading ? <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                                <span>Cadastrar</span>}
                        </button>

                    </div>
                </form>
                {isExploding && (
                    <div className="absolute inset-0 flex items-center justify-center confetti-container">
                        <ConfettiExplosion />
                    </div>
                )}
            </div>
        </>
    )
}

export default Cadastro

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function toastAlerta(arg0: string, arg1: string) {
    throw new Error("Function not implemented.")
}