// import React, {useMemo} from 'react'
// import { useTable } from 'reatc-table'
// import { COLUMNS } from "src/components/columns"

// export const index = ({
//     quizzes,
//     history,
//     isLoggedIn,
//     updateQuiz,
//     destroyQuiz,
//  }) => {
//   const columns = useMemo(() => COLUMNS, [])
//   const quizList = useMemo(() => quizzes, [])

//   const routeHandler = (slug, target) => {
//     if (isLoggedIn) history.push(`/quizzes/${slug}/${target}`);
//     else history.push("/login");
//   };

//   const {
//     getTableProps,
//     getTableBodyProps,
//     rows,
//     prepareRow,
//   } = useTable({
//     columns,
//     quizList
//   })

//   return (
//     <div className="flex flex-col mt-10 h-full">
//       <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//         <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//           <div className="overflow-hidden border-b border-gray-200 shadow md:custom-box-shadow">
//             <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
//             <thead>
//               <tr>
//                 <th>
//                   quiz names
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
//               {quizzes?.map((quiz, i) => {
//                 prepareRow(quiz)
//                 return(
//                 <tr className="py-1" {...row.getRowProps()}>
//                   {quiz.cells.map(cell => {
//                     return(
//                   {isLoggedIn && (

//                    <div className="grid grid-cols-12 gap-2">
//                     <td
//                       className="col-span-8 mt-5 pt-4 hover:text-purple-700 text-lg font-medium cursor-pointer"
//                       onClick={() => routeHandler(quiz.slug, "show")}
//                     >
//                       {quiz.title}
//                     </td>
//                     <td className="col-span-2">
//                       <Button
//                       type="button"
//                       buttonText="Edit"
//                       onClick={() => updateQuiz(quiz.slug, "edit")}
//                       />
//                     </td>
//                     <td className="col-span-2">
//                       <Button
//                       type="button"
//                       buttonText="Delete"
//                       onClick={() => destroyQuiz(quiz.slug)}
//                       />
//                     </td>
//                  </div>
//                   )})
//                 </tr>
//             ))}
//             </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
