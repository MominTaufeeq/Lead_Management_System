import DashboardCard from "../components/DashboardCard";

function Dashboard({ leads }) {
    const totalLeads = leads.length;

    const newLeads = leads.filter(
        (lead) => lead.status === "New"
    ).length;

    const followUpLeads = leads.filter(
        (lead) => lead.status === "Follow-up"
    ).length;

    const convertedLeads = leads.filter(
        (lead) => lead.status === "Converted"
    ).length;

    const highPriorityLeads = leads.filter(
        (lead) => lead.priority === "High"
    ).length;

    return (
        <main className="dashboard">
            <div className="dashboard-header">
                <div>
                    <p className="dashboard-eyebrow">
                        LEAD MANAGEMENT
                    </p>

                    <h1>Dashboard</h1>

                    <p className="dashboard-description">
                        Overview of your event company leads.
                    </p>
                </div>
            </div>

            <div className="dashboard-grid">
                <DashboardCard
                    title="Total Leads"
                    value={totalLeads}
                />

                <DashboardCard
                    title="New Leads"
                    value={newLeads}
                />

                <DashboardCard
                    title="Follow-up Leads"
                    value={followUpLeads}
                />

                <DashboardCard
                    title="Converted Leads"
                    value={convertedLeads}
                />

                <DashboardCard
                    title="High Priority"
                    value={highPriorityLeads}
                />
            </div>
        </main>
    );
}

export default Dashboard;