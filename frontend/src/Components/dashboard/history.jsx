import { BookCheck, SlidersHorizontal, Minus, SquareCheck} from 'lucide-react'

function History(){
return(
    <div className="flex-1 bg-gray-50 p-8 min-h-screen">
      
        {/* Header */}
        <div className="mb-6 w-100 lg:w-full">
          <h1 className="text-xl md:text-2xl font-bold">
            Performance History
          </h1>
          <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
            Past performance data: financial & operational metrics, and menu category popularity
          </p>
        </div>

        {/* Table Reservations */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 mb-6">
            <div className='flex justify-between p-6 border-b border-gray-100 '>
                <div className="flex items-center gap-2">
                    <BookCheck className="w-4.5 h-4.5 md:w-5 md:h-5 text-red-500" />
                    <h3  className="font-bold text-[17px] md:text-[19px] ">
                    Table Reservations
                    </h3>
                </div>

                <button className='flex items-center gap-1 text-gray-600 hover:text-black'>
                    Filter
                    <SlidersHorizontal className='w-5 h-5'/>
                </button>
            </div>

            <div className="w-full max-h-130 overflow-auto">
                <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                            #TR
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                            Table No.
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                            Customer Name
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Reservation Date
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Start time
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            End time
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Contact No.
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-3 text-gray-600 text-sm">
                            1
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            5
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            Name
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            2026-04-28
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            7:00 pm
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            <Minus className="w-5 h-5"/>
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            1111111111
                        </td>
                        
                        <td className="px-6 py-3 text-gray-600 text-sm">
                            <button className='flex items-center justify-center text-green-500 gap-1
                            hover:bg-green-400 hover:text-white py-1 px-2 md:py-2 md:px-3 rounded-4xl'>
                                <SquareCheck className='w-6 h-6 xl:w-5 xl:h-5'/>
                                Free Table
                            </button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
)
}

export default History