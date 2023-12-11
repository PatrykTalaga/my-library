type labelType = {
  label: string
  name: string
};

export function AvailabilityInput({label, name}:labelType) {
  return <>
    <div className="flex justify-left">
    <label className="text-lg w-32">{label}:</label>
    <select name={name} className="bg-zinc-900 bg-opacity-80 border
      rounded-md mx-3 my-1.5">
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