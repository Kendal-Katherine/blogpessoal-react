import { FacebookLogo, GithubLogo, InstagramLogo, LinkedinLogo } from "phosphor-react"
import { ReactNode, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

function Footer() {

    const data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

    if (usuario.token !== "") {
        component = (<div className="flex justify-center bg-fuchsia-700 text-white">
            <div className="container flex flex-col items-center py-4">
                <p className='text-xl font-bold'>
                    Blog Pessoal Kendal Katherine | Copyright: {data}
                </p>
                <p className='text-lg'>Acesse minhas redes sociais</p>
                <div className='flex gap-2'>
                    <a href="https://github.com/Kendal-Katherine/" target="_blank">
                        <GithubLogo size={48} weight='bold' />
                    </a>
                    <a href="https://www.linkedin.com/in/kendal-katherine-correia/" target="_blank">
                        <LinkedinLogo size={48} weight='bold' />
                    </a>
                    <a href="https://www.instagram.com/kendal.katherine/" target="_blank">
                        <InstagramLogo size={48} weight='bold' />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100071062966062" target="_blank">
                        <FacebookLogo size={48} weight='bold' />
                    </a>
                </div>
            </div>
        </div>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Footer