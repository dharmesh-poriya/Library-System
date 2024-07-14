export default function Login() {
    return (
        <div className="container flex justify-center pt-32">
            <div className="max-w-xs w-full">
                <h1 className="font-bold text-2xl mb-4">Log In</h1>

                <form action="" className="flex justify-center">
                    <div className="flex flex-col gap-4 w-full">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                
                            <input type="email" placeholder="johndoe@example.com" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                
                            <input type="password" className="input input-bordered w-full max-w-xs" />
                        </label>
                        <button className="btn btn-primary w-full">Log In</button>
                    </div>
                </form>
            </div>
        </div>
    );
}