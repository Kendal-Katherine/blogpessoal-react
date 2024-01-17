import { useNavigate, Link } from "react-router-dom"


function Home() {
    const navigate = useNavigate()
    return (
      
        <>
            <div id="container" className="bg-pink-500 flex justify-center">
                <div id="subcontainer" className="container grid grid-cols-2 text-white">
                    <div id="texto" className="flex flex-col gap-4 items-center justify-center py-4" >
                        <h2 className="
                        text-5xl
                        font-bold">Seja Bem Vinde</h2>
                        <p className="text-xl">Expresse aqui os seus pensamentos</p>
                        
                        <div className="flex justify-around gap-4">
                            <div className="rounded text-white border-white border-solid border-2 px-4 py-2">
                                Nova Postagem
                            </div>
                        </div>

                    </div>
                    <div id="imagem" className="flex justify-center">
                        <img src="src\assets\img\static-assets-animate.svg"
                            alt="Imagem da Página"
                            className="w-2/3"/>
                    </div>

                    <div>
                    <button type="submit"
                        onClick={() => { navigate('/login') }}
                        className="hover:underline mx-4">
                        Login useNavigate
                    </button>
                    <Link to='/login' className="hover:underline mx-4">Login por Link</Link>
                </div>
                </div>
            </div >
        </>
    )

}

export default Home