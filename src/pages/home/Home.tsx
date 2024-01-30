import { useRef } from "react";
import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem"

function Home() {

    const postagensRef = useRef<HTMLDivElement>(null);

    const scrollParaPostagens = () => {
        if (postagensRef.current) {
            postagensRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <>
            <div id="container" className="
                flex 
                justify-center 
                bg-fuchsia-300
                                ">
                <div id="subcontainer" className="
                    container 
                    grid 
                    grid-cols-2 
                    
                    ">
                    <div id="texto" className="
                        flex 
                        flex-col 
                        gap-4 
                        items-center 
                        justify-center 
                        py-4
                        ">
                        <h2 className="
                            text-5xl
                            font-bold
                        ">Seja Bem Vinde!</h2>
                        <p className="text-xl">Expresse aqui os seus pensamentos e opiniões</p>

                        <div className="
                            flex 
                            justify-around 
                            gap-4
                            ">
                                 <ModalPostagem />
                        

                            <button className="
                               border border-black rounded hover:bg-fuchsia-700 hover:text-white
                                px-4 
                                py-2
                                " onClick={scrollParaPostagens}> 
                                Ver Postagens
                                </button>
                        </div>
                    </div>

                    <div id="imagem" className="
                        flex 
                        justify-center
                        ">
                        <img
                            src="https://ik.imagekit.io/lcjdr9dex/app-development-animate%20(1).svg?updatedAt=1705615166914"
                            alt="Imagem da Página Home"
                            className="w-2/3"
                        />
                    </div>
                </div>
            </div>
            <ListaPostagens ref={postagensRef}/>

        </>
    )
}

export default Home