function UserRegister() {
    return (
        <div className="h-[calc(100hv-7rem)] flex justify-center items-center">
            <form action="">
                <img src="https://ayudawp.com/wp-content/uploads/2014/02/usuario-registrado.jpg" className="rounded-full w-50"/>
                <h1 className="text-slate-200 font-bold text-4xl mb-4">REGISTER</h1>
                <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">Username:</label>
                <input type="text" className="p-3 rounded block mb-2 bg-slate-900 text-slate-300"/>
                <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">Email:</label>
                <input type="email" className="p-3 rounded block mb-2 bg-slate-900 text-slate-300"/>
                <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">Password:</label>
                <input type="password" className="p-3 rounded block mb-2 bg-slate-900 text-slate-300"/>
                <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block text-sm">Confirm Password:</label>
                <input type="confirmPassword" className="p-3 rounded block mb-2 bg-slate-900 text-slate-300"/>
                <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-3">
                    REGISTRAR
                </button>
            </form>
        </div>
    )
}

export default UserRegister