export interface EmployeeEntry {
  Id: string; // GUID
  EmployeeName: string;
  StarTimeUtc: string; // ISO 8601 DateTime string
  EndTimeUtc: string; // ISO 8601 DateTime string
  EntryNotes: string;
  DeletedOn: string | null; // ISO 8601 DateTime string or null
}
