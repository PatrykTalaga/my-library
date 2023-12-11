
type entryType = {
  entry: {
    title: string,
    author: string,
    year: number,
    isRead: boolean,
  }
}

export function ReadingListEntry({entry}:entryType) {
  return <>
    <li className="flex">
      <input type="checkbox" />
      <p className="text-xl m-3">
        <b>{entry.title}</b>, <b>Author:</b> {entry.author},
        <b>Year:</b> {entry.year}
      </p>
    </li>
  </>
}