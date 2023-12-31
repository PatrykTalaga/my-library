import Link from "next/link";

export default function MainHeaderLink({
  label,
  link,
}: {
  label: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="bg-zinc-900 bg-opacity-80 text-3xl my-auto
            mr-7 border px-5 py-2 rounded-lg hover:scale-110 smNav:w-80 smNav:mr-0 smNav:text-center smNav:my-2"
    >
      {label}
    </Link>
  );
}
