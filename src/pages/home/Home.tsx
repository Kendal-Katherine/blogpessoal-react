
function Home() {

    return (
        <>
            <div id="container" className="
                flex 
                justify-center 
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
                            <div className="
                                rounded 
                                border-solid 
                                border-2 
                                px-4 
                                py-2
                                ">
                                Nova Postagem
                            </div>
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
        </>
    )
}

export default Home