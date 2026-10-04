import { useState } from "react";
import { addLead, updateLead } from "../services/leadApi";

function LeadForm({ lead, onSuccess, onCancel }) {
    const isEditing = Boolean(lead);

    const [formData, setFormData] = useState({
        name: lead?.name || "",
        company: lead?.company || "",
        mobile: lead?.mobile || "",
        email: lead?.email || "",
        category: lead?.category || "",
        status: lead?.status || "New",
        follow_up_date: lead?.follow_up_date || "",
        priority: lead?.priority || "Medium",
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const categories = [
        "Innerwear",
        "Sportswear",
        "Comfortwear",
        "Fabric",
        "Accessories",
        "OEM/ODM",
    ];

    const statuses = [
        "New",
        "Contacted",
        "Follow-up",
        "Converted",
        "Not Interested",
    ];

    const priorities = [
        "Low",
        "Medium",
        "High",
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const name = formData.name.trim();
        const company = formData.company.trim();
        const mobile = formData.mobile.trim();
        const email = formData.email.trim();

        if (!name) {
            return "Name is required.";
        }

        if (name.length < 2) {
            return "Name must be at least 2 characters.";
        }

        if (name.length > 100) {
            return "Name cannot exceed 100 characters.";
        }

        if (!company) {
            return "Company is required.";
        }

        if (company.length < 2) {
            return "Company must be at least 2 characters.";
        }

        if (company.length > 150) {
            return "Company cannot exceed 150 characters.";
        }

        if (!mobile) {
            return "Mobile number is required.";
        }

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            return "Enter a valid 10-digit Indian mobile number.";
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Enter a valid email address.";
        }

        if (!categories.includes(formData.category)) {
            return "Please select a valid category.";
        }

        if (!statuses.includes(formData.status)) {
            return "Please select a valid status.";
        }

        if (
            formData.follow_up_date &&
            !/^\d{4}-\d{2}-\d{2}$/.test(
                formData.follow_up_date
            )
        ) {
            return "Please enter a valid follow-up date.";
        }

        if (!priorities.includes(formData.priority)) {
            return "Please select a valid priority.";
        }

        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setSaving(true);

            const cleanedData = {
                ...formData,
                name: formData.name.trim(),
                company: formData.company.trim(),
                mobile: formData.mobile.trim(),
                email: formData.email.trim(),
            };

            if (isEditing) {
                await updateLead(
                    lead.id,
                    cleanedData
                );
            } else {
                await addLead(cleanedData);
            }

            onSuccess();

        } catch (error) {
            setError(error.message);

        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="lead-form-card">
            <div className="lead-form-header">
                <div>
                    <p className="lead-form-eyebrow">
                        {isEditing ? "EDIT LEAD" : "NEW LEAD"}
                    </p>

                    <h2>
                        {isEditing
                            ? "Edit Lead"
                            : "Add Lead"}
                    </h2>

                    <p>
                        {isEditing
                            ? "Update the lead information below."
                            : "Enter the customer information below."}
                    </p>
                </div>
            </div>

            {error && (
                <div className="form-error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-grid">

                    <div className="form-group">
                        <label htmlFor="name">
                            Name *
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter lead name"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={100}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="company">
                            Company *
                        </label>

                        <input
                            id="company"
                            name="company"
                            type="text"
                            placeholder="Enter company name"
                            value={formData.company}
                            onChange={handleChange}
                            maxLength={150}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mobile">
                            Mobile *
                        </label>

                        <input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            placeholder="Enter 10-digit mobile number"
                            value={formData.mobile}
                            onChange={handleChange}
                            maxLength={10}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                            maxLength={150}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">
                            Category *
                        </label>

                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select category
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
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">
                            Status *
                        </label>

                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            {statuses.map((status) => (
                                <option
                                    key={status}
                                    value={status}
                                >
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="follow_up_date">
                            Follow-up Date
                        </label>

                        <input
                            id="follow_up_date"
                            name="follow_up_date"
                            type="date"
                            value={formData.follow_up_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">
                            Priority
                        </label>

                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            {priorities.map((priority) => (
                                <option
                                    key={priority}
                                    value={priority}
                                >
                                    {priority}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                        disabled={saving}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="save-button"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : isEditing
                                ? "Update Lead"
                                : "Save Lead"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LeadForm;