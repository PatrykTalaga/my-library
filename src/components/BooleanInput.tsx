type labelType = {
  label: string
  name: string
};

export function BooleanInput({label, name}:labelType) {
  return <>
    <div className="flex justify-left my-1.5">
      <label className="text-lg w-32 my-1.5">{label}:</label>
      <input type="checkbox" name={name} value="yes"
        className="bg-slate-700 border rounded-md mx-3 my-1.5"/>
    </div>
  </>
}