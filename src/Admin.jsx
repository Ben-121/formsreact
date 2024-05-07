import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./App.css";

export default function Admin() {
  const [usersData, setUsersData] = useState(
    JSON.parse(localStorage.getItem("a")) || []
  );
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const navigate = useNavigate();

  const deleteUserRow = (index) => {
    const updatedUsersData = [...usersData];
    updatedUsersData.splice(index, 1);
    setUsersData(updatedUsersData);
    localStorage.setItem("a", JSON.stringify(updatedUsersData));
  };

  const saveEditedUser = () => {
    const updatedUsersData = [...usersData];
    updatedUsersData[editingIndex] = editedUserData;
    setUsersData(updatedUsersData);
    localStorage.setItem("a", JSON.stringify(updatedUsersData));
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditedUserData({});
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-container">
      <h1>ADMIN</h1>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      <TableContainer component={Paper} className="user-table">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((user, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {user.fname}
                </TableCell>
                <TableCell align="right">{user.username}</TableCell>
                <TableCell align="right">{user.password}</TableCell>
                <TableCell align="right">
                  {editingIndex === index ? (
                    <>
                      <button className="edit-btn" onClick={saveEditedUser}>
                        Save
                      </button>{" "}
                      <button className="cancel-btn" onClick={cancelEdit}>
                        Cancel
                      </button>{" "}
                    </>
                  ) : (
                    <button
                      className="edit-btn"
                      onClick={() => setEditingIndex(index)}
                    >
                      Edit
                    </button>
                  )}{" "}
                  <button
                    className="delete-btn"
                    onClick={() => deleteUserRow(index)}
                  >
                    Delete
                  </button>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editingIndex !== null && (
        <div className="edit-form">
          <h2>Edit User Details</h2>
          <label>
            Name:
            <input
              type="text"
              value={editedUserData.fname || ""}
              onChange={(e) =>
                setEditedUserData({ ...editedUserData, fname: e.target.value })
              }
            />
          </label>{" "}
          <label>
            Username:
            <input
              type="text"
              value={editedUserData.username || ""}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  username: e.target.value,
                })
              }
            />
          </label>{" "}
          <label>
            Password:
            <input
              type="password"
              value={editedUserData.password || ""}
              onChange={(e) =>
                setEditedUserData({
                  ...editedUserData,
                  password: e.target.value,
                })
              }
            />
          </label>{" "}
        </div>
      )}
    </div>
  );
}
