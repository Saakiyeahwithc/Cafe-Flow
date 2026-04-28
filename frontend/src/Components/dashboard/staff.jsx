import { Trash2, UserCog } from 'lucide-react';
function Staff(){
return(
  <div className="flex-1 bg-gray-50 p-8 min-h-screen">
      
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold">
            Staff Management
          </h1>
          <p className="text-sm md:text-[15px] text-gray-400 font-medium mt-1">
            View and Manage all staffs
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm font-medium">
            <p className="text-gray-600 text-[17px] mb-2 ">Total Staff</p>
            <p className="text-gray-900 text-[17px]">1</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm font-medium">
            <p className="text-blue-700 text-[17px] mb-2">Roles Filled</p>
            <p className="text-blue-900 text-[17px]">1/x</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg shadow-sm font-medium">
            <p className="text-orange-700 text-[17px] mb-2">Monthly Payroll</p>
            <p className="text-orange-900 text-[17px]">Rs 12500</p>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-2">
            <UserCog className="w-4.5 h-4.5 md:w-5 md:h-5 text-red-500" />
            <h3  className="font-bold text-[17px] md:text-[19px]">
              Team Members
            </h3>
          </div>

         {/*  {staff.length === 0 ? (
            <div className="py-16 text-center">
              <UserCog className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No staff members yet.</p>
              <p className="text-gray-400 text-sm mt-1">Use the Sign Up button on the login page to add employees.</p>
            </div>
          ) : ( */}
            <div className="w-full max-h-130 overflow-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                      Job title
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm ">
                      Salary (Rs)
                    </th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium text-sm">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-600 text-sm">1</td>

                    <td className="px-6 py-3 text-gray-600 text-sm">
                      Name 
                    </td>

                    <td className="px-6 py-3 text-gray-600 text-sm">
                      Manager
                    </td>

                    <td className="px-6 py-3 text-gray-600 text-sm">
                      12500
                    </td>

                    <td className="px-6 py-3">
                      <button className="bg-red-50 hover:bg-red-100 p-1 rounded text-red-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
        {/* Role breakdown */}
       {/*  {{staff.length > 0 && ( */}
          <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-[17px] md:text-[19px]  mb-4">Role Breakdown</h3>
            <div className="flex flex-wrap gap-5">
              {/* {ROLES.filter(r => roleCounts[r] > 0).map(role => ( */}
                <div /* key={role} */ className="bg-gray-100 rounded-lg flex flex-col items-center gap-5 p-4">
                  <p className="text-gray-800 text-[15px] font-medium">Manager{/* {roleCounts[role]} */}</p>
                  <p className="text-gray-600 font-medium text-sm">1{/* {role} */}</p>
                </div>
             {/*  )
            )} */}
            </div>
          </div>
{/* )}} */}
  </div>
)
}

export default Staff