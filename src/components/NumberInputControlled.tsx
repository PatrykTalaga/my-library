type labelType = {
  label: string
  name: string
  value: number
  change: (e:any)=>void
};

export function NumberInputControlled({label, name, value, change}:labelType) {
  return <>
    <div>
        <div className="flex justify-left">
          <label className="text-lg w-28 my-auto">{label}</label>
          <input required type="number" name={name} className="bg-zinc-900 bg-opacity-80
            border rounded-md mx-3 my-1.5" value={value || 0} onChange={change}/>
        </div>
      </div>
  </>
}