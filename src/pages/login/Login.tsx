import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';
import ConfettiExplosion from 'confetti-explosion-react';




function Login() {
    const [isExploding, setIsExploding] = useState(false);
    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

    useEffect(() => {
        if (usuario.token !== "") {
            setIsExploding(true);
            setTimeout(() => {
                setIsExploding(false);
                navigate('/home');
            }, 2000); // Tempo em milissegundos que os confetes ficarão ativos
        }
    }, [usuario, navigate]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        });
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
            <div className="fundoLogin hidden lg:block"></div>
                <form className="flex justify-center items-center flex-col w-1/2 gap-4"
                    onSubmit={login}>
                    <h2 className=" text-5xl text-white">Entrar</h2>
                    <div className="flex flex-col w-full  ">
                        <label className=" text-white" htmlFor="usuario" >Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className=" text-white" htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-900 rounded p-2 "
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="rounded bg-fuchsia-600 flex justify-center
                                   hover:bg-fuchsia-900 w-1/2 py-2 text-white">

                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span>Entrar</span>
                        }
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p className='text-white'>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                {isExploding && (
                    <div className="absolute inset-0 flex items-center justify-center confetti-container">
                        <ConfettiExplosion />
                    </div>
                )}

                <div className="fundoLogin hidden lg:block "></div>
            </div>
            
        </>
    );
}

export default Login;