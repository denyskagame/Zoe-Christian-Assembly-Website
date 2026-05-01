import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function DonateSuccess() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#ececec] px-4">
      <div className="w-full max-w-md rounded-2xl border-t-4 border-green-500 bg-[#ececec] p-12 text-center shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_10px_30px_-10px_rgba(48,53,82,0.2)]">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-[#303552]">Thank You!</h1>
        <p className="mb-8 text-lg text-gray-500">
          Your donation has been successfully processed. A receipt has been sent to your email.
        </p>
        <Link
          href="/"
          className="inline-block w-full rounded-lg bg-[#a5876d] px-6 py-3 text-center text-sm font-bold tracking-wide text-[#ececec] uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-[#303552] hover:shadow-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
