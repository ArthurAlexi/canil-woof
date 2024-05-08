export function Modal(props : any ) {
    return (
        <div className="fixed inset-0 z-10 bg-slate-900/95">
            <div className="relative w-auto my-48 mx-auto max-w-xl">
                <div className="border-0 rounded-md relative flex flex-col w-full bg-slate-400 outline-none focus:outline-none">
                    <div className="flex flex-col items-center justify-center p-5 gap-3">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    );
}
