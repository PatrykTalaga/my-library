type labelType = {
  label: string
  name: string
};

export function AvailabilityInput({label, name}:labelType) {
  return <>
    <div className="flex justify-left">
    <label className="text-lg w-32">{label}:</label>
    <select name={name} className="bg-slate-700 border
      rounded-md mx-3 my-1.5">
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