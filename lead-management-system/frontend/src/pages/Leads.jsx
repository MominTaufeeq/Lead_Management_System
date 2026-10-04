import { useMemo, useState } from "react";
import LeadTable from "../components/LeadTable";
import LeadForm from "../components/LeadForm";
import DeleteModal from "../components/DeleteModal";
import { deleteLead } from "../services/leadApi";

function Leads({
    leads,
    onLeadAdded,
    onLeadUpdated,
    onLeadDeleted,
}) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingLead, setEditingLead] = useState(null);

    const [deletingLead, setDeletingLead] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const statuses = [
        "New",
        "Contacted",
        "Follow-up",
        "Converted",
        "Not Interested",
    ];

    const categories = [
        "Innerwear",
        "Sportswear",
        "Comfortwear",
        "Fabric",
        "Accessories",
        "OEM/ODM",
    ];

    const filteredLeads = useMemo(() => {
        const searchValue = search.toLowerCase().trim();

        return leads.filter((lead) => {
            const matchesSearch =
                lead.name
                    .toLowerCase()
                    .includes(searchValue) ||
                lead.company
                    .toLowerCase()
                    .includes(searchValue) ||
                lead.mobile
                    .toLowerCase()
                    .includes(searchValue) ||
                (lead.email || "")
                    .toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                statusFilter === "" ||
                lead.status === statusFilter;

            const matchesCategory =
                categoryFilter === "" ||
                lead.category === categoryFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCategory
            );
        });
    }, [
        leads,
        search,
        statusFilter,
        categoryFilter,
    ]);

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("");
        setCategoryFilter("");
    };

    const handleAddLead = () => {
        setEditingLead(null);
        setShowForm(true);
    };

    const handleEditLead = (lead) => {
        setEditingLead(lead);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingLead(null);

        if (editingLead) {
            onLeadUpdated();
        } else {
            onLeadAdded();
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingLead(null);
    };

    const handleDeleteLead = (lead) => {
        setDeleteError("");
        setDeletingLead(lead);
    };

    const handleDeleteCancel = () => {
        if (deleting) {
            return;
        }

        setDeleteError("");
        setDeletingLead(null);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingLead) {
            return;
        }

        try {
            setDeleting(true);
            setDeleteError("");

            await deleteLead(deletingLead.id);

            setDeletingLead(null);

            await onLeadDeleted();
        } catch (error) {
            setDeleteError(error.message);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <main className="leads-page">
            <div className="leads-header">
                <div>
                    <p className="leads-eyebrow">
                        LEAD MANAGEMENT
                    </p>

                    <h1>Leads</h1>

                    <p className="leads-description">
                        View and manage all your event
                        company leads.
                    </p>
                </div>

                <div className="leads-header-actions">
                    <div className="lead-count">
                        {filteredLeads.length} Leads
                    </div>

                    <button
                        type="button"
                        className="add-lead-button"
                        onClick={handleAddLead}
                    >
                        + Add Lead
                    </button>
                </div>
            </div>

            {showForm && (
                <LeadForm
                    lead={editingLead}
                    onSuccess={handleFormSuccess}
                    onCancel={handleCancel}
                />
            )}

            {!showForm && (
                <>
                    <div className="lead-filters">
                        <input
                            type="text"
                            placeholder="Search name, company, mobile or email..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                        />

                        <select
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(
                                    event.target.value
                                )
                            }
                        >
                            <option value="">
                                All Statuses
                            </option>

                            {statuses.map((status) => (
                                <option
                                    key={status}
                                    value={status}
                                >
                                    {status}
                                </option>
                            ))}
                        </select>

                        <select
                            value={categoryFilter}
                            onChange={(event) =>
                                setCategoryFilter(
                                    event.target.value
                                )
                            }
                        >
                            <option value="">
                                All Categories
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            className="clear-filter-button"
                            onClick={clearFilters}
                        >
                            Clear
                        </button>
                    </div>

                    <LeadTable
                        leads={filteredLeads}
                        onEdit={handleEditLead}
                        onDelete={handleDeleteLead}
                    />
                </>
            )}

            <DeleteModal
                lead={deletingLead}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                deleting={deleting}
                error={deleteError}
            />
        </main>
    );
}

export default Leads;