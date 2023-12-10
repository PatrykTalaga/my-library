type labelType = {
  label: string
};

export function TextAreaInput({label}:labelType) {
  return <>
    <div className="flex justify-center">
      <label className="text-lg w-1/6">{label}:</label>
      <textarea rows={6} className="bg-slate-700 border rounded-md
        mx-3 my-1.5 w-1/2"></textarea>
    </div>
  </>
}