type labelType = {
  label: string
};

export function NumberInput({label}:labelType) {
  return <>
    <div className="flex justify-center">
      <label className="text-lg w-1/6">{label}:</label>
      <input type="number" className="bg-slate-700 border rounded-md
        mx-3 my-1 w-1/2"/>
    </div>
  </>
}