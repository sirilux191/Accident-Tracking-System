import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Map "mo:map/Map";
import { thash } "mo:map/Map";

import Types "Types";

actor ReportCanister {
    type Report = Types.Report;
    type Result<T, E> = Result.Result<T, E>;

    private stable var nextReportId : Nat = 0;
    private var reports = Map.new<Text, Report>();

    public shared ({ caller }) func generateReport(report : Report) : async Result<Text, Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principals are not allowed to generate reports");
        };

        let reportId = Nat.toText(nextReportId);
        nextReportId += 1;

        let newReport : Report = {
            report with
            id = reportId;
            timestamp = Time.now();
        };

        Map.set(reports, thash, reportId, newReport);
        #ok("Report generated successfully with ID: " # reportId);
    };

    public query func getReport(reportId : Text) : async Result<Report, Text> {
        switch (Map.get(reports, thash, reportId)) {
            case null { #err("Report not found") };
            case (?report) { #ok(report) };
        };
    };

    public query func listReportsForAccident(accidentId : Text) : async [Report] {
        let allReports = Iter.toArray(Map.vals(reports));
        Array.filter<Report>(
            allReports,
            func(report) { report.accidentId == accidentId },
        );
    };

    public query func listReportsForPatient(patientId : Text) : async [Report] {
        let allReports = Iter.toArray(Map.vals(reports));
        Array.filter<Report>(
            allReports,
            func(report) { report.patientId == patientId },
        );
    };

    public query func listReportsForFacility(facilityId : Text) : async [Report] {
        let allReports = Iter.toArray(Map.vals(reports));
        Array.filter<Report>(
            allReports,
            func(report) { report.facilityId == facilityId },
        );
    };

    public query func getTotalReports() : async Nat {
        Map.size(reports);
    };

    public query func getReportsByType(reportType : Types.ReportType) : async [Report] {
        let allReports = Iter.toArray(Map.vals(reports));
        Array.filter<Report>(
            allReports,
            func(report) { report.reportType == reportType },
        );
    };

    public shared ({ caller }) func updateReport(reportId : Text, updatedDetails : Text) : async Result<Text, Text> {
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principals are not allowed to update reports");
        };

        switch (Map.get(reports, thash, reportId)) {
            case null { #err("Report not found") };
            case (?report) {
                let updatedReport : Report = {
                    report with
                    details = updatedDetails;
                };
                Map.set(reports, thash, reportId, updatedReport);
                #ok("Report updated successfully");
            };
        };
    };
};
