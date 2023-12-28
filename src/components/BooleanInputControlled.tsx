type labelType = {
  label: string
  name: string
  value: boolean
  change: (e:any)=>void
};

export function BooleanInputControlled({label, name, value, change}
  :labelType) {
  return <>
    <div>
        <div className="flex justify-left">
          <label className="text-lg w-28 my-1.5">{label}</label>
          <input required type="checkbox" name={name} className="bg-zinc-900
            bg-opacity-80 border rounded-md mx-3 my-auto"
            onChange={change} defaultChecked={value}/>
        </div>
      </div>
  </>
}