type labelType = {
  label: string
};

export function TextInput({label}:labelType) {
  return <>
    <div className="flex justify-center">
      <label className="text-lg w-1/6">{label}:</label>
      <input type="text" className="bg-slate-700 border rounded-md w-1/2
        mx-3 my-1.5"/>
    </div>
  </>
}