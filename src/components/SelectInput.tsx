type labelType = {
  label: string
};

export function SelectInput({label}:labelType) {
  return <>
    <div className="flex justify-center">
    <label className="text-lg w-1/6">{label}:</label>
    <select name={label} className="bg-slate-700 border rounded-md
        mx-3 my-1.5 w-1/2">
      <option value="On the shelf" className="bg-slate-700 text-lg">
        On the shelf</option>
      <option value="Not avaiable" className="bg-slate-700 text-lg">
        Not avaiable</option>
      <option value="e-book" className="bg-slate-700 text-lg">
        e-book</option>
    </select>
    </div>
  </>
}