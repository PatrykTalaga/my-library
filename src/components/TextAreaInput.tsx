type labelType = {
  label: string
  name: string
};

export function TextAreaInput({label, name}:labelType) {
  return <>
    <div className="flex justify-center">
      <label className="text-lg w-32">{label}:</label>
      <textarea rows={12} cols={50} name={name} className="bg-slate-700
        border rounded-md mx-3 my-1.5"></textarea>
    </div>
  </>
}