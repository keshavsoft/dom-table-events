# dom-table-events

<p align="left">
  <img src="https://img.shields.io/badge/version-1.1.0-blue.svg" alt="Version 1.1.0" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License MIT" />
  <img src="https://img.shields.io/badge/zero--id--dependencies-yes-brightgreen.svg" alt="Zero ID Dependencies" />
  <img src="https://img.shields.io/badge/module-ESM%20%2B%20Global%20ks-orange.svg" alt="ES Modules & Global ks" />
</p>

**Pre-cooked table event workflows, container-level delegation, and switch-case action dispatchers for component tables.**

---

## 🎯 Why dom-table-events?

In traditional component implementations, every developer has to manually cook event bindings, query brittle IDs (like `#table-simple-body-id` or `#tableSearch`), track active row indexes, and write repetitive button click listeners.

`dom-table-events` cooks all table interactions into a single, unified container-level delegation engine with **zero ID dependencies**:

```
┌────────────────────────────────────────────────────────┐
│         MAIN ROOT CONTAINER (#dom-render-container)    │
└────────────────────────────────────────────────────────┘
          │ (Single Delegated Event Listener)
          ▼
┌──────────────────┐    ┌──────────────────────────────────┐
│  Search Filter   │    │  Table Delegated Click           │
│  - input event   │    │  • Button Click ──▶ SWITCH-CASE  │
│  - filters data  │    │                     - "show"     │
│  - updates view  │    │                     - "save"     │
└──────────────────┘    │                     - "delete"   │
                        │  • Body Row Click ──▶ SELECT ROW │
                        └──────────────────────────────────┘
```

---

## 📦 Architecture Tiers

- **Tier 1: `dom-traversal-functions`**: Mechanical DOM math and extraction (`header`, `body`, `footer`).
- **Tier 2: `dom-table-events`**: Pre-cooked reactive workflows, container delegation, and button action dispatching.
- **Tier 3: `json-renderers-build-table`**: Pure table structure builder and DOM renderer.

---

## 🚀 Quick Start (Zero-Import Workflow)

Load the script tag in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/dom-table-events/docs/dist/min.js"></script>
```

In your application:

```javascript
ks.domTableEvents.bindTableEvents({
    container: "dom-render-container",
    dataset: myData,
    columns: myColumns,
    renderTable: (updatedData) => {
        // Re-render table with updated/filtered records
    },
    onRowClick: (record, rowIndex) => {
        console.log("Selected row record:", record);
    },
    onRowAction: (action, record, rowIndex) => {
        console.log(`Action [${action}] clicked on row #${rowIndex}:`, record);
    },
    onFooterSave: (newRecord) => {
        console.log("New record added from footer inputs:", newRecord);
    },
    onSearch: (query, filteredData) => {
        console.log(`Search: "${query}", matching: ${filteredData.length}`);
    }
});
```

---

## 🔀 The Switch-Case Button Dispatcher

All button clicks inside the table are caught at the container level and dispatched through a clean `switch` statement based on button text or `data-action`:

| Action Trigger | Operation |
|---|---|
| **`"show"`** / **`"view"`** | Automatically highlights row, extracts row record, and invokes `onRowAction("show", record, index)`. |
| **`"save"`** | Extracts all `<input>` values in the footer row, clears inputs, pushes to dataset, re-renders table, and invokes `onFooterSave(newRecord)`. |
| **`"delete"`** / **`"remove"`** | Removes record at row index from dataset, re-renders table, and invokes `onRowAction("delete", record, index)`. |
| **Custom action** | Any custom button label (e.g. "approve", "duplicate") automatically delivers its action name and record. |

---

## 📄 License

MIT © [KeshavSoft](https://github.com/keshavsoft)
