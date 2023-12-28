type labelType = {
  label: string
  name: string
  value: string
  change: (e:any)=>void
};

export function TextAreaInputControlled({label, name, value, change}
  :labelType) {
  return <>
        <div className="flex flex-col justify-left w-full">
          <label className="text-lg w-32 my-auto">{label}</label>
          <textarea rows={15} cols={47} name={name} className="bg-zinc-900
            bg-opacity-80 border rounded-md my-2"
            value={value || ""} onChange={change}/>
        </div>
  </>
}