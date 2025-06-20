import { User } from "lucide-react"

export default function UserDetails() {
    return (
        <section className="relative">
            <div className="bg-neutral-800 w-[50%] mx-auto">

                <div className="flex flex-col gap-5">
                    <div className="flex justify-center items-center bg-amber-300 w-30 h-30 rounded-full">
                        <User size={70} strokeWidth={1}/>
                    </div>
                    <h1 className="text-2xl text-neutral-200">User Name</h1>
                </div>

                <div></div>
            </div>
        </section>
    )
}