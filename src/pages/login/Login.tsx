import { useNavigate, Link } from "react-router-dom"



const Login = () => {
    const navigate = useNavigate()
    return (
        <>
            <div>
                <h2 className="text-xl">Login</h2>
                <div>
                    <button type="submit"
                        onClick={() => { navigate('/home') }}
                        className="hover:underline mx-4">
                        Login useNavigate
                    </button>
                    <Link to='/home' className="hover:underline mx-4">Login por Link</Link>
                </div>
            </div>
        </>
    )
}
export default Login