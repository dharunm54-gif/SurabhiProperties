import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function TodosPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos, error } = await supabase.from("todos").select();

  return (
    <div className="min-h-screen bg-[#F8F7F3] p-8 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E0D8] p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-xl font-bold text-[#173F35]">Supabase Connection Test</h1>
          <Link href="/" className="text-sm text-[#C7A45D] hover:underline">
            ← Back to Home
          </Link>
        </div>

        {error ? (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
            <p className="font-semibold">Supabase Note:</p>
            <p>{error.message}</p>
            <p className="mt-2 text-xs text-amber-700">
              If the `todos` table does not exist yet in your Supabase project, you can create it in your Supabase SQL Editor.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {todos && todos.length > 0 ? (
              todos.map((todo: any) => (
                <li key={todo.id} className="p-3 bg-gray-50 rounded-lg border text-sm text-gray-800">
                  {todo.name}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500 italic py-4 text-center">
                Connected to Supabase! No todos found in table.
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
