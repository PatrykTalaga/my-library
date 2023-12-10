type labelType = {
  label: string
};

export function BooleanInput({label}:labelType) {
  return <>
    <div className="flex justify-center my-1.5">
      <label className="text-lg w-1/6">{label}:</label>
      <input type="checkbox" name={label} value="yes"
        className="bg-slate-700 border rounded-md mx-3 my-1.5 w-1/2 justify-start"/>
      
    </div>
  </>
}