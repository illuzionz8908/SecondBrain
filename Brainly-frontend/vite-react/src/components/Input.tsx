
interface InputProps {
    type : any,
    placeholder: string,
    reference?: any
}

export function Input({type , placeholder, reference} : InputProps){
    return <div>
            <input ref={reference} type={type} placeholder={placeholder} 
                className="px-4 py-2 border rounded w-full">
            </input>
        </div>
}