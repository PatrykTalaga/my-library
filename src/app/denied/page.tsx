export default function Denied() {
  return (
    <>
      <div className="w-1/2 bg-zinc-900 bg-opacity-80 mx-auto my-auto border rounded-lg py-5 px-10">
        <p className=" text-5xl text-center text-red-600 font-bold">
          Access Denied
        </p>
        <p className="text-4xl text-center">
          This page is only accesible for site Admin
        </p>
      </div>
    </>
  );
}
