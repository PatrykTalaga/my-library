type labelType = {
  label: string
  name: string
};

export function TextInput({label, name}:labelType) {
  return <>
    <div className="flex justify-left">
      <label className="text-lg w-32 my-auto">{label}:</label>
      <input type="text" name={name} className="bg-zinc-900 bg-opacity-80
        border rounded-md mx-3 my-1.5"/>
    </div>
  </>
}