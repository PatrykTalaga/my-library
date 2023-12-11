type labelType = {
  label: string
  name: string
};

export function NumberInput({label, name}:labelType) {
  return <>
    <div className="flex justify-left">
      <label className="text-lg w-32">{label}:</label>
      <input type="number" name={name} className="bg-zinc-900 bg-opacity-80
        border rounded-md mx-3 my-1"/>
    </div>
  </>
}