

export default function PlaylistModal({setModalOpen}) {
    return (
        <div 
            className="absolute left-[50%] top-[30%] flex flex-col gap-7.5 items-center transform translate-x-[-50%] border-1 border-neutral-600 backdrop-blur-2xl bg-neutral-900/50 rounded-lg min-w-[300px] p-10">

            <h1 className="text-2xl">Give your playlist a name</h1>

            <input
                className="border-b p-2.5 text-center"
                placeholder="playlist name..."></input>

            <div className="flex justify-evenly w-full">
                <button 
                    onClick={() => {setModalOpen(false)}}
                    className="cursor-pointer hover:bg-neutral-600 px-6 py-2 rounded-full bg-neutral-700 text-neutral-300">Cancel</button>
                <button className="cursor-pointer hover:bg-amber-200 px-6 py-2 rounded-full bg-amber-300 text-neutral-800 font-semibold">Create</button>
            </div>
        </div>
    )
}