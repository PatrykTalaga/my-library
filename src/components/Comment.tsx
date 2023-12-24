"use client"

export default function Comment({id, createdAt, editedAt, user, comment}:{
  id: string,
  createdAt: Date,
  editedAt: Date,
  user: string,
  comment: string
}){

  //convert date
  const m = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  const convertData = (date:Date) =>  { return date.getDate() + ' ' +
  m[date.getMonth()] + ' ' + date.getFullYear() + ", " +
  date.getHours() + ":" + date.getMinutes();}

  const createdAtFormated = convertData(createdAt);
  const editedAtFormated = convertData(editedAt);


  
  return(
    <li className=' mx-auto flex flex-col align-baseline justify-center
    bg-zinc-900 bg-opacity-80  my-2 px-2 py-2 border rounded-lg'>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <div className='flex py-1 my-1'>
            <p className='font-bold text-xl'>{user}</p>
            {createdAtFormated === editedAtFormated && 
              <p className='text-xl text-zinc-400 ml-5'>
                Posted: {createdAtFormated}</p>}
            {createdAtFormated !== editedAtFormated && 
              <p className='text-xl text-zinc-400 ml-5'>
                Edited: {editedAtFormated}</p>}
          </div>
          <div className='flex'>
            <button className='my-1 mx-5 text-xl bg-orange-500 w-24
             text-center py-1 border-slate-950 rounded-lg hover:scale-110'>
              Edit
            </button>
            <button className='my-1 mx-5 text-xl bg-red-600 w-24
              text-center py-1 rounded-lg order-slate-950 hover:scale-110'>
              Delete
            </button>
          </div>
        </div>
        <p>{comment}</p>
      </div>
    </li>
  )
}