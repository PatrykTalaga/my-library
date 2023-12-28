type labelType = {
  label: string
  name: string
  value: string
  change: (e:any)=>void
};

export function AvailabilityInputControlled({label, name, value, change}
  :labelType) {
    
  return <>
    <div className="flex justify-left">
    <label className="text-lg w-28">{label}</label>
    <select name={name} className="bg-zinc-900 bg-opacity-80 border my-1.5
      rounded-md mx-3" onChange={change} defaultValue={value || "On the shelf"}>
      <option value="On the shelf" className="bg-zinc-900 bg-opacity-80
        text-lg">
        On the shelf</option>
      <option value="Not avaiable" className="bg-zinc-900 bg-opacity-80
        text-lg">
        Not avaiable</option>
      <option value="e-book" className="bg-zinc-900 bg-opacity-80 text-lg">
        e-book</option>
    </select>
    </div>
  </>
}