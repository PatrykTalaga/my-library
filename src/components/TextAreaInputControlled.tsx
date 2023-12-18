type labelType = {
  label: string
  name: string
  value: string
  change: ()=>void
};

export function TextAreaInputControlled({label, name, value, change}:labelType) {
  return <>
    <div>
        <div className="flex justify-left">
          <label className="text-lg w-32 my-auto">{label}</label>
          <textarea rows={12} cols={50} name={name} className="bg-zinc-900 bg-opacity-80
            border rounded-md mx-3 my-1.5" value={value} onChange={change}/>
        </div>
      </div>
  </>
}