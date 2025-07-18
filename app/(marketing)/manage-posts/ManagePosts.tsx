"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { HttpMethod } from "@/lib/constants";
import { Icon } from "@iconify/react";

export default function ManagePosts({ managePosts }: { managePosts: string }) {
  const [authorized, setAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [jsonInput, setJsonInput] = useState(
    JSON.stringify({
      image_path: `/blog/react-state-management-upskilling-with-ai.png`,
      link: "/post/react-state-management-upskilling-with-ai.md",
      content_link:
        "https://raw.githubusercontent.com/vivekkv178/my-blog-content/main/react/react-state-management-upskilling-with-ai.md",
      github:
        "https://github.com/vivekkv178/my-blog-content/blob/main/react/react-state-management-upskilling-with-ai.md",
      category: "Tech",
      name: "Designing State Management in React: A Practical Guide",
      description:
        "A hands-on guide to building scalable, maintainable state architecture in React using Context, Custom Hooks, and Redux Toolkit.",
    }),
  );
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === managePosts) {
      setAuthorized(true);
    } else {
      alert("❌ Incorrect password");
    }
  };

  const handleAddPost = async () => {
    setStatus("submitting");
    try {
      const data = JSON.parse(jsonInput);

      if (!data.name || !data.link || !data.content_link) {
        alert("❌ Required fields missing in JSON.");
        setStatus("idle");
        return;
      }

      const res = await fetch("addData", {
        method: HttpMethod.POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          created_at: new Date(data.created_at || Date.now()), // fallback if not provided
        }),
      });

      if (!res.ok) {
        const errorMessage = await res.text(); // or res.json() if your API returns JSON
        throw new Error(`Server Error: ${res.status} - ${errorMessage}`);
      }

      alert("✅ Post added to Firestore!");
      //   setJsonInput("");
      setStatus("success");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to parse or submit JSON.");
      setStatus("error");
    } finally {
      setStatus("idle");
    }
  };

  const handleRevalidate = async () => {
    try {
      const res = await fetch("revalidateData");

      if (res.ok) {
        alert("✅ Blog cache revalidated");
      } else {
        alert("❌ Revalidation failed");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    }
  };

  if (!authorized) {
    return (
      <form
        onSubmit={handlePasswordSubmit}
        className="max-w-md mx-auto p-6 space-y-4"
      >
        <h2 className="text-xl font-bold">🔐 Enter Admin Password</h2>
        <Input
          type="password"
          placeholder="Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <Button type="submit">Unlock</Button>
      </form>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">📦 Add Blog Post from JSON</h2>

      <div className="space-y-2">
        <Label htmlFor="json">Paste JSON</Label>
        <Textarea
          id="json"
          placeholder="Paste JSON here..."
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows={10}
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={handleAddPost} disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : "Add Post"}
        </Button>

        <Button variant="secondary" onClick={handleRevalidate}>
          Revalidate Cache
        </Button>

        <Button
          variant="outline"
          onClick={() => navigator.clipboard.writeText(jsonInput)}
        >
          <Icon icon="lucide:copy" className="tw-w-4 tw-h-4 tw-mr-2" />
          Copy
        </Button>
      </div>
    </div>
  );
}
