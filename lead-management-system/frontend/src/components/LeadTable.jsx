import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

function LeadTable({ leads, onEdit, onDelete }) {
    if (leads.length === 0) {
        return (
            <div className="empty-leads">
                <h3>No leads found</h3>
                <p>
                    There are currently no leads to display.
                </p>
            </div>
        );
    }

    return (
        <div className="lead-table-wrapper">
            <table className="lead-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Follow-up</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead.id}>
                            <td className="lead-name">
                                {lead.name}
                            </td>

                            <td>{lead.company}</td>

                            <td>{lead.mobile}</td>

                            <td>
                                {lead.email || "-"}
                            </td>

                            <td>{lead.category}</td>

                            <td>
                                <StatusBadge
                                    status={lead.status}
                                />
                            </td>

                            <td>
                                {lead.follow_up_date || "-"}
                            </td>

                            <td>
                                <PriorityBadge
                                    priority={lead.priority}
                                />
                            </td>

                            <td>
                                <div className="action-buttons">
                                    <button
                                        type="button"
                                        className="edit-button"
                                        onClick={() =>
                                            onEdit(lead)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={() =>
                                            onDelete(lead)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeadTable;