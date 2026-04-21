import { Trash2, UserCog } from 'lucide-react';
function Staff(){
return(
  <div className="flex-1 bg-gray-50 overflow-auto p-8">
      
        {/* Header */}
        <div className="mb-6">
          <h1 className='font-bold text-xl'>Staff Management</h1>
          <p className="text-gray-500 font-medium text-sm">View and manage your cafe team</p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg w-full shadow-sm font-medium">
            <p className="text-gray-600 text-sm mb-1 ">Total Staff</p>
            {/* <p className="text-gray-900">{staff.length}</p> */}
          </div>
          <div className="bg-blue-50 p-4 rounded-lg w-full shadow-sm font-medium">
            <p className="text-blue-700 text-sm mb-1">Roles Filled</p>
           {/*  <p className="text-blue-900">{new Set(staff.map(s => s.role)).size}</p> */}
          </div>
          <div className="bg-orange-50 p-4 rounded-lg w-full shadow-sm font-medium">
            <p className="text-orange-700 text-sm mb-1">Monthly Payroll</p>
            {/* <p className="text-orange-900">Rs {totalSalary.toLocaleString()}</p> */}
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-2">
            <UserCog className="w-5 h-5 text-red-500" />
            <h3 className='font-bold text-[17px]'>Team Members</h3>
          </div>

         {/*  {staff.length === 0 ? (
            <div className="py-16 text-center">
              <UserCog className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No staff members yet.</p>
              <p className="text-gray-400 text-sm mt-1">Use the Sign Up button on the login page to add employees.</p>
            </div>
          ) : ( */}
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-3 text-gray-600 font-medium text-sm">#</th>
                    <th className="text-left px-6 py-3 text-gray-600 font-medium text-sm">Name</th>
                    <th className="text-left px-6 py-3 text-gray-600 font-medium text-sm">Job title</th>
                    <th className="text-left px-6 py-3 text-gray-600 font-medium text-sm">Salary (Rs)</th>
                    <th className="text-left px-6 py-3 text-gray-600 font-medium text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-2 text-left text-gray-600 font-medium text-sm">
                    1</td>
                    
                    <td className="px-6 py-2 text-left text-gray-600 font-medium text-sm">
                    Name</td>

                    <td className="px-6 py-2 text-left text-gray-600 font-medium text-sm">
                    Manager</td>

                    <td className="px-6 py-2 text-left text-gray-600 font-medium text-sm">
                    12500</td>

                    <td className="w-full px-6 py-3">
                        <button
                            className="bg-red-50
                            hover:bg-red-100 p-1 rounded text-red-400  hover:text-red-600">
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
            <h3 className="mb-4 font-bold text-[17px]">Role Breakdown</h3>
            <div className="flex gap-3">
              {/* {ROLES.filter(r => roleCounts[r] > 0).map(role => ( */}
                <div /* key={role} */ className="bg-gray-100 p-3 shadow rounded-lg text-center">
                  <p className="text-gray-800 font-medium">Manager{/* {roleCounts[role]} */}</p>
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