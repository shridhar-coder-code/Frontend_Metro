import { useState } from "react";
import { Gift, Plus, Edit2, Trash2, X, Upload, CheckCircle2, Star, ToggleLeft, ToggleRight } from "lucide-react";
import { adminRewards } from "@/data/adminData";
import { cn } from "@/utils/cn";

interface AdminRewardsManagerProps {
  dark: boolean;
}

type Reward = (typeof adminRewards)[0] & { active: boolean };

interface AddRewardModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (r: Reward) => void;
  editReward?: Reward | null;
  dark: boolean;
}

function AddRewardModal({ open, onClose, onSave, editReward, dark }: AddRewardModalProps) {
  const [name, setName]   = useState(editReward?.title || "");
  const [desc, setDesc]   = useState(editReward?.desc || "");
  const [pts,  setPts]    = useState(editReward?.points.toString() || "");
  const [emoji, setEmoji] = useState(editReward?.emoji || "🎁");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Reward name is required";
    if (!desc.trim()) e.desc = "Description is required";
    if (!pts || isNaN(Number(pts)) || Number(pts) <= 0) e.pts = "Enter valid points";
    return e;
  };

  const handleSave = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    setSaved(true);
    onSave({
      id: editReward?.id || Date.now(),
      title: name,
      desc,
      points: Number(pts),
      emoji,
      color: editReward?.color || "from-emerald-400 to-green-600",
      redeemed: editReward?.redeemed || 0,
      active: editReward?.active ?? true,
    });
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  };

  if (!open) return null;

  const emojis = ["☕", "🛍️", "🎬", "🚇", "🌳", "♻️", "🎁", "🍕", "🎮", "✈️", "🏋️", "📚"];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={cn(
        "relative w-full max-w-md rounded-3xl shadow-2xl animate-slide-up",
        dark ? "bg-gray-900 border border-gray-700" : "bg-white"
      )}>
        {/* Header */}
        <div className="bg-gradient-to-r from-green-900 to-emerald-800 px-6 py-5 rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white font-bold text-base">{editReward ? "Edit Reward" : "Create New Reward"}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} noValidate className="p-6 space-y-4">
          {/* Emoji picker */}
          <div>
            <label className={cn("block text-xs font-bold mb-2", dark ? "text-gray-400" : "text-gray-600")}>Select Icon</label>
            <div className="flex flex-wrap gap-2">
              {emojis.map((e) => (
                <button
                  key={e} type="button"
                  onClick={() => setEmoji(e)}
                  className={cn(
                    "w-10 h-10 rounded-xl text-lg flex items-center justify-center transition-all border-2",
                    emoji === e
                      ? "border-emerald-500 bg-emerald-50 scale-110"
                      : dark ? "border-gray-700 hover:border-emerald-600 bg-gray-800" : "border-gray-200 hover:border-emerald-400"
                  )}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className={cn("block text-xs font-bold mb-1.5", dark ? "text-gray-400" : "text-gray-600")}>Reward Name *</label>
            <input
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
              placeholder="e.g., Free Coffee"
              className={cn(
                "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500",
                errors.name ? "border-red-400" : dark ? "border-gray-700 bg-gray-800 text-white placeholder-gray-600" : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400"
              )}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className={cn("block text-xs font-bold mb-1.5", dark ? "text-gray-400" : "text-gray-600")}>Description *</label>
            <textarea
              value={desc}
              onChange={(e) => { setDesc(e.target.value); setErrors((p) => ({ ...p, desc: "" })); }}
              placeholder="Valid at partner locations across the city"
              rows={2}
              className={cn(
                "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 resize-none",
                errors.desc ? "border-red-400" : dark ? "border-gray-700 bg-gray-800 text-white placeholder-gray-600" : "border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400"
              )}
            />
            {errors.desc && <p className="text-red-500 text-xs mt-1">{errors.desc}</p>}
          </div>

          {/* Points */}
          <div>
            <label className={cn("block text-xs font-bold mb-1.5", dark ? "text-gray-400" : "text-gray-600")}>Points Required *</label>
            <div className={cn(
              "flex items-center gap-2 border rounded-xl px-4 py-3 transition-all focus-within:ring-2 focus-within:ring-emerald-500/25 focus-within:border-emerald-500",
              errors.pts ? "border-red-400" : dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
            )}>
              <Star className={cn("w-4 h-4", dark ? "text-yellow-400" : "text-yellow-500")} />
              <input
                type="number"
                value={pts}
                onChange={(e) => { setPts(e.target.value); setErrors((p) => ({ ...p, pts: "" })); }}
                placeholder="50"
                min={1}
                className={cn("flex-1 bg-transparent outline-none text-sm font-bold", dark ? "text-white placeholder-gray-600" : "text-gray-900 placeholder-gray-400")}
              />
              <span className={cn("text-xs font-semibold", dark ? "text-gray-500" : "text-gray-400")}>GreenPoints</span>
            </div>
            {errors.pts && <p className="text-red-500 text-xs mt-1">{errors.pts}</p>}
          </div>

          {/* Image upload (mock) */}
          <div>
            <label className={cn("block text-xs font-bold mb-1.5", dark ? "text-gray-400" : "text-gray-600")}>Reward Image (optional)</label>
            <div className={cn(
              "border-2 border-dashed rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-emerald-400 transition-all",
              dark ? "border-gray-700 hover:bg-emerald-900/10" : "border-gray-200 hover:bg-emerald-50"
            )}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", dark ? "bg-gray-800" : "bg-gray-100")}>
                <Upload className={cn("w-5 h-5", dark ? "text-gray-500" : "text-gray-400")} />
              </div>
              <div>
                <p className={cn("text-sm font-semibold", dark ? "text-gray-300" : "text-gray-700")}>Upload image</p>
                <p className={cn("text-xs", dark ? "text-gray-600" : "text-gray-400")}>JPG, PNG up to 2MB</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className={cn("flex-1 py-3 rounded-xl text-sm font-bold transition-all", dark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || saved}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all",
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-gradient-to-r from-green-700 to-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
              )}
            >
              {saving ? (
                <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving…</>
              ) : saved ? (
                <><CheckCircle2 className="w-4 h-4" />Saved!</>
              ) : (
                `${editReward ? "Update" : "Create"} Reward`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AdminRewardsManager({ dark }: AdminRewardsManagerProps) {
  const [rewards, setRewards] = useState<Reward[]>(adminRewards.map((r) => ({ ...r })));
  const [modalOpen, setModalOpen] = useState(false);
  const [editReward, setEditReward] = useState<Reward | null>(null);

  const handleSave = (r: Reward) => {
    setRewards((prev) =>
      prev.some((x) => x.id === r.id) ? prev.map((x) => x.id === r.id ? r : x) : [...prev, r]
    );
  };

  const handleDelete = (id: number) => setRewards((prev) => prev.filter((r) => r.id !== id));
  const handleToggle = (id: number) => setRewards((prev) => prev.map((r) => r.id === id ? { ...r, active: !r.active } : r));

  const openEdit = (r: Reward) => { setEditReward(r); setModalOpen(true); };
  const openCreate = () => { setEditReward(null); setModalOpen(true); };

  return (
    <>
      <div className={cn("rounded-2xl border shadow-sm overflow-hidden mb-6", dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100")}>
        {/* Header */}
        <div className={cn("flex items-center justify-between px-5 py-4 border-b", dark ? "border-gray-800" : "border-gray-100")}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className={cn("font-bold text-base", dark ? "text-white" : "text-gray-900")}>Rewards Management</h2>
              <p className={cn("text-xs", dark ? "text-gray-500" : "text-gray-400")}>{rewards.length} rewards · {rewards.filter((r) => r.active).length} active</p>
            </div>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-700 to-emerald-600 text-white text-sm font-bold shadow-lg shadow-emerald-700/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            Create Reward
          </button>
        </div>

        {/* Grid */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={cn(
                "relative rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group",
                dark ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white",
                !reward.active && "opacity-60"
              )}
            >
              {/* Color banner */}
              <div className={cn("h-20 bg-gradient-to-br relative overflow-hidden flex items-center justify-center", reward.color)}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500" />
                <span className="text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300">{reward.emoji}</span>
                {/* Toggle */}
                <button
                  onClick={() => handleToggle(reward.id)}
                  className="absolute top-2 right-2 p-1 rounded-lg bg-black/20 hover:bg-black/30 transition-all"
                  title={reward.active ? "Deactivate" : "Activate"}
                >
                  {reward.active
                    ? <ToggleRight className="w-4 h-4 text-white" />
                    : <ToggleLeft className="w-4 h-4 text-white/60" />}
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className={cn("font-bold text-sm", dark ? "text-white" : "text-gray-900")}>{reward.title}</h3>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-semibold",
                    reward.active
                      ? "bg-emerald-100 text-emerald-700"
                      : dark ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500"
                  )}>
                    {reward.active ? "Active" : "Paused"}
                  </span>
                </div>
                <p className={cn("text-xs mb-3 leading-relaxed", dark ? "text-gray-500" : "text-gray-400")}>{reward.desc}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold", dark ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-50 text-yellow-700")}>
                    <Star className="w-3 h-3 fill-current" />{reward.points} pts
                  </div>
                  <div className={cn("text-xs font-semibold", dark ? "text-gray-500" : "text-gray-400")}>
                    {reward.redeemed.toLocaleString()} redeemed
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(reward)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all border",
                      dark ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-emerald-600 hover:text-emerald-300" : "border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
                    )}
                  >
                    <Edit2 className="w-3.5 h-3.5" />Edit
                  </button>
                  <button
                    onClick={() => handleDelete(reward.id)}
                    className="p-2 rounded-xl text-red-400 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add new card */}
          <button
            onClick={openCreate}
            className={cn(
              "rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 p-8 transition-all hover:-translate-y-1 hover:shadow-lg group",
              dark ? "border-gray-700 hover:border-emerald-700 hover:bg-emerald-900/10" : "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50"
            )}
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110", dark ? "bg-gray-800" : "bg-gray-100")}>
              <Plus className={cn("w-6 h-6", dark ? "text-gray-500 group-hover:text-emerald-400" : "text-gray-400 group-hover:text-emerald-600")} />
            </div>
            <div className="text-center">
              <p className={cn("text-sm font-bold", dark ? "text-gray-400 group-hover:text-emerald-400" : "text-gray-500 group-hover:text-emerald-700")}>Add New Reward</p>
              <p className={cn("text-xs mt-0.5", dark ? "text-gray-600" : "text-gray-400")}>Create a reward for commuters</p>
            </div>
          </button>
        </div>
      </div>

      <AddRewardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editReward={editReward}
        dark={dark}
      />
    </>
  );
}
