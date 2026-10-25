import React, { useMemo } from 'react';
import './Analytics.css';
import { useTheme } from './ThemeContext';
function Analytics({ role, events, onBack }) {
  const { darkMode } = useTheme();
  const safeEvents = Array.isArray(events) ? events : [];
  const totalEvents = safeEvents.length;
  const totalParticipants = safeEvents.reduce((sum, e) => sum + (e.participants || 0), 0);
  const avgParticipation = totalEvents > 0 ? Math.round(totalParticipants / totalEvents) : 0;

  const statusCounts = useMemo(() => {
    const counts = { upcoming: 0, ongoing: 0, completed: 0, cancelled: 0 };
    safeEvents.forEach(e => {
      if (counts[e.status] !== undefined) counts[e.status]++;
    });
    return counts;
  }, [safeEvents]);


  const statusData = useMemo(() => {
    return [
      { label: 'Upcoming', value: statusCounts.upcoming, color: '#5B3DF6' },
      { label: 'Ongoing', value: statusCounts.ongoing, color: '#F59E0B' },
      { label: 'Completed', value: statusCounts.completed, color: '#10B981' },
      { label: 'Cancelled', value: statusCounts.cancelled, color: '#EF4444' },
    ];
  }, [statusCounts]);

  const maxStatusValue = Math.max(...statusData.map(d => d.value), 1);

  const categoryData = useMemo(() => {
    const map = {};
    safeEvents.forEach(e => {
      map[e.category] = (map[e.category] || 0) + 1;
    });
    const colors = {
      tech: '#5B3DF6', cultural: '#EC4899', sports: '#10B981',
      workshop: '#F59E0B', social: '#06B6D4', academic: '#8B5CF6',
    };
    return Object.entries(map).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: colors[name] || '#94a3b8',
    }));
  }, [safeEvents]);

  const mostPopular = categoryData.length > 0
    ? categoryData.reduce((a, b) => (a.value > b.value ? a : b))
    : { name: 'N/A', value: 0 };


  const topEvents = useMemo(() => {
    return [...safeEvents]
      .sort((a, b) => (b.participants || 0) - (a.participants || 0))
      .slice(0, 5);
  }, [safeEvents]);


  const attendanceRate = useMemo(() => {
    const completed = safeEvents.filter(e => e.status === 'completed');
    if (completed.length === 0) return 0;
    const total = completed.reduce((s, e) => s + (e.participants || 0), 0);
    const capacity = completed.reduce((s, e) => s + (e.capacity || 0), 0);
    return capacity > 0 ? Math.round((total / capacity) * 100) : 0;
  }, [safeEvents]);


  const monthlyData = useMemo(() => {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleString('en-US', { month: 'short' });
      const count = safeEvents.filter(e => (e.date || '').startsWith(key)).length;
      months.push({ month: label, events: count });
    }
    return months;
  }, [safeEvents]);

  const maxMonthValue = Math.max(...monthlyData.map(d => d.events), 1);
  const maxCategoryValue = Math.max(...categoryData.map(d => d.value), 1);

  return (
    <div className={`analytics-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="analytics-header-row">
        <div className="analytics-header">
          <h2>Analytics</h2>
          <p>Overview of club events & participation.</p>
        </div>

        {onBack && (
          <button className="back-btn" onClick={onBack}>
            <i className="fa-solid fa-arrow-left"></i> Back to Events
          </button>
        )}
      </div>

      <div className="analytics-stats">
        <div className="analytic-card">
          <div className="analytic-icon-wrap icon-blue">
            <i className="fa-solid fa-calendar-check"></i>
          </div>
          <div className="analytic-content">
            <span className="analytic-value">{totalEvents}</span>
            <span className="analytic-label">Total Events</span>
          </div>
        </div>

        <div className="analytic-card">
          <div className="analytic-icon-wrap icon-purple">
            <i className="fa-solid fa-users"></i>
          </div>
          <div className="analytic-content">
            <span className="analytic-value">{totalParticipants}</span>
            <span className="analytic-label">Total Participants</span>
          </div>
        </div>

        <div className="analytic-card">
          <div className="analytic-icon-wrap icon-green">
            <i className="fa-solid fa-chart-simple"></i>
          </div>
          <div className="analytic-content">
            <span className="analytic-value">{avgParticipation}</span>
            <span className="analytic-label">Avg per Event</span>
          </div>
        </div>

        <div className="analytic-card">
          <div className="analytic-icon-wrap icon-amber">
            <i className="fa-solid fa-trophy"></i>
          </div>
          <div className="analytic-content">
            <span className="analytic-value">{mostPopular.name}</span>
            <span className="analytic-label">Most Popular</span>
          </div>
        </div>

        <div className="analytic-card">
          <div className="analytic-icon-wrap icon-cyan">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div className="analytic-content">
            <span className="analytic-value">{attendanceRate}%</span>
            <span className="analytic-label">Attendance Rate</span>
          </div>
        </div>
      </div>

      {totalEvents === 0 ? (
        <div className="analytics-panel empty-analytics">
          <div className="empty-analytics-icon">📊</div>
          <h3>No events data yet</h3>
          <p>Add some events to see analytics here.</p>
        </div>
      ) : (
        <>
          <div className="analytics-charts">
            <div className="chart-card full-width">
              <div className="chart-card-head">
                <h3>Monthly Event Trend</h3>
                <span className="chart-sub">Last 6 months</span>
              </div>

              <div className="bar-vertical-chart">
                <div className="bar-y-axis">
                  {[1, 0.75, 0.5, 0.25, 0].map((ratio, i) => (
                    <span key={i} className="bar-y-label">
                      {Math.round(maxMonthValue * ratio)}
                    </span>
                  ))}
                </div>

                <div className="bar-vertical-area">
                  <div className="bar-grid">
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} className="bar-grid-line" />
                    ))}
                  </div>

                  <div className="bar-bars">
                    {monthlyData.map((d, i) => {
                      const heightPercent = (d.events / maxMonthValue) * 100;
                      return (
                        <div key={i} className="bar-col">
                          <div className="bar-col-inner">
                            <div
                              className="bar-col-fill"
                              style={{ height: `${heightPercent}%` }}
                            >
                              <span className="bar-col-value">{d.events}</span>
                            </div>
                          </div>
                          <span className="bar-col-label">{d.month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="analytics-charts">
            <div className="chart-card">
              <div className="chart-card-head">
                <h3>Category Breakdown</h3>
              </div>
              <div className="bar-chart">
                {categoryData.map((item, i) => (
                  <div key={i} className="bar-row">
                    <span className="bar-label">{item.name}</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${(item.value / maxCategoryValue) * 100}%`,
                          background: item.color,
                        }}
                      />
                    </div>
                    <span className="bar-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>


            <div className="chart-card">
              <div className="chart-card-head">
                <h3>Status Distribution</h3>
              </div>

              <div className="bar-vertical-chart">
                <div className="bar-y-axis">
                  {[1, 0.75, 0.5, 0.25, 0].map((ratio, i) => (
                    <span key={i} className="bar-y-label">
                      {Math.round(maxStatusValue * ratio)}
                    </span>
                  ))}
                </div>

                <div className="bar-vertical-area">
                  <div className="bar-grid">
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} className="bar-grid-line" />
                    ))}
                  </div>

                  <div className="bar-bars">
                    {statusData.map((d, i) => {
                      const heightPercent = (d.value / maxStatusValue) * 100;
                      return (
                        <div key={i} className="bar-col">
                          <div className="bar-col-inner">
                            <div
                              className="bar-col-fill"
                              style={{
                                height: `${heightPercent}%`,
                                background: `linear-gradient(180deg, ${d.color}cc, ${d.color})`,
                                boxShadow: `0 4px 12px ${d.color}40`,
                              }}
                            >
                              <span className="bar-col-value" style={{ color: d.color }}>
                                {d.value}
                              </span>
                            </div>
                          </div>
                          <span className="bar-col-label">{d.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============ TOP 5 EVENTS ============ */}
          <div className="analytics-panel">
            <h3>🏆 Top 5 Events by Participation</h3>
            <div className="top-events-list">
              {topEvents.map((event, i) => (
                <div key={event.id} className="top-event-row">
                  <span className="rank-badge">#{i + 1}</span>
                  <span className="top-event-icon">{event.icon}</span>
                  <div className="top-event-info">
                    <h4>{event.title}</h4>
                    <p>{event.date} · {event.venue}</p>
                  </div>
                  <div className="top-event-metric">
                    <span className="metric-value">{event.participants || 0}</span>
                    <span className="metric-label">/ {event.capacity || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;