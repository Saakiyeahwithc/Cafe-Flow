import { ClipboardClock, SlidersHorizontal, Minus} from 'lucide-react'

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

        {/* financial & operations history */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 mb-6">
            <div className='flex justify-between p-6 border-b border-gray-100 '>
                <div className="flex items-center gap-2">
                    <ClipboardClock className="w-4.5 h-4.5 md:w-5 md:h-5 text-red-500" />
                    <h3  className="font-bold text-[17px] md:text-[19px] ">
                    Financial & Operations History
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
                            #FID
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                            Date
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm">
                            Total Revenue (Rs)
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Completed Orders
                        </th>
                        <th className="px-6 py-5 text-left text-gray-600 font-medium text-sm ">
                            Total Check-outs
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-3 text-gray-600 text-sm">
                            1
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            2026-04-28
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            1200
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            13
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-sm">
                            18
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>

        {/* menu category popularity */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
            <div className='flex justify-between p-6 border-b border-gray-100 '>
                <div className="flex items-center gap-2">
                    <ClipboardClock className="w-4.5 h-4.5 md:w-5 md:h-5 text-red-500" />
                    <h3  className="font-bold text-[17px] md:text-[19px] ">
                    Menu Category Popularity
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
                        <th className="px-6 py-3 text-left text-gray-600 font-medium text-[14.5px]">
                            #MID
                        </th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium text-[14.5px]">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium text-[14.5px]">
                            Coffee orders
                        </th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium text-[14.5px] ">
                            Food orders
                        </th>
                        <th className="px-6 py-3 text-left text-gray-600 font-medium text-[14.5px] ">
                            Dessert orders
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-3 text-gray-600 text-[14.5px]">
                            1
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-[14.5px]">
                            2026-04-28
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-[14.5px]">
                            146
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-[14.5px]">
                            211
                        </td>

                        <td className="px-6 py-3 text-gray-600 text-[14.5px]">
                            160
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