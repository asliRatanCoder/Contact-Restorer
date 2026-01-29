/**
 * Merge Screen Component
 * Allows users to select which contact name to keep for duplicate phone numbers
 */
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

export default function MergeScreen({
  duplicates,
  mergeSelections,
  onMergeSelection,
  onCompleteMerge,
  onBack,
}) {
  return (
    <div className="app">
      <Header
        logo="�"
        title="Merge Duplicates"
        subtitle="Select which name to keep for each phone number"
      />

      <main className="main">
        <div className="container">
          <section className="merge-section">
            <h2 className="merge-title">
              🔍 Found {duplicates.length} Duplicate Phone Numbers
            </h2>
            <p className="merge-subtitle">
              Select which contact name to keep for each phone number
            </p>

            <div className="duplicates-list">
              {duplicates.map((group) => (
                <div key={group.phone} className="duplicate-group">
                  <div className="group-header">
                    <span className="group-phone">📱 {group.phone}</span>
                    <span className="group-count">
                      {group.contacts.length} contacts
                    </span>
                  </div>

                  <div className="name-options">
                    {group.contacts.map((contact) => (
                      <label
                        key={contact.name || "unknown"}
                        className="name-option"
                      >
                        <input
                          type="radio"
                          name={group.phone}
                          value={contact.name}
                          checked={
                            mergeSelections[group.phone] === contact.name
                          }
                          onChange={() =>
                            onMergeSelection(group.phone, contact.name)
                          }
                        />
                        <span className="option-text">
                          {contact.name || "(No name)"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="merge-actions">
              <button className="btn-secondary" onClick={onBack}>
                ← Back
              </button>
              <button className="btn-primary" onClick={onCompleteMerge}>
                ✓ Complete Merge
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer message="✨ Contact Restorer | Merge & Export" />
    </div>
  );
}

MergeScreen.propTypes = {
  duplicates: PropTypes.arrayOf(
    PropTypes.shape({
      phone: PropTypes.string.isRequired,
      contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
  ).isRequired,
  mergeSelections: PropTypes.object.isRequired,
  onMergeSelection: PropTypes.func.isRequired,
  onCompleteMerge: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
