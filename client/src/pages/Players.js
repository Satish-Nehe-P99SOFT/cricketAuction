import { useEffect, useState } from "react";
import {
  getPlayers,
  addPlayer,
  updatePlayer,
  deletePlayer,
} from "../services/player.service";
import Loader from "./Loading";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    setLoading(true);
    const response = await getPlayers();
    if (response.success) {
      setPlayers(response.players || []);
    } else {
      setError(response.message || "Error fetching players");
    }
    setLoading(false);
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.role) {
      setError("Please enter player name and select role");
      return;
    }

    setAdding(true);
    const response = await addPlayer(formData.name.trim(), formData.role);
    setAdding(false);

    if (response.success) {
      setSuccess("Player added successfully!");
      setFormData({ name: "", role: "" });
      fetchPlayers();
    } else {
      setError(response.message || "Error adding player");
    }
  };

  const handleUpdatePlayer = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.role) {
      setError("Please enter player name and select role");
      return;
    }

    setAdding(true);
    const response = await updatePlayer(
      editing._id,
      formData.name.trim(),
      formData.role
    );
    setAdding(false);

    if (response.success) {
      setSuccess("Player updated successfully!");
      setEditing(null);
      setFormData({ name: "", role: "" });
      fetchPlayers();
    } else {
      setError(response.message || "Error updating player");
    }
  };

  const handleDeletePlayer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this player?")) {
      return;
    }

    setError("");
    setSuccess("");
    const response = await deletePlayer(id);

    if (response.success) {
      setSuccess("Player deleted successfully!");
      fetchPlayers();
    } else {
      setError(response.message || "Error deleting player");
    }
  };

  const startEdit = (player) => {
    setEditing(player);
    setFormData({ name: player.name, role: player.role });
    setError("");
    setSuccess("");
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({ name: "", role: "" });
    setError("");
    setSuccess("");
  };

  const getRoleDisplay = (role) => {
    const roleMap = {
      batter: "Batter",
      bowler: "Bowler",
      allrounder: "All Rounder",
      wicketkeeper: "Wicket Keeper",
    };
    return roleMap[role] || role;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="glassmorphism min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Manage Players</h1>

        {/* Add/Edit Form */}
        <div className="glassmorphism border-t border-white/50 border-r-0 max-w-2xl mx-auto px-8 py-6 rounded-[20px] mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">
            {editing ? "Edit Player" : "Add New Player"}
          </h2>
          <form onSubmit={editing ? handleUpdatePlayer : handleAddPlayer}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Player Name
              </label>
              <input
                type="text"
                placeholder="Enter player name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="glassmorphism py-1 w-full min-h-12 no-underline rounded-[35px] border-none outline-none pl-4 tracking-wide text-base text-font-main focus:border-2 focus:border-whitesmoke"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-background-tertiary border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-theme"
                required
              >
                <option value="">Select Role</option>
                <option value="batter">Batter</option>
                <option value="bowler">Bowler</option>
                <option value="allrounder">All Rounder</option>
                <option value="wicketkeeper">Wicket Keeper</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={adding}
                className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-theme-3 z-10 cursor-pointer before:z-[-1] before:content-[''] before:h-[200%] before:w-[200%] before:absolute before:top-full before:left-[-50%] before:right-0 before:bottom-0 before:rounded-full before:bg-theme before:transition-transform before:duration-500 hover:before:translate-y-[-2.7rem] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {adding ? "Saving..." : editing ? "Update" : "Add Player"}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="relative inline-block px-5 py-2 rounded-[30px] transition-transform duration-500 uppercase font-bold overflow-hidden border-none outline-none bg-gray-600 z-10 cursor-pointer hover:bg-gray-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          {error && (
            <div className="text-center block bg-red-500/10 text-base mt-3 p-2 rounded-2xl max-w-[22rem] mx-auto">
              {error}
            </div>
          )}
          {success && (
            <div className="text-center block bg-green-500/10 text-base mt-3 p-2 rounded-2xl max-w-[22rem] mx-auto">
              {success}
            </div>
          )}
        </div>

        {/* Players List */}
        <div className="glassmorphism border-t border-white/50 border-r-0 max-w-2xl mx-auto px-8 py-6 rounded-[20px]">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Your Players ({players.length})
          </h2>
          {players.length === 0 ? (
            <p className="text-center text-gray-400">
              No players added yet. Add your first player above!
            </p>
          ) : (
            <div className="space-y-3">
              {players.map((player) => (
                <div
                  key={player._id}
                  className="flex items-center justify-between p-4 bg-background-tertiary rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{player.name}</h3>
                    <p className="text-sm text-gray-400">
                      {getRoleDisplay(player.role)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(player)}
                      className="px-4 py-2 bg-theme-3 rounded-lg hover:bg-theme transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePlayer(player._id)}
                      className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Players;
