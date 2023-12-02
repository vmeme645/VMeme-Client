import { ICart } from "@/types/cartType"
import { IStatus } from "@/types/statusTypes"
import { useFormState, useFormStatus } from "react-dom"
import { completeCheckOut } from "./action"
import { useEffect } from "react"

interface IProps {
    cartItems: Array<ICart> | undefined,
    onCancel: () => void
}

export interface ICheckOutStatus extends IStatus {
    email?: string | null,
    phoneNumber?: string | null,
    address?: string | null,
    zipCode?: string | null,
    referenceID?: string | null,
}
const initialState: ICheckOutStatus = {
    success: false,
    message: null,
    email: null,
    phoneNumber: null,
    address: null,
    zipCode: null,
    referenceID: null,
}

export default function CheckOutForm({ onCancel: cancel, cartItems }: IProps) {
    const { pending } = useFormStatus()
    const [status, formAction] = useFormState(completeCheckOut, initialState)
    console.log(status)
    useEffect(() => {
        if (status.success) {
            status.success = false
            cancel()
        }
    }, [status])

    return (
        <form action={formAction} className='mt-5 flex flex-col gap-3'>
            <input type="email" name="email" className='p-3 w-full text-lg border border-gray rounded-md outline-primary' placeholder='Email' />
            <input type="number" name="phoneNumber" className='p-3 w-full text-lg border border-gray rounded-md outline-primary' placeholder='Phone number' />
            <div className='flex gap-3'>
                <input type="text" name="address" className='w-full p-3 text-lg border border-gray rounded-md outline-primary' placeholder='Address' />
                <input type="number" name="zipCode" className='w-[150px] p-3 text-lg border border-gray rounded-md outline-primary' placeholder='Zip Code' />
            </div>

            <span className='flex gap-3 text-lg font-mediums'>
                <button type='button' className='border-b-2 border-primary'>GCash</button>
                <button type='button'>BPI</button>
            </span>

            <h2>Amount to pay - <span className='font-bold'>₱{cartItems?.reduce((accumulator, cartItem) => accumulator += cartItem.painting.price, 0)}</span></h2>
            <div className='h-80 w-80 bg-gray'>

            </div>

            <input type="text" name="referenceID" className='p-3 w-full text-lg border border-gray rounded-md outline-primary' placeholder='Reference ID' />

            <div className='border border-gray'></div>
            <div className='flex justify-end gap-3 text-white'>
                <button
                    disabled={pending}
                    type='submit'
                    className='px-6 py-2 bg-green-600 rounded-md hover:bg-green-700 duration-300'>
                    Complete
                </button>
                <button
                    onClick={() => cancel()}
                    type='button'
                    className='px-6 py-2 text-red-700 hover:text-white rounded-md hover:bg-red-700 duration-300'>Cancel</button>
            </div>
        </form>
    )
}
