const API_BASE_URL = "http://localhost:8000/api";

export async function getLeads() {
    const response = await fetch(`${API_BASE_URL}/get_leads.php`);

    if (!response.ok) {
        throw new Error("Failed to fetch leads.");
    }

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.message || "Unable to fetch leads.");
    }

    return result.data;
}

export async function addLead(leadData) {
    const response = await fetch(`${API_BASE_URL}/add_lead.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to add lead.");
    }

    return result;
}

export async function updateLead(id, leadData) {
    const response = await fetch(
        `${API_BASE_URL}/update_lead.php?id=${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(leadData),
        }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || "Unable to update lead."
        );
    }

    return result;
}
export async function deleteLead(id) {
    const response = await fetch(
        `${API_BASE_URL}/delete_lead.php?id=${id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || "Unable to delete lead."
        );
    }

    return result;
}