import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { useAuth } from "../contexts/AuthProvider";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();
  const email = user?.email;

  // ডেমো ডাটা
  // const demoData = [
  //   {
  //     title: "পড়াশোনা পরিকল্পনা",
  //     date: "2025-10-18",
  //     category: "Education",
  //     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eligendi ratione, et pariatur itaque deleniti assumenda quas in quae eius aliquam nisi inventore, recusandae excepturi nesciunt laborum similique, earum corporis ex debitis sequi. Explicabo consectetur accusantium aspernatur inventore ipsam, quae reprehenderit illo corporis porro odio necessitatibus quis eveniet molestias praesentium nulla sed sunt! Consequatur ipsa, tempore ipsam quam veniam officia itaque nam culpa asperiores aperiam, cum quae nisi. Doloribus similique velit eos enim repudiandae facilis ad recusandae? Eum repellendus quae amet, quidem delectus maxime animi possimus minus tempora, corrupti vel consequuntur magnam beatae sed, velit aliquam. Quos aliquid nostrum ab culpa perferendis autem blanditiis error voluptatum quae ipsa animi vel deleniti odio architecto corrupti, esse consequuntur. Facere labore sint deserunt itaque minima quidem, accusantium soluta, nemo officia a saepe aliquid corrupti, aperiam provident fugiat quisquam dolorem ducimus enim perferendis reiciendis repudiandae. Sed dolore consectetur explicabo, doloremque aut assumenda eius iusto. Suscipit aliquid fugit autem reiciendis quasi eligendi eaque neque quod, repudiandae perspiciatis temporibus vel fugiat nostrum debitis voluptatibus nesciunt nemo quia repellendus. Minus, obcaecati distinctio fuga, pariatur odit, architecto nisi ut sequi beatae dignissimos eveniet vitae optio. Expedita ipsam, harum deleniti repudiandae odit aliquam, sed obcaecati ea, nisi hic deserunt?",
  //     tags: ["study", "urgent", "exam"],
  //     priority: "High",
  //     reminder: "2025-10-20T09:00",
  //     status: "In Progress",
  //     color: "#facc15", // yellow
  //   },
  //   {
  //     title: "প্রজেক্ট এক্স আইডিয়া",
  //     date: "2025-10-16",
  //     category: "Work",
  //     content: "নতুন AI টুল ডেভেলপমেন্টের জন্য ফিচার লিস্ট তৈরি করতে হবে।",
  //     tags: ["idea", "project-x", "ai"],
  //     priority: "Medium",
  //     reminder: "",
  //     status: "Draft",
  //     color: "#60a5fa", // blue
  //   },
  //   {
  //     title: "প্রজেক্ট এক্স আইডিয়া",
  //     date: "2025-10-16",
  //     category: "Work",
  //     content: "নতুন AI টুল ডেভেলপমেন্টের জন্য ফিচার লিস্ট তৈরি করতে হবে।",
  //     tags: ["idea", "project-x", "ai"],
  //     priority: "Medium",
  //     reminder: "",
  //     status: "Draft",
  //     color: "#60a5fa", // blue
  //   },
  //   {
  //     title: "প্রজেক্ট এক্স আইডিয়া",
  //     date: "2025-10-16",
  //     category: "Work",
  //     content: "নতুন AI টুল ডেভেলপমেন্টের জন্য ফিচার লিস্ট তৈরি করতে হবে।",
  //     tags: ["idea", "project-x", "ai"],
  //     priority: "Medium",
  //     reminder: "",
  //     status: "Draft",
  //     color: "#60a5fa", // blue
  //   },
  //   {
  //     title: "প্রজেক্ট এক্স আইডিয়া",
  //     date: "2025-10-16",
  //     category: "Work",
  //     content: "নতুন AI টুল ডেভেলপমেন্টের জন্য ফিচার লিস্ট তৈরি করতে হবে।",
  //     tags: ["idea", "project-x", "ai"],
  //     priority: "Medium",
  //     reminder: "",
  //     status: "Draft",
  //     color: "#60a5fa", // blue
  //   },
  //   {
  //     title: "প্রজেক্ট এক্স আইডিয়া",
  //     date: "2025-10-16",
  //     category: "Work",
  //     content: "নতুন AI টুল ডেভেলপমেন্টের জন্য ফিচার লিস্ট তৈরি করতে হবে।",
  //     tags: ["idea", "project-x", "ai"],
  //     priority: "Medium",
  //     reminder: "",
  //     status: "Draft",
  //     color: "#60a5fa", // blue
  //   },
  //   {
  //     title: "গার্ডেন আপডেট",
  //     date: "2025-10-15",
  //     category: "Personal",
  //     content: "বাগানে নতুন গাছ লাগানোর পরিকল্পনা করেছি।",
  //     tags: ["garden", "hobby"],
  //     priority: "Low",
  //     reminder: "2025-10-25T17:00",
  //     status: "Completed",
  //     color: "#34d399", // green
  //   },
  // ];

  useEffect(() => {
    // ভবিষ্যতে API কল এখানে হবে
    // setNotes(demoData);
    if (email) {
      fetch(`https://task-manager-v1-one.vercel.app/notes/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setNotes(data);
        })
        .catch((error) => {
          console.error("Error fetching notes:", error);
        });
    }
  }, [email]);

  return (
    <div className="max-w-5xl mx-auto p-6 columns-1 space-y-6 sm:columns-2 lg:columns-3 gap-6">
      {notes.length === 0 ? (
        <p className="text-center text-gray-500">😔 কোনো নোট পাওয়া যায়নি।</p>
      ) : (
        notes.map((note, index) => <NoteCard key={index} note={note} notes={notes} setNotes={setNotes} />)
      )}
    </div>
  );
};

export default Notes;
