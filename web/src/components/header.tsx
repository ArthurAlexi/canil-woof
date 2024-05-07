import logo from "../../public/logo.png"

export function Header(){
    
    return (
        <header className="w-full flex justify-center items-center gap-3">
            <img src={logo} alt="canil woof" className="w-[60px] h-auto"/>
            <h1 className='text-3xl font-bold'> CANIL WOOF</h1>
        </header>
    )
}