type labelType = {
  label: string
  name: string
};

export function TextInput({label, name}:labelType) {
  return <>
    <div className="flex justify-left">
      <label className="text-lg w-32">{label}:</label>
      <input type="text" name={name} className="bg-slate-700 border rounded-md
        mx-3 my-1.5"/>
    </div>
  </>
}