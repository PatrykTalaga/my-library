const NewListEntry = () => {
  return <>
    <h1 className="text-4xl mb-3">Add new book to read</h1>
    <form className="w-1/4 flex flex-col">
      <div className="flex justify-between">
        <label className="text-lg">Book Title:</label>
        <input type="text" className="bg-slate-700 border rounded-md mx-3 mb-2"/>
      </div>
      <div className="flex justify-between">
        <label className="text-lg">Author:</label>
        <input type="text" className="bg-slate-700 border rounded-md mx-3 mb-2"/>
      </div>
      <div className="flex justify-between">
        <label className="text-lg">Year:</label>
        <input type="text" className="bg-slate-700 border rounded-md mx-3 mb-2"/>
      </div>
      <button type="submit" className="text-2xl mt-3 py-1 border rounded-lg bg-slate-700">Add</button>
    </form>
    
  </>
  }
  
export default NewListEntry