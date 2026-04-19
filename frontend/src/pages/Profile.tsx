import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import goBg from "@/assets/go.jpg";
import motorcycleBg from "@/assets/motorcycle.jpg";

type UserType = {
  username?: string;
  name?: string;
  email?: string;
  preferredDestination?: string;
  budgetRange?: string;
  favoriteStayType?: string;
  bio?: string;
  travelStyle?: string;
  profileImage?: string;
};

const Profile = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [form, setForm] = useState<UserType>({
    name: "",
    email: "",
    preferredDestination: "",
    budgetRange: "",
    favoriteStayType: "",
    bio: "",
    travelStyle: "",
    profileImage: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setForm({
        name: parsedUser.name || parsedUser.username || "",
        email: parsedUser.email || "",
        preferredDestination: parsedUser.preferredDestination || "",
        budgetRange: parsedUser.budgetRange || "",
        favoriteStayType: parsedUser.favoriteStayType || "",
        bio: parsedUser.bio || "",
        travelStyle: parsedUser.travelStyle || "",
        profileImage: parsedUser.profileImage || "",
      });
    }
  }, []);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        profileImage: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      ...form,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    alert("Profile updated successfully!");
  };

  const displayInitial =
    form.name?.charAt(0).toUpperCase() ||
    user?.username?.charAt(0).toUpperCase() ||
    "U";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr_1fr]">
          {/* Left image */}
          <div className="hidden overflow-hidden rounded-3xl lg:block">
            <img
              src={goBg}
              alt="Travel inspiration"
              className="h-full min-h-[760px] w-full object-cover"
            />
          </div>

          {/* Center form */}
          <section className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground">
                My Profile
              </h1>
              <p className="mt-2 text-muted-foreground">
                Personalize your Travelo experience and keep your travel
                preferences up to date.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Avatar upload */}
              <div className="flex flex-col items-center">
                {form.profileImage ? (
                  <img
                    src={form.profileImage}
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover ring-4 ring-emerald-100"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-3xl font-bold text-white ring-4 ring-emerald-100">
                    {displayInitial}
                  </div>
                )}

                <label className="mt-4 cursor-pointer rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-slate-200">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Form fields */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name || ""}
                    onChange={onChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email || ""}
                    onChange={onChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Preferred Destination
                  </label>
                  <input
                    type="text"
                    name="preferredDestination"
                    value={form.preferredDestination || ""}
                    onChange={onChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                    placeholder="e.g. Bali, Lisbon, Banff"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Budget Range
                  </label>
                  <select
                    name="budgetRange"
                    value={form.budgetRange || ""}
                    onChange={onChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="">Select budget range</option>
                    <option value="Budget-friendly">Budget-friendly</option>
                    <option value="Mid-range">Mid-range</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Favorite Stay Type
                  </label>
                  <select
                    name="favoriteStayType"
                    value={form.favoriteStayType || ""}
                    onChange={onChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="">Select stay type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Cabin">Cabin</option>
                    <option value="Villa">Villa</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Unique Stay">Unique Stay</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Travel Style
                  </label>
                  <select
                    name="travelStyle"
                    value={form.travelStyle || ""}
                    onChange={onChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="">Select travel style</option>
                    <option value="Nature">Nature</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Beach">Beach</option>
                    <option value="City">City</option>
                    <option value="Relaxation">Relaxation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={form.bio || ""}
                  onChange={onChange}
                  rows={5}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white"
                  placeholder="Tell us a bit about your travel style, dream destinations, or favorite kind of stays..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
              >
                Save Profile
              </button>
            </form>
          </section>

          {/* Right image */}
          <div className="hidden overflow-hidden rounded-3xl lg:block">
            <img
              src={motorcycleBg}
              alt="Adventure road trip"
              className="h-full min-h-[760px] w-full object-cover"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;