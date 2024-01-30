import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'

interface CardTemasProps{
    tema: Tema
}

function CardTema({ tema }: CardTemasProps) {
    return (
        <div className='border border-black flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-fuchsia-700  font-bold text-2xl text-white'>Tema</header>
            <p className='p-8 text-3xl bg-fuchsia-300 h-full'>{tema.descricao}</p>
            
            <div className="flex ">
                <Link to={`/editartema/${tema.id}`}
                    className='w-full text-slate-100 bg-fuchsia-700 hover:bg-fuchsia-900
                        flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartema/${tema.id}`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                    flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardTema