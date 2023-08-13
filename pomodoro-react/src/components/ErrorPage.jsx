import { Link } from "react-router-dom";

export default function ErrorPage() {

  return (
    <div id="error-page" className="block mx-auto mt-40 w-1/2 rounded-md border p-5">
      <h1 className="text-3xl font-bold pb-3">Oops!</h1>
        <p className="text-lg mb-10">Sorry, an unexpected error has occurred: <i> Page not found</i></p>
        <p className="ml-auto">Go back to <Link className="font-bold underline" to="/study">Home</Link></p>
    </div>
  );
}