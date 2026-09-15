import React, { useState } from "react";
import MemberSidebar from "./MemberSidebar";
import CoreMemberHub from "./Members/pages/CoreMemberHub";
import CoreMemberClub from "./Members/pages/CoreMemberClub";
import CoreMemberTasks from "./Members/pages/CoreMemberTasks";
import EventPage from "./EventPage";

function MemberPage({
  darkMode,
  currentMemberId,
  tasks,
  setTasks,
  events,
  setEvents,
  role,
  initialTab = "hub",
  goToLanding,
  goToProfile
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const currentPageKey =
    activeTab === "hub"
      ? "core-member"
      : activeTab === "club"
      ? "core-club"
      : activeTab === "tasks"
      ? "member-tasks"
      : "events";

  return (
    <div className={darkMode ? "main-layout dark" : "main-layout"}>
      <MemberSidebar
        darkMode={darkMode}
        goToHome={goToLanding}
        goToCoreMember={() => setActiveTab("hub")}
        goToCoreClub={() => setActiveTab("club")}
        goToTasks={() => setActiveTab("tasks")}
        goToEvents={() => setActiveTab("events")}
        goToProfile={goToProfile}
        currentPage={currentPageKey}
      />
      <div className="content-area" style={{ paddingTop: "0px" }}>
        {activeTab === "hub" && (
          <CoreMemberHub memberId={currentMemberId} tasks={tasks} />
        )}
        {activeTab === "club" && (
          <CoreMemberClub memberId={currentMemberId} />
        )}
        {activeTab === "tasks" && (
          <CoreMemberTasks
            memberId={currentMemberId}
            tasks={tasks}
            setTasks={setTasks}
          />
        )}
        {activeTab === "events" && (
          <EventPage
            darkMode={darkMode}
            role={role}
            events={events}
            setEvents={setEvents}
          />
        )}
      </div>
    </div>
  );
}

export default MemberPage;