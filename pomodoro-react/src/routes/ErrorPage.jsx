import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="block mx-auto mt-40 w-1/2 rounded-md border p-5">
      <h1 className="text-3xl font-bold pb-3">Oops!</h1>
        <p className="text-lg mb-10">Sorry, an unexpected error has occurred: <i> Page {error.statusText || error.message}</i></p>
        <p className="ml-auto">Go back to <Link className="font-bold underline" to="/">Home</Link></p>
    </div>
  );
}