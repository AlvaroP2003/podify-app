

export default function ConfirmModal({setOpenModal,resetAccount}) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-60 ">
            <div className="flex flex-col items-center gap-5 lg:gap-7.5 bg-neutral-900 border-2 border-neutral-800 p-7.5 lg:p-10 rounded-lg">
                    <h1 className="text-lg text-neutral-200 text-center">Are you sure you want to reset your account</h1>
                    <p className="text-md text-neutral-400">This will permanently clear your local storage</p>

                <div className="flex gap-15 text-sm lg:text-md">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpenModal(false)
                        }}
                        className="cursor-pointer px-8 py-3 bg-neutral-700 border-2 border-neutral-700 hover:bg-neutral-600 hover:border-neutral-600 rounded-full transition-all">Cancel</button>
                    <button
                        onClick={(e) => {
                        e.stopPropagation()
                        resetAccount()
                        }}
                        className="cursor-pointer px-8 py-3 border-2 border-green-500 text-green-500 font-semibold hover:bg-green-500 hover:text-neutral-900 rounded-full transition-all">Confirm</button>
                </div>
            </div>
        </div>
    )
}