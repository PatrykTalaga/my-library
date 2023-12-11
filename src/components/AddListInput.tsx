type labelType = {
  label: string,
  name: string
}

export function AddListInput({label, name}:labelType) {
  return <>
    <div className="flex justify-between">
      <label className="text-lg">{label}</label>
      <input type="text" name={name} className="bg-zinc-900 bg-opacity-80-700
        border rounded-md mx-3 mb-2"/>
    </div>
  </>
    
}

