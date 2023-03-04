import React, { useState, useEffect } from "react";

const UseList = () => {
    const [users, setUsers] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("https://randomuser.me/api?results=30");
            const data = await response.json();
            setUsers(data.results);
        };
        fetchUsers();
    }, []);

    const handleSort = (field) => {
        const sortedUsers = [...users].sort((a, b) => {
            if (sortOrder === "asc") {
                return eval(`a.${field}`) > eval(`b.${field}`) ? 1 : -1;
            } else {
                return eval(`a.${field}`) < eval(`b.${field}`) ? 1 : -1;
            }
        });
        setUsers(sortedUsers);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input type="text" placeholder="Search" onChange={handleSearch} />
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("location.city")}>City</th>
                        <th onClick={() => handleSort("location.state")}>State</th>
                        <th onClick={() => handleSort("location.country")}>Country</th>
                        <th onClick={() => handleSort("location.postcode")}>Postcode</th>
                        <th onClick={() => handleSort("location.street.number")}>Number</th>
                        <th onClick={() => handleSort("location.street.name")}>Name</th>
                        <th onClick={() => handleSort("location.coordinates.latitude")}>latitude</th>
                        <th onClick={() => handleSort("location.coordinates.longitude")}>longitude</th>
                        <th>User Profile</th>



                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.login.uuid}>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                {user.location.city}
                            </td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                {user.location.state}
                            </td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                {user.location.country}
                            </td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                {user.location.postcode}
                            </td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                {user.location.street.number}
                            </td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                {user.location.street.name}
                            </td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                {user.location.coordinates.latitude}
                            </td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                {user.location.coordinates.longitude}
                            </td>
                            <td style={{ border: "1px solid black", padding: "8px" }}>
                                <img
                                    src={user.picture.thumbnail}
                                    alt="User avatar"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UseList;
